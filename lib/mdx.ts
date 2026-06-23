import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: "Blog" | "TIL" | "Snippets";
  tags: string[];
  slug: string;
};

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(contentDir);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(contentDir, f), "utf-8");
      const { data } = matter(raw);
      return { ...data, slug } as PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { meta: { ...data, slug } as PostMeta, content };
}