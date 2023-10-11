import path from "path";
import fs from "fs";
import matter from "gray-matter";
import getConfig from "next/config";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { serverRuntimeConfig } = getConfig();
  const { slug } = req.query;
  const filePath = path.resolve(
    serverRuntimeConfig.PROJECT_ROOT,
    "./public",
    `blogs/${slug}.md`
  );
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const blogFilesPath = path.resolve(
    serverRuntimeConfig.PROJECT_ROOT,
    "./public",
    "blogs"
  );

  const fileNames = fs.readdirSync(blogFilesPath);
  const blogData = fileNames.map((fileName) => {
    const filePath = `${blogFilesPath}/${fileName}`;
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return {
      metadata: data,
    };
  });

  const blog = {
    metadata: data,
    content: content,
    blogData,
  };
  res.status(200).json(blog);
}
