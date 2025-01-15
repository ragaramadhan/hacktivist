"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [userPrompt, setUserPrompt] = useState("");
  const [currentResponse, setCurrentResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userPrompt) return;

    const userMessage = { role: "user", content: userPrompt };
    setChatHistory((prev) => [...prev, userMessage]);
    setLoading(true);
    setCurrentResponse("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemPrompt: `
You are HacktiLaw, a legal assistant specializing in Indonesian law. Always respond in English or Indonesian based on the user's input language.

Structure your answers using proper Markdown formatting for clarity:
- Use headings (e.g., ### Heading) for major points.
- Ensure that lists are properly formatted with newlines separating each item.
  Example:
  1. First item.
  2. Second item with details.
  3. Third item with more details.

- Add a blank line between paragraphs, headings, and lists.
- Use * or - for unordered lists and 1. for ordered lists.

Provide concise and actionable advice, citing specific Indonesian legal provisions (UUD, articles, and clauses) when relevant. End your response with this disclaimer: "Disclaimer: My knowledge of Indonesian law is up to date as of January 2025."

Ensure the output is properly formatted and easy to read.
          `,
          userPrompt,
        }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let result = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        result += chunk;

        // Update current response for streaming effect
        setCurrentResponse((prev) => prev + chunk);
      }

      // Preprocess the response to ensure proper markdown formatting
      const cleanedResult = result
        .replace(/(\d+\.\s)/g, "\n$1") // Add a newline before numbered list items
        .replace(/(\*\s)/g, "\n$1") // Add a newline before bullet points
        .replace(/\n\n+/g, "\n\n") // Remove excessive blank lines
        .trim();

      setChatHistory((prev) => [...prev, { role: "assistant", content: cleanedResult }]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prev) => [...prev, { role: "assistant", content: "Failed to fetch response." }]);
    } finally {
      setLoading(false);
      setUserPrompt("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">HacktiLaw</h1>
        <div className="h-96 overflow-y-auto border border-gray-300 rounded-md p-4 mb-4 bg-gray-50">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`mb-3 ${chat.role === "user" ? "text-right" : "text-left"}`}>
              {chat.role === "user" ? (
                <p className="inline-block px-4 py-2 rounded-lg bg-blue-500 text-white">{chat.content}</p>
              ) : (
                <div className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-gray-800">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => <p className="mb-2">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc list-inside">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside">{children}</ol>,
                      li: ({ children }) => <li className="ml-4">{children}</li>,
                      h1: ({ children }) => <h1 className="text-xl font-bold my-2">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-lg font-semibold my-2">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-base font-medium my-2">{children}</h3>,
                    }}
                  >
                    {chat.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="text-left">
              <p className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-gray-800">{currentResponse}</p>
            </div>
          )}
        </div>
        <textarea value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)} placeholder="Describe your legal issue..." rows={3} className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300" />
        <button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50">
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}
