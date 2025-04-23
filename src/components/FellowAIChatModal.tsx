import { useState, useRef, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Send } from "lucide-react";
import { useGeminiReply } from "@/hooks/useGeminiReply";
import { Avatar } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast"; // <-- fix: correctly import toast

interface FellowAIChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fellow: {
    id: string;
    name: string;
    avatar: string;
  } | null;
  geminiApiKey: string;
}

interface Message {
  id: string;
  content: string;
  sender: "me" | "ai";
  createdAt: Date;
  status?: "pending" | "done" | "error";
}

const EXAMPLE_QUESTIONS = [
  "Hi! How are you?",
  "What projects are you working on?",
  "Can you help me with my assignment?",
  "Let's meet sometime!"
];

const FellowAIChatModal = ({
  open,
  onOpenChange,
  fellow,
  geminiApiKey
}: FellowAIChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const { getGeminiReply, loading } = useGeminiReply();
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const lastSentRef = useRef<number>(0);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  const addPendingAiMessage = () => {
    setMessages(msgs => [
      ...msgs,
      {
        id: "pending-ai",
        content: "Gemini is typing...",
        sender: "ai",
        createdAt: new Date(),
        status: "pending"
      }
    ]);
  };

  const updatePendingAiMessage = (realText: string | null, errorMsg?: string) => {
    setMessages(msgs => 
      msgs.map(m => 
        m.id === "pending-ai"
          ? {
              ...m,
              content: errorMsg
                ? errorMsg
                : realText && realText.trim() !== ""
                  ? realText
                  : "Sorry, I could not generate a reply right now. Please try again with a different question.",
              status: errorMsg ? "error" : "done"
            }
          : m
      )
    );
  };

  // Helper function for warning toasts (uses shadcn/ui toast)
  function showToast(msg: string) {
    toast({
      description: msg,
      variant: "default" // Use allowed variant
    });
  }

  // Allow sending at any time, no matter the state
  const handleSend = async (customMessage?: string) => {
    setAiError(null);
    const msgToSend = typeof customMessage === "string" ? customMessage : input.trim();
    // If input is empty, still allow send but warn user
    if (!msgToSend) {
      showToast("Please enter a message before sending.");
      // (Optional: continue with sending blank, or just return; user requested to allow send.)
      // Remove the next line to allow sending empty, or keep for gentle warning:
      // return;
    }

    // Debug log for trace
    console.log("Sending message:", msgToSend || "(empty)");

    // Very basic rate limit: warn if sent <0.75s apart
    const now = Date.now();
    if (now - lastSentRef.current < 750) {
      showToast("You're sending messages too quickly! Please slow down.");
    }
    lastSentRef.current = now;

    const userMsg: Message = {
      id: Math.random().toString(36).slice(2),
      content: msgToSend,
      sender: "me",
      createdAt: new Date(),
    };
    setMessages((msgs) => [...msgs, userMsg]);
    if (!customMessage) setInput("");

    setSending(true);
    addPendingAiMessage();

    let aiText = "";
    try {
      aiText = await getGeminiReply({ message: userMsg.content });
      // Debug log AI response
      console.log("Gemini replied:", aiText);
      if (
        !aiText ||
        aiText.toLowerCase().startsWith("error") ||
        aiText.includes("Gemini backend")
      ) {
        setAiError(
          typeof aiText === "string"
            ? aiText
            : "Could not get a valid reply from Gemini. Please try again later."
        );
        updatePendingAiMessage(null, aiText || undefined);
      } else {
        updatePendingAiMessage(aiText);
      }
    } catch (e: any) {
      setAiError("Gemini failed to reply. " + (e?.message || ""));
      updatePendingAiMessage(null, "Gemini failed to reply. " + (e?.message || ""));
    }
    setSending(false);
  };

  useEffect(() => {
    if (!open) setMessages([]);
    setAiError(null);
  }, [open, fellow]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Allow sending always, even if input is empty
      handleSend();
    }
  };

  const handleExampleClick = (q: string) => {
    handleSend(q);
    setInput("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="max-w-md w-full p-0 flex flex-col">
        <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 bg-[#075E54] text-white">
          <Avatar className="h-10 w-10">
            {fellow?.avatar && (
              <img src={fellow.avatar} alt={fellow?.name} className="w-full h-full object-cover" />
            )}
          </Avatar>
          <span className="font-semibold">{fellow?.name}</span>
        </div>
        <div
          ref={chatBodyRef}
          className="flex-1 px-3 py-4 overflow-y-auto bg-[#ece5dd]"
        >
          {messages.length === 0 && (
            <div>
              <div className="text-center text-gray-500 pt-24 mb-4">
                Say hi to {fellow?.name}!<br />
                <span className="text-xs text-gray-400">AI replies powered by Gemini</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {EXAMPLE_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    className="bg-white text-gray-700 border px-3 py-1 rounded-full text-xs shadow hover:bg-gray-100"
                    onClick={() => handleExampleClick(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg px-3 py-2 my-1 max-w-[70%] shadow text-sm break-words
                ${msg.sender === "me"
                  ? "bg-[#DCF8C6] text-gray-800"
                  : msg.status === "pending"
                    ? "bg-gray-200 text-gray-500 italic"
                    : msg.status === "error"
                      ? "bg-red-100 text-red-500"
                      : "bg-white dark:bg-muted text-gray-900 dark:text-gray-50"}`}
              >
                {msg.content}
                <div className="text-[10px] leading-tight text-right opacity-60 mt-1">
                  {msg.status === "pending" || msg.status === "error"
                    ? ""
                    : msg.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}
          {aiError && (
            <div className="text-xs text-red-500 mt-2 text-center">
              {aiError}
            </div>
          )}
        </div>
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 border-t bg-white">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 rounded-full px-4 py-2 border focus:outline-none text-sm"
            placeholder="Type a message"
            onKeyDown={handleInputKeyDown}
            disabled={false} // Always allow typing
            aria-label="Type a message"
          />
          <button
            onClick={() => handleSend()}
            disabled={false} // Always enabled, as requested
            className="p-2 bg-[#25d366] rounded-full text-white hover:bg-[#22ba5b] transition-colors"
            aria-label="Send"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FellowAIChatModal;
