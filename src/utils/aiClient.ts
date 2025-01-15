import { createGroq } from "@ai-sdk/groq";

createGroq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

export const getAIResponseStream = async (systemPrompt: string, userPrompt: string, onChunk: (chunk: string) => void): Promise<void> => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: false,
      }),
    });

    const result = await response.json();

    const text = result.choices[0]?.message?.content || "No response received.";

    for (const chunk of text.match(/.{1,50}/g) || []) {
      onChunk(chunk); // Pass each chunk to the callback
      await new Promise((resolve) => setTimeout(resolve, 100)); // Increased simulated delay to 100ms
    }
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw new Error("Failed to fetch AI response.");
  }
};
