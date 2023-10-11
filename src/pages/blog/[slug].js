import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import RecentPosts from "../../components/BlogsData/RecentPosts";

const baseUrl = "/api";

const BlogPost = (id) => {
  const router = useRouter();
  const { slug } = router.query;

  const [blogPost, setBlogPosts] = useState(null);

  useEffect(() => {
    if (slug) {
      fetch(`${baseUrl}/blog/${slug}`) // Make an API call to fetch all blog posts
        .then((response) => response.json())
        .then((data) => setBlogPosts(data))
        .catch((error) => console.error(error));
    }
  }, [slug]);

  if (!blogPost) {
    return <div>Loading....</div>;
  }

  const { metadata, content, blogData } = blogPost;

  return (
    <div className="flex flex-col lg:flex-row mx-auto">
      <div className=" h-full w-full lg:w-4/6 lg:pl-8 m-auto mt-8 ">
        <div className="mt-16  justify-center  m-6">
          <h1 className="text-4xl font-bold text-center mb-4">
            {metadata.title}
          </h1>
          <hr className="border-b border-green-300 mb-2 w-10 mx-auto" />

          <div className="text-gray-600 text-center mb-4">{metadata.date}</div>
          <ReactMarkdown
            className="prose flex flex-col mx-auto text-sm sm:text-md"
            components={{
              img: ({ node, ...props }) => (
                <img
                  {...props}
                  className="mx-auto w-full h-96 rounded-md shadow-xl "
                  alt=""
                  style={{ maxWidth: "100%" }}
                />
              ),
              p: ({ node, ...props }) => (
                <p {...props} className="md:mx-8 text-justify mb-4" />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  {...props}
                  className="list-disc md:ml-6 pl-2 "
                  ordered="false"
                />
              ),
              li: ({ node, ...props }) => <li {...props} className="mb-2" />,

              ol: ({ node, ...props }) => (
                <ol
                  {...props}
                  className="list-decimal md:ml-6 pl-2"
                  ordered="false"
                />
              ),
              h1: ({ node, children, ...props }) => (
                <h1 {...props} className="text-center text-3xl mb-2">
                  {" "}
                  {children}{" "}
                </h1>
              ),
              h2: ({ node, children, ...props }) => (
                <h2 {...props} className="text-center text-2xl m-4">
                  {" "}
                  {children}{" "}
                </h2>
              ),
              h3: ({ node, children, ...props }) => (
                <h3 {...props} className="text-left text-2xl m-4">
                  {" "}
                  {children}{" "}
                </h3>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
      <div className="lg:w-2/6 p-4 lg:mt-24 ">
        <RecentPosts currentSlug={metadata.slug} posts={blogData} />
      </div>
    </div>
  );
};

export default BlogPost;
