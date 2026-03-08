---
title: "Multi-Tenant SaaS Architecture: Complete Guide to Organization Isolation"
description: "Build secure multi-tenant SaaS with proper data isolation. Learn org_id scoping, Row Level Security, and tenant-aware queries with Supabase and Next.js."
date: "2026-03-08"
tags: ["multi-tenant", "SaaS architecture", "Supabase", "RLS", "data isolation", "security"]
---

# Multi-Tenant SaaS Architecture: Complete Guide to Organization Isolation

Multi-tenancy is the backbone of modern SaaS applications. Your customers expect their data to be completely isolated from other organizations — and they're right to expect it.

In this guide, we'll walk through production-ready patterns for building multi-tenant applications with Next.js 14 and Supabase.

## What is Multi-Tenancy?

Multi-tenancy allows a single application instance to serve multiple organizations (tenants) while keeping their data logically separated.

### Three Common Approaches

| Approach | Description | Pros | Cons |
|----------|-------------|------|------|
| **Database per tenant** | Separate database for each org | Maximum isolation, easy backups | Expensive, complex migrations |
| **Schema per tenant** | Separate schema per org | Good isolation, shared resources | Schema management overhead |
| **Shared database, org_id** | Single table with org_id column | Cost-effective, simple queries | Requires careful RLS policies |

**ZalaStack uses the shared database approach** — it's the most cost-effective for early-stage SaaS and scales surprisingly well with proper indexing and RLS policies.

## Database Schema Design

### Core Tables with org_id

Every table that contains user data should include an `org_id` column:

```sql
-- organizations table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- users table (managed by Clerk, but we track org membership)
CREATE TABLE user_organizations (
  user_id TEXT NOT NULL,
  org_id UUID REFERENCES organizations(id),
  role TEXT NOT NULL DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, org_id)
);

-- projects table (tenant-scoped)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- audit_logs table (tenant-scoped)
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_projects_org_id ON projects(org_id);
CREATE INDEX idx_audit_logs_org_id ON audit_logs(org_id);
CREATE INDEX idx_user_organizations_user_id ON user_organizations(user_id);
```

### Why Every Table Needs org_id

Without `org_id` on every table, you'll face:

1. **Complex joins** to determine tenant ownership
2. **Accidental data leaks** in queries
3. **Difficult RLS policies** that are error-prone
4. **Hard-to-debug** permission issues

**Rule of thumb:** If the data belongs to an organization, it gets an `org_id` column.

## Row Level Security (RLS)

RLS is your safety net. Even if your application code has a bug, RLS prevents cross-tenant data access at the database level.

### Enable RLS on All Tables

```sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their org's projects"
  ON projects FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM user_organizations 
      WHERE user_id = current_setting('app.current_user_id')
    )
  );

CREATE POLICY "Users can insert into their org's projects"
  ON projects FOR INSERT
  WITH CHECK (
    org_id IN (
      SELECT org_id FROM user_organizations 
      WHERE user_id = current_setting('app.current_user_id')
    )
  );

CREATE POLICY "Users can update their org's projects"
  ON projects FOR UPDATE
  USING (
    org_id IN (
      SELECT org_id FROM user_organizations 
      WHERE user_id = current_setting('app.current_user_id')
    )
  );

CREATE POLICY "Users can delete their org's projects"
  ON projects FOR DELETE
  USING (
    org_id IN (
      SELECT org_id FROM user_organizations 
      WHERE user_id = current_setting('app.current_user_id')
    )
  );
```

### Setting User Context in Supabase

```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs';

export async function createOrgClient() {
  const { userId, orgId } = auth();
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  // Set user context for RLS
  if (userId && orgId) {
    await supabase.rpc('set_user_context', {
      user_id: userId,
      org_id: orgId,
    });
  }
  
  return supabase;
}
```

