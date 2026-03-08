import type { Metadata } from "next";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

export const metadata: Metadata = {
  title: "Blog - ZalaStack",
  description: "Expert guides on SaaS architecture, Next.js 14, Supabase, Clerk, Stripe integration, and multi-tenant best practices. Build production-ready SaaS faster.",
  keywords: ["SaaS blog", "Next.js tutorial", "Supabase guide", "multi-tenant architecture", "SaaS starter kit", "build vs buy SaaS"],
};

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
}

function parseFrontMatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  
  const frontMatter = match[1];
  const lines = frontMatter.split("\n");
  const data: Record<string, any> = {};
  
  lines.forEach(line => {
    const [key, ...valueParts] = line.split(":");
    const value = valueParts.join(":").trim();
    
    if (key === "tags") {
      data.tags = value.replace(/[\[\]]/g, "").split(",").map(t => t.trim());
    } else if (key === "date") {
      data.date = value;
    } else {
      data[key.trim()] = value.replace(/["']/g, "");
    }
  });
  
  return data;
}

function getBlogPosts(): BlogPost[] {
  const blogDir = join(process.cwd(), "src/app/blog");
  const files = readdirSync(blogDir).filter(file => file.endsWith(".md") || file.endsWith(".mdx"));
  
  const posts: BlogPost[] = [];
  
  files.forEach(file => {
    if (file === "page.md") return;
    
    const filePath = join(blogDir, file);
    const content = readFileSync(filePath, "utf-8");
    const frontMatter = parseFrontMatter(content);
    
    const slug = file.replace(/\.(md|mdx)$/, "");
    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.ceil(wordCount / 200)} min read`;
    
    posts.push({
      slug,
      title: frontMatter.title || "Untitled",
      description: frontMatter.description || "",
      date: frontMatter.date || "",
      tags: frontMatter.tags || [],
      readTime,
    });
  });
  
  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogPage() {
  const posts = getBlogPosts();
  
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Expert guides on building production-ready SaaS applications. 
            Learn from real-world patterns and best practices.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="card hover:border-blue-500/50 transition-colors duration-200 flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-4 text-sm">
                <time className="text-gray-500">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="text-gray-600">·</span>
                <span className="text-gray-500">{post.readTime}</span>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-3 flex-grow">
                <a
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  {post.title}
                </a>
              </h2>
              
              <p className="text-gray-400 mb-4 leading-relaxed line-clamp-3">
                {post.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full border border-blue-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <a
                href={`/blog/${post.slug}`}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200 inline-flex items-center gap-1"
              >
                Read more <span>→</span>
              </a>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 card bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Stay in the loop
            </h3>
            <p className="text-gray-400 mb-6">
              Get the latest SaaS architecture tips and ZalaStack updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
