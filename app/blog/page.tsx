import { getAllPosts } from "@/lib/mdx";
import BlogPage from "./_blog-page";

export default function Page() {
  const posts = getAllPosts();
  return <BlogPage posts={posts} />;
}