```sql
-- RPC function to set context
CREATE OR REPLACE FUNCTION set_user_context(user_id TEXT, org_id UUID)
RETURNS void AS $$
BEGIN
  PERFORM set_config('app.current_user_id', user_id, true);
  PERFORM set_config('app.current_org_id', org_id::text, true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Application-Layer Tenant Scoping

RLS is your safety net, but application-layer scoping is your first line of defense.

### Query Helper Pattern

Create a helper that automatically scopes queries to the current organization:

```typescript
// lib/db/queries.ts
import { db } from './index';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export function getOrgScopedDb() {
  const { userId, orgId } = auth();
  
  if (!userId) {
    redirect('/signin');
  }
  
  if (!orgId) {
    redirect('/select-org');
  }
  
  return {
    db,
    orgId,
    userId,
    
    // Helper methods for common patterns
    projects: {
      findMany: (options?: any) => 
        db.query.projects.findMany({
          ...options,
          where: (projects, { eq, and }) => 
            and(
              eq(projects.orgId, orgId),
              options?.where
            ),
        }),
      
      findFirst: (options?: any) =>
        db.query.projects.findFirst({
          ...options,
          where: (projects, { eq, and }) => 
            and(
              eq(projects.orgId, orgId),
              options?.where
            ),
        }),
    },
    
    auditLogs: {
      create: (data: any) =>
        db.insert('audit_logs').values({
          ...data,
          orgId,
          userId,
        }),
    },
  };
}
```

### Usage in Server Components

```typescript
// app/dashboard/projects/page.tsx
import { getOrgScopedDb } from '@/lib/db/queries';

