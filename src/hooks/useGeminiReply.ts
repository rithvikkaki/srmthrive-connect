
import { useState } from "react";

type Params = {
  message: string;
  apiKey: string;
};

export function useGeminiReply() {
  const [loading, setLoading] = useState(false);

  async function getGeminiReply({ message, apiKey }: Params): Promise<string> {
    setLoading(true);
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }],
          }),
        }
      );
      const data = await response.json();
      setLoading(false);
      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't think of a reply."
      );
    } catch (err) {
      setLoading(false);
      return "Error getting reply. Please try again.";
    }
  }
  return { getGeminiReply, loading };
}
