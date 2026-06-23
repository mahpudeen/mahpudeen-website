"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { PostMeta } from "@/lib/mdx";

type Category = "All" | "Blog" | "TIL" | "Snippets";

const categoryStyles: Record<Exclude<Category, "All">, string> = {
  Blog: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  TIL: "bg-green-500/10 text-green-400 border-green-500/20",
  Snippets: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const categories: Category[] = ["All", "Blog", "TIL", "Snippets"];
const POSTS_PER_PAGE = 6;

export default function BlogPage({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState<Category>("All");
  const [page, setPage] = useState(1);

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleFilter = (cat: Category) => {
    setActive(cat);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-bold">Blog</h1>
        <p className="text-muted-foreground">Thoughts, learnings, and code snippets.</p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors border ${
              active === cat
                ? "bg-amber-500 text-black border-amber-500 font-medium"
                : "border-border text-muted-foreground hover:border-amber-500/40 hover:text-foreground"
            }`}
          >
            {cat}
            {cat !== "All" && (
              <span className="ml-1.5 text-xs opacity-60">
                {posts.filter((p) => p.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-4">
        {paginated.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-border p-6 flex flex-col gap-4 transition-colors hover:border-amber-500/40 hover:bg-amber-500/5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <span className={`w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${categoryStyles[post.category]}`}>
                  {post.category}
                </span>
                <h2 className="font-heading font-semibold group-hover:text-amber-500 transition-colors">
                  {post.title}
                </h2>
              </div>
              <span className="text-muted-foreground group-hover:text-amber-500 transition-colors shrink-0 mt-1">→</span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{post.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.readTime}
                </span>
              </div>
            </div>
          </Link>
        ))}

        {paginated.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <p className="text-muted-foreground text-sm">No posts in this category yet.</p>
            <span className="text-xs text-amber-500">Coming soon</span>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-amber-500/40 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                p === page
                  ? "bg-amber-500 text-black border-amber-500 font-medium"
                  : "border-border text-muted-foreground hover:border-amber-500/40 hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-amber-500/40 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}