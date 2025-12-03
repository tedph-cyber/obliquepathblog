import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Link>

        <div className="space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary">{post.label}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>{post.author}</span>
              <span>•</span>
              <time dateTime={post.published}>{post.published}</time>
            </div>
          </div>

          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-lg"
          />

          <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4 prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-xl prose-h3:mt-4 prose-h3:mb-2 prose-p:text-lg prose-p:leading-relaxed prose-p:my-4 prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-ul:list-disc prose-ul:list-inside prose-ul:space-y-2 prose-ul:my-4 prose-ol:list-decimal prose-ol:list-inside prose-ol:space-y-2 prose-ol:my-4 prose-code:text-sm prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-strong:font-semibold">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </div>
    </article>
  );
}
