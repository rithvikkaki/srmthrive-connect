import { useState, useRef, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Send } from "lucide-react";
import { useGeminiReply } from "@/hooks/useGeminiReply";
import { Avatar } from "@/components/ui/avatar";

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
  status?: "pending" | "done";
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
  const { getGeminiReply, loading } = useGeminiReply();
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat on new messages
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Helper to add a pending AI loading bubble
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

  const updatePendingAiMessage = (realText: string | null) => {
    setMessages(msgs => 
      msgs.map(m => 
        m.id === "pending-ai"
          ? {
              ...m,
              content: realText && realText.trim() !== ""
                ? realText
                : "Sorry, I could not generate a reply right now. Please try again with a different question.",
              status: "done"
            }
          : m
      )
    );
  };

  const removePendingAiMessage = () => {
    setMessages(msgs => msgs.filter(m => m.id !== "pending-ai"));
  };

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const userMsg: Message = {
      id: Math.random().toString(36).slice(2),
      content: input.trim(),
      sender: "me",
      createdAt: new Date(),
    };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setSending(true);

    // Add AI's "typing" bubble
    addPendingAiMessage();

    // AI reply with Gemini
    let aiText = "";
    try {
      aiText = await getGeminiReply({ message: userMsg.content });
    } catch (e) {
      aiText = "Sorry, Gemini could not reply due to an error.";
    }

    // Update the pending message to the real reply
    updatePendingAiMessage(aiText);

    setSending(false);
  };

  // Reset messages when switching fellow or closing
  useEffect(() => {
    if (!open) setMessages([]);
  }, [open, fellow]);

  // Add this helper function that both sets the input and triggers sending the message
  const handleExampleClick = async (q: string) => {
    setInput(q);
    // Wait for input state to update, then send
    // Using a microtask to ensure state update
    setTimeout(() => {
      handleSend();
    }, 0);
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
                    : "bg-white dark:bg-muted text-gray-900 dark:text-gray-50"}`}
              >
                {msg.content}
                <div className="text-[10px] leading-tight text-right opacity-60 mt-1">
                  {msg.status === "pending"
                    ? ""
                    : msg.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 border-t bg-white">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 rounded-full px-4 py-2 border focus:outline-none text-sm"
            placeholder="Type a message"
            onKeyDown={e => e.key === "Enter" && handleSend()}
            disabled={sending || loading}
          />
          <button
            onClick={handleSend}
            disabled={sending || loading || !input.trim()}
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
