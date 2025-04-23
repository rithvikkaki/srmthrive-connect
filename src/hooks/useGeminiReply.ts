
import { useState } from "react";

type Params = {
  message: string;
};

export function useGeminiReply() {
  const [loading, setLoading] = useState(false);

  async function getGeminiReply({ message }: Params): Promise<string> {
    setLoading(true);
    try {
      const response = await fetch(
        "https://czdxzclliafbxrxblpjt.functions.supabase.co/gemini-ai",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );
      const data = await response.json();
      setLoading(false);

      if (data.error) {
        return `Error: ${data.error.message || "Unknown error from Gemini backend"}`;
      }
      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't think of a reply."
      );
    } catch (err: any) {
      setLoading(false);
      return "Error reaching Gemini backend. Please try again.";
    }
  }
  return { getGeminiReply, loading };
}
