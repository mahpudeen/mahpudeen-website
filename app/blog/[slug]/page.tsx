import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

const categoryStyles: Record<string, string> = {
  Blog: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  TIL: "bg-green-500/10 text-green-400 border-green-500/20",
  Snippets: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta, content } = getPostBySlug(slug);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-8">
      {/* Back */}
      <Link href="/blog" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-amber-500 transition-colors w-fit">
        <ArrowLeft size={16} />
        Back to Blog
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <span className={`w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${categoryStyles[meta.category]}`}>
          {meta.category}
        </span>
        <h1 className="font-heading text-3xl font-bold leading-tight">{meta.title}</h1>
        <p className="text-muted-foreground">{meta.description}</p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {new Date(meta.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {meta.readTime}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <hr className="border-border" />

      {/* Content */}
      <article className="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-heading prose-headings:font-bold
        prose-a:text-amber-500 prose-a:no-underline hover:prose-a:underline
        prose-code:text-amber-400 prose-code:bg-foreground/5 prose-code:rounded prose-code:px-1
        prose-pre:bg-foreground/5 prose-pre:border prose-pre:border-border
      ">
        <MDXRemote source={content} />
      </article>
    </div>
  );
}