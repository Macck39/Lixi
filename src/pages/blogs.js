import React, { useEffect, useState } from "react";
import Link from "next/link";
import RecentPosts from "../components/BlogsData/RecentPosts";

const baseUrl = "/api";

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/blogs`) // Make an API call to fetch all blog posts
      .then((response) => response.json())
      .then((data) => {
        setBlogPosts(data);
        setRecentPosts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex m-2 flex-col lg:flex-row">
      <div className="lg:w-4/6 lg:pl-8 m-auto mt-8">
        {blogPosts.map((blog) => (
          <div key={blog.metadata.slug} className="mb-8">
            <h2 className="text-2xl font-bold  p-2 text-center">
              {blog.metadata.title}
            </h2>
            <hr className="border-b border-green-300 mb-2 w-10 mx-auto" />
            <h3 className="text-sm font-medium mb-2 text-center">
              {" "}
              {blog.metadata.date}
            </h3>
            <div className="flex flex-col w-10/12 justify-between m-auto">
              <div className=" items-center lg:m-4">
                <img
                  src={blog.metadata.image}
                  alt={blog.metadata.title}
                  className="w-full h-96 rounded-md m-auto"
                />
              </div>
              <div className="m-2 lg:mx-6 flex flex-col">
                <p className="text-gray-600 mb-4">{blog.metadata.desc}...</p>
                <div className="flex justify-end">
                  <Link
                    href={{
                      pathname: `/blog/${blog.metadata.slug}`,
                    }}
                    className="text-blue-500"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="lg:w-2/6 p-4 lg:mt-20 ">
        <RecentPosts posts={recentPosts} />
      </div>
    </div>
  );
};

export default Blogs;
