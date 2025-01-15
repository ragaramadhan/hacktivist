"use client";

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [tag, setTag] = useState("");
  const [tag2, setTag2] = useState("");

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const images = [];
      if (image) {
        images.push(image);
        images.push(image2);
      }

      const tags = [];
      if (tag) {
        tags.push(tag);
        tags.push(tag2);
      }

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogpost`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          images,
          tags,
        }),
      });

      setTitle("");
      setContent("");
      setImage("");
      setImage2("");
      setTag("");
      setTag2("");

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex justify-center p-20">
        <label className="form-control w-full max-w-xs">
          <h2 className="flex justify-center align-center font-bold text-3xl p-5">Add New Blog Post</h2>
          <form onSubmit={handleSubmit}>
            <div className="label p-5">
              <span className="label-text">Title</span>
            </div>
            <div className="">
              <input type="text" placeholder="Enter title..." className="input input-bordered w-full max-w-xs" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="label p-5">
              <span className="label-text">Content</span>
            </div>
            <div className="">
              <textarea className="textarea textarea-bordered h-24 w-full max-w-xs" placeholder="Enter content..." value={content} onChange={(e) => setContent(e.target.value)} />
              {/* <input
                type="text"
                placeholder="Enter content..."
                className="input input-bordered w-full max-w-xs"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              /> */}
            </div>
            <div className="label p-5">
              <span className="label-text">Image</span>
            </div>
            <div className="">
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5" value={image} onChange={(e) => setImage(e.target.value)} />
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => setImage2(e.target.value)} />
            </div>
            <div className="label p-5">
              <span className="label-text">Tags</span>
            </div>
            <div className="">
              <div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5" value={tag} onChange={(e) => setTag(e.target.value)} />
              </div>
              <div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={tag2} onChange={(e) => setTag2(e.target.value)} />
              </div>
            </div>
            <div className="mt-10">
              <button type="submit" className="btn">
                Add New Blog
              </button>
            </div>
          </form>
        </label>
      </div>
    </>
  );
}
