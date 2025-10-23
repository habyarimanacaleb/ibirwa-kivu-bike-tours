import React, { useState, useRef, useEffect } from "react";
import { Send} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "👋 Hi there! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;

    const phoneNumber = "250784606393";
    const encodedMessage = encodeURIComponent(input);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    setIsOpen(false);

    window.open(waUrl, "_blank");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <div className="fixed bottom-16 right-2 z-50" title="Open chat">
        <button
          onClick={toggleChat}
          className="bg-[#25D366] p-3 rounded-full shadow-lg hover:bg-[#20b358] transition"
        >
          <FaWhatsapp className="text-white text-3xl" />
        </button>
      </div>
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-xl border border-gray-300 flex flex-col overflow-hidden z-50">
          {/* Header */}
          <div className="bg-[#075E54] text-white p-3 flex items-center space-x-3">
            <div className="bg-green-300 w-10 h-10 rounded-full"></div>
            <div>
              <h4 className="text-sm font-semibold">Client Support</h4>
              <p className="text-xs text-gray-200">Online</p>
            </div>
          </div>
          {/* Messages Area */}
          <div className="flex-1 p-3 space-y-2 bg-gray-100 overflow-y-auto text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg shadow w-fit ${
                  msg.sender === "user"
                    ? "bg-[#DCF8C6] self-end ml-auto"
                    : "bg-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          {/* Input Box */}
          <div className="flex items-center p-2 border-t bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Type a message"
              className="flex-1 p-2 text-sm border border-gray-300 rounded-lg outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 text-[#25D366] hover:text-[#20b358]"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default WhatsAppChat;