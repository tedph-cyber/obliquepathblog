import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface Post {
  id: string;
  slug: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  image: string;
}

interface Blog7Props {
  tagline: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  posts: Post[];
}

const Blog7 = ({
  tagline = "Latest Updates",
  heading = "Blog Posts",
  description = " Our blog features practical insights, automation trends, and behind-the-scenes looks at our projects and client success stories.",
  buttonText = "View all articles",
  buttonUrl = "https://obliquepath.dev",
  posts = [
    {
      id: "post-1",
      slug: "build-websites-with-shadcn-ui",
      title: "Getting Started with shadcn/ui Components",
      summary:
        "Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
      label: "Tutorial",
      author: "Oblique Path",
      published: "1 Jan 2024",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
    },
    // {
    //   id: "post-2",
    //   slug: "beginners-guide-to-digital-marketing",
    //   title: "The Beginner’s Guide to Creating a Simple Digital Marketing Strategy That Actually Works",
    //   summary:
    //     "A practical, step-by-step guide for small businesses and startups to build a simple digital marketing strategy. Learn how to set clear goals, choose the right channels, plan content, and measure results without overwhelm.",
    //   label: "Marketing",
    //   author: "Oblique Path",
    //   published: "21 December 2025",
    //   image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=450&fit=crop",
    // },
    // {
    //   id: "post-3",
    //   slug: "future-of-web-design",
    //   title: "Modern Design Systems with Tailwind CSS",
    //   summary:
    //     "Dive into creating scalable design systems using Tailwind CSS and shadcn/ui. Learn how to maintain consistency while building flexible and maintainable component libraries.",
    //   label: "Design Systems",
    //   author: "Oblique Path",
    //   published: "1 Jan 2024",
    //   image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=450&fit=crop",
    // },
  ],
}: Blog7Props) => {
  return (
    <section className="py-32 px-4">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            {tagline}
          </Badge>
          <h2 className="mb-3 text-pretty text-3xl font-semibold gradient-text-animate md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mb-8 text-muted-foreground px-4 md:text-base lg:max-w-2xl lg:text-lg">
            {description}
          </p>
          <Button variant="link" className="w-full sm:w-auto" asChild>
            <a href={buttonUrl} target="_blank">
              {buttonText}
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
        </div>
        <div className="grid gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="grid grid-rows-[auto_auto_1fr_auto] hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video w-full overflow-hidden">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-opacity duration-200 fade-in hover:opacity-70"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  />
                </Link>
              </div>
              <CardHeader>
                <h3 className="text-lg font-semibold hover:underline md:text-xl">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.summary}</p>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center text-foreground hover:underline group"
                >
                  Read more
                  <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog7 };
