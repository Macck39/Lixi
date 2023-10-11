import React from "react";
import Link from "next/link";

const RecentPosts = ({ posts }) => {
  return (
    <div className="p-8 mb-4">
      <div className="bg-grey-200 p-4  mb-4 rounded-md shadow border-2">
        <h2 className="text-xl font-bold mb-2">Recent Posts</h2>
        <hr className="border-b border-green-300 mb-4" />
        <ul>
          {posts?.map((post) => (
            <li key={post.metadata.slug} className="mb-4">
              <Link
                href={`/blog/${post.metadata.slug}`}
                className="text-sm font-semibold hover:underline hover:text-blue-400"
              >
                {`>   ${post.metadata.title}`}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentPosts;
