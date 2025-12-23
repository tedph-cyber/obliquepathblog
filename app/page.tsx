import { Blog7 } from "@/components/ui/blog7";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const posts = getAllPosts();
  
  const demoData = {
    tagline: "Latest Updates",
    heading: "Blog Posts",
    description:
      "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
    buttonText: "Explore all posts",
    buttonUrl: "https://www.obliquepath.dev/blog",
    posts: posts.map((post) => ({
      id: post.slug,
      slug: post.slug,
      title: post.title,
      summary: post.summary,
      label: post.label,
      author: post.author,
      published: post.published,
      image: post.image,
    })),
  };

  return (
    <div className="container mx-auto px-4">
      <Blog7 {...demoData} />
    </div>
  );
}