export default async function ProjectsPage() {
  const { projects, orgId } = getOrgScopedDb();
  
  const projectList = await projects.findMany({
    orderBy: (p, { desc }) => desc(p.createdAt),
  });
  
  return (
    <div>
      <h1>Projects for Organization {orgId}</h1>
      {projectList.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

## Organization Switching

Users often belong to multiple organizations. Here's how to handle switching:

### Organization Selector Component

```typescript
// components/org-selector.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useOrganizationList } from '@clerk/nextjs';

export function OrganizationSelector() {
  const router = useRouter();
  const { userMemberships, setActive } = useOrganizationList();
  
  const handleSwitch = async (orgId: string) => {
    await setActive({ organization: orgId });
    router.refresh(); // Reload server components with new org context
  };
  
  return (
    <select
      onChange={(e) => handleSwitch(e.target.value)}
      className="org-selector"
    >
      {userMemberships.map((membership) => (
        <option
          key={membership.organization.id}
          value={membership.organization.id}
        >
          {membership.organization.name}
        </option>
      ))}
    </select>
  );
}
```

### Middleware for Org Validation

```typescript
// middleware.ts
import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/', '/pricing', '/blog'],
  
  afterAuth(auth, req) {
    // Handle public routes
    if (auth.isPublicRoute) {
      return NextResponse.next();
    }
    
    // Redirect unauthenticated users
    if (!auth.userId) {
      const signInUrl = new URL('/signin', req.url);
      signInUrl.searchParams.set('redirect_url', req.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }
    
    // Check for org selection on protected routes
    if (!auth.orgId && req.nextUrl.pathname !== '/select-org') {
      const orgSelection = new URL('/select-org', req.url);
      orgSelection.searchParams.set('redirect_url', req.nextUrl.pathname);
      return NextResponse.redirect(orgSelection);
    }
    
    return NextResponse.next();
  },
});
```

## Audit Logging for Compliance

Every multi-tenant SaaS needs audit trails. Here's a pattern that works:

### Audit Log Helper

```typescript
// lib/audit.ts
import { getOrgScopedDb } from './db/queries';

export async function logAudit(
  action: string,
  resourceType: string,
  resourceId: string,
  metadata?: Record<string, any>
) {
  const { auditLogs } = getOrgScopedDb();
  
  await auditLogs.create({
    action,
    resourceType,
    resourceId,
    metadata: metadata || {},
    createdAt: new Date(),
  });
}

// Usage in Server Actions
export async function deleteProject(projectId: string) {
  const { db, orgId } = getOrgScopedDb();
  
  // First, verify ownership
  const project = await db.query.projects.findFirst({
    where: (p, { eq, and }) => 
      and(eq(p.id, projectId), eq(p.orgId, orgId)),
  });
  
  if (!project) {
    throw new Error('Project not found');
  }
  
  // Log before deletion
  await logAudit(
    'project.deleted',
    'project',
    projectId,
    { projectName: project.name }
  );
  
  // Then delete
  await db.delete('projects').where(eq('id', projectId));
  
  return { success: true };
}
```

### Audit Log Viewer

```typescript
// app/dashboard/audit/page.tsx
import { getOrgScopedDb } from '@/lib/db/queries';

export default async function AuditLogPage() {
  const { db, orgId } = getOrgScopedDb();
  
  const logs = await db.query.audit_logs.findMany({
    where: (a, { eq }) => eq(a.orgId, orgId),
    orderBy: (a, { desc }) => desc(a.createdAt),
    limit: 100,
  });
  
  return (
    <div>
      <h1>Audit Log</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Action</th>
            <th>Resource</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{new Date(log.createdAt).toLocaleString()}</td>
              <td>{log.userId}</td>
              <td>{log.action}</td>
              <td>{log.resourceType}:{log.resourceId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Testing Multi-Tenant Isolation

### Security Test Suite

```typescript
// __tests__/isolation.test.ts
import { db } from '@/lib/db';
import { createTestOrg, createTestUser } from '@/lib/test/helpers';

describe('Multi-Tenant Isolation', () => {
  let org1: string;
  let org2: string;
  let user1: string;
  let user2: string;
  
  beforeEach(async () => {
    org1 = await createTestOrg('Org 1');
    org2 = await createTestOrg('Org 2');
    user1 = await createTestUser(org1);
    user2 = await createTestUser(org2);
  });
  
  it('cannot access another org\'s projects', async () => {
    // Create project in org1
    await db.insert('projects').values({
      orgId: org1,
      name: 'Secret Project',
    });
    
    // Try to query as user from org2
    const projects = await db.query.projects.findMany({
      where: (p, { eq }) => eq(p.orgId, org2),
    });
    
    expect(projects.length).toBe(0);
    expect(projects.find(p => p.name === 'Secret Project')).toBeUndefined();
  });
  
  it('RLS prevents cross-org updates', async () => {
    const project = await db.insert('projects').values({
      orgId: org1,
      name: 'Original Name',
    }).returning();
    
    // Attempt update with wrong org_id
    await expect(
      db.update('projects')
        .set({ name: 'Hacked Name' })
        .where(eq('id', project[0].id))
    ).rejects.toThrow(); // RLS should block this
  });
});
```

## Performance Considerations

### Indexing Strategy

```sql
-- Composite indexes for common query patterns
CREATE INDEX idx_projects_org_created ON projects(org_id, created_at DESC);
CREATE INDEX idx_audit_logs_org_created ON audit_logs(org_id, created_at DESC);

-- Partial indexes for status-based queries
CREATE INDEX idx_projects_org_active ON projects(org_id) 
  WHERE status = 'active';
```

### Query Optimization

```typescript
// Bad: Fetching all then filtering
const allProjects = await db.query.projects.findMany();
const orgProjects = allProjects.filter(p => p.orgId === currentOrgId);

// Good: Filtering at database level
const orgProjects = await db.query.projects.findMany({
  where: (p, { eq }) => eq(p.orgId, currentOrgId),
});
```

## Common Pitfalls to Avoid

### ❌ Missing org_id in WHERE clause

```typescript
// DANGEROUS: No org_id filter!
const projects = await db.query.projects.findMany();

// SAFE: Always filter by org_id
const projects = await db.query.projects.findMany({
  where: (p, { eq }) => eq(p.orgId, orgId),
});
```

### ❌ Exposing org_id in client components

```typescript
// DANGEROUS: org_id visible in client bundle
export default function ClientComponent({ orgId }) {
  return <div>{orgId}</div>;
}

// SAFE: Keep org_id on server, pass only necessary data
export default function ServerComponent() {
  const projects = await getOrgProjects(); // orgId used server-side only
  return <ClientComponent projects={projects} />;
}
```

### ❌ Skipping RLS policies

RLS is your last line of defense. Never skip it, even if you trust your application code.

## Conclusion

Multi-tenant architecture requires discipline:

1. **Every table gets org_id** — no exceptions
2. **RLS on every table** — defense in depth
3. **Audit everything** — compliance and debugging
4. **Test isolation** — security test suite is mandatory

ZalaStack implements all these patterns out of the box. [See the full stack →](/stack)

---

**Building a SaaS?** [Get started with ZalaStack →](/signup)

**Questions?** Check our [documentation](/docs) or see [pricing →](/pricing)
