"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { useRouter } from "next/navigation";
// import { readBlogAll } from "@/models/blogpost";

interface NewsArticle {
  id: number;
  _id: string;
  category: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    title: string;
  };
  publishedAt: string;
  readTime: string;
  thumbnail: string;
  isSaved: boolean;
}

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchArticle = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogpost`);

    const responseJson = await response.json();
    setArticles(responseJson.data);

    return responseJson;
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  const handleSave = (articleId: number) => {
    setArticles(
      articles.map((article) => {
        if (article.id === articleId) {
          return { ...article, isSaved: !article.isSaved };
        }
        return article;
      })
    );
  };

  const router = useRouter();

  const redirectToSubscribe = () => {
    router.push("/?scroll=subscribe");
  };

  // Filter articles based on selected category
  const filteredArticles = articles.filter((article) => (selectedCategory === "All" ? true : article.category === selectedCategory));

  // Get unique categories from articles
  const categories = ["All", ...new Set(articles.map((article) => article.category))];

  return (
    <div className="bg-slate-900 min-h-screen pb-12">
      {/* Dynamic Category Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category, idx) => (
            <button key={idx} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${category === selectedCategory ? "bg-yellow-500 text-slate-900 font-medium" : "bg-slate-800 text-gray-400 hover:text-white"}`}>
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-8">
          {/* Main News Column */}
          <div className="col-span-12 lg:col-span-8">
            {filteredArticles.map((article, idx) => (
              <motion.article key={article._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className={`group bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-800/80 transition-colors ${idx !== articles.length - 1 ? "mb-6" : ""}`}>
                <Link href={`/news/${article._id}`} className="grid md:grid-cols-12 gap-6 p-4">
                  {/* Thumbnail - Updated with padding */}
                  <div className="md:col-span-5 relative">
                    <div className="relative aspect-[16/10] md:aspect-[4/3] w-full h-full rounded-lg overflow-hidden">
                      <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={idx === 0} unoptimized />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent md:hidden" />
                    </div>
                    <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-slate-900 text-sm font-medium rounded-lg md:hidden">{article.category}</span>
                  </div>

                  {/* Content - rest sama */}
                  <div className="md:col-span-7">
                    <div className="flex items-center justify-between mb-4">
                      <span className="hidden md:block px-3 py-1 bg-yellow-500/10 text-yellow-500 text-sm font-medium rounded-lg">{article.category}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleSave(article.id);
                        }}
                        className="text-gray-400 hover:text-yellow-500">
                        {article.isSaved ? <IoBookmark className="w-5 h-5 text-yellow-500" /> : <IoBookmarkOutline className="w-5 h-5" />}
                      </button>
                    </div>

                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors line-clamp-2">{article.title}</h2>

                    <p className="text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">{article.excerpt}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <h4 className="font-medium text-white">{article.author.name}</h4>
                        <p className="text-gray-400">{article.author.title}</p>
                      </div>
                      <div className="flex items-center gap-3 text-gray-400">
                        <span>{article.publishedAt}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-400" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* Popular Topics */}
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {["Hukum Bisnis", "Startup", "UU PDP", "Persidangan", "Digital", "Regulasi", "UKM"].map((topic, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-gray-300 hover:text-white rounded-lg cursor-pointer transition-all duration-200 ease-in-out">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Legal Newsletter</h3>
              <p className="text-gray-400 text-sm mb-4">Dapatkan update hukum terbaru & analisis terbaru ke inbox</p>
              <button onClick={redirectToSubscribe} className="w-full px-4 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded-lg transition-colors">
                Langganan Sekarang
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
