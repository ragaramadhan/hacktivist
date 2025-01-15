"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IoTimeOutline,
  IoBookmarkOutline,
  IoBookmark,
  // IoPrintOutline,
  IoChevronBack,
} from "react-icons/io5";

type Article = {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  content: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  thumbnail: string;
  isSaved: boolean;
  tags: string[];
  relatedArticles: {
    id: number;
    title: string;
    category: string;
    thumbnail: string;
  }[];
};

export type Props = {
  article: {
    statusCode: number;
    data: Article;
  };
};

export default function NewsArticle({ article }: Props) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="bg-slate-900 min-h-screen pb-12">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/news" className="inline-flex items-center gap-2 text-gray-400 hover:text-white">
          <IoChevronBack className="w-5 h-5" />
          <span>Kembali ke News</span>
        </Link>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800 rounded-xl overflow-hidden">
              {/* Article Header */}
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-500 text-sm font-medium rounded-lg mb-4">{article.data.category}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{article.data.title}</h1>
                <p className="text-xl text-gray-300 mb-6">{article.data.subtitle}</p>
                <div className="flex items-center justify-between border-t border-slate-700 pt-6">
                  <div className="flex items-center gap-4">
                    <Image src={article.data.author.avatar} alt={article.data.author.name} width={48} height={48} className="w-12 h-12 rounded-full" unoptimized />

                    <div>
                      <h3 className="font-medium text-white">{article.data.author.name}</h3>
                      <p className="text-sm text-gray-400">{article.data.author.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <IoTimeOutline className="w-5 h-5" />
                      <span>{article.data.readTime}</span>
                    </div>
                    <span>{article.data.publishedAt}</span>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative aspect-[21/9] w-full">
                <Image src={article.data.thumbnail} alt={article.data.title} fill className="object-cover" priority unoptimized />
              </div>

              {/* Article Body */}
              <div className="p-6 md:p-8">
                <div className="text-gray-300 space-y-6">
                  {article.data.content.split("\n\n").map((paragraph, idx) => {
                    if (!paragraph.trim()) return null;

                    if (paragraph.trim().match(/^\d+\./)) {
                      const items = paragraph.split("\n").map((item) => item.trim());
                      return (
                        <ol key={idx} className="list-decimal pl-6 space-y-2">
                          {items.map((item, i) => (
                            <li key={i}>{item.replace(/^\d+\.\s*/, "")}</li>
                          ))}
                        </ol>
                      );
                    }

                    if (paragraph.trim().match(/^[a-z]\)/i)) {
                      const items = paragraph.split("\n").map((item) => item.trim());
                      return (
                        <ol key={idx} className="list-[lower-alpha] pl-6 space-y-2">
                          {items.map((item, i) => (
                            <li key={i}>{item.replace(/^[a-z]\)\s*/i, "")}</li>
                          ))}
                        </ol>
                      );
                    }

                    if (paragraph.trim().match(/^-/)) {
                      const items = paragraph.split("\n").map((item) => item.trim());
                      return (
                        <ul key={idx} className="list-disc pl-6 space-y-2">
                          {items.map((item, i) => (
                            <li key={i}>{item.replace(/^-+\s*/, "")}</li>
                          ))}
                        </ul>
                      );
                    }

                    if (paragraph.trim().split("\n").length === 1 && (paragraph.includes("Dampak") || paragraph.includes("Kesimpulan") || paragraph.includes("Langkah"))) {
                      return (
                        <h2 key={idx} className="text-xl font-bold text-white">
                          {paragraph}
                        </h2>
                      );
                    }

                    return <p key={idx}>{paragraph}</p>;
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* Action Buttons */}
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <button onClick={() => setIsSaved(!isSaved)} className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600">
                  {isSaved ? <IoBookmark className="w-5 h-5 text-yellow-500" /> : <IoBookmarkOutline className="w-5 h-5" />}
                  <span>Save Article</span>
                </button>
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Related Articles</h3>
              <div className="space-y-4">
                {/* {article.data.relatedArticles.map((related) => ( */}
                <Link
                  // key={related.id}
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/news/677bb455708867a17e06ac73`}
                  className="group block">
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3">
                    <Image src="https://images.pexels.com/photos/4427556/pexels-photo-4427556.jpeg?auto=compress&cs=tinysrgb&w=800" alt="news 2" fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                  </div>
                  <span className="text-sm text-yellow-500">Startup</span>
                  <h4 className="text-white font-medium group-hover:text-yellow-500 transition-colors line-clamp-2">5 Aspek Hukum yang Wajib Diperhatikan Startup</h4>
                </Link>
                <Link
                  // key={related.id}
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/news/677bb455708867a17e06ac74`}
                  className="group block">
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3">
                    <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40" alt="news 3" fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                  </div>
                  <span className="text-sm text-yellow-500">Regulasi</span>
                  <h4 className="text-white font-medium group-hover:text-yellow-500 transition-colors line-clamp-2">Panduan Lengkap Perizinan Usaha di Era Digital</h4>
                </Link>
                {/* ))} */}
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
