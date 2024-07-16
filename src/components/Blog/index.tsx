import { useData } from "nextra/data";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";

import Link from "next/link";

const Blog = () => {
  const blogPost = useData();
  const searchParams = useSearchParams();
  const search = searchParams?.get("category");

  return (
    <div className="py-14">
      <h2 className="nx-mt-2 nx-text-3xl nx-font-bold nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100">
        Blog
      </h2>
      <div className="w-full mx-auto">
        {blogPost
          .filter((post: BlogPostsThumbnail) => {
            if (search) {
              return post.categories?.includes(String(search));
            } else {
              return post;
            }
          })
          .map((post: BlogPostsThumbnail, i: number) => {
            return (
              <Link href={String(post.url)} key={i}>
                <div className="py-4 border-b dark:border-gray-600 border-[#F0F0F0] flex justify-between items-center">
                  <h6 className="text-base line-clamp-1 font-sans text-black/70 dark:text-white/70">
                    {post.title}
                  </h6>
                  <p className="text-sm font-medium text-black/60 dark:text-white/60">
                    {format(String(post.date), "MMMM do, yyyy")}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Blog;
