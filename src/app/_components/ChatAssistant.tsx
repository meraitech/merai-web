"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hai! Saya asisten MERAI. Ceritakan tantangan digital Anda dan mari kita eksplorasi solusinya.",
    timestamp: "09:41",
  },
  {
    id: 2,
    role: "user",
    content: "Kami ingin website kami terasa lebih hidup dan interaktif.",
    timestamp: "09:42",
  },
  {
    id: 3,
    role: "assistant",
    content:
      "Kami bisa bantu dengan pengalaman imersif berbasis kode murni dan animasi responsif. Anda ingin fokus ke landing page atau aplikasi penuh?",
    timestamp: "09:43",
  },
];

function classNames(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

function getTime(): string {
  const now = new Date();
  return now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const timeout = setTimeout(() => {
      panelRef.current?.focus();
    }, 200);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    const { body } = document;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(isOpen ? "lenis:stop" : "lenis:start"));
    }

    if (!isOpen) {
      html.style.removeProperty("overflow");
      body.style.removeProperty("overflow");
      body.style.removeProperty("padding-right");
      return;
    }

    const scrollbarWidth = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("lenis:start"));
      }
      html.style.removeProperty("overflow");
      body.style.removeProperty("overflow");
      body.style.removeProperty("padding-right");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isOpen]);

  const lastUpdated = useMemo(() => {
    const latest = messages[messages.length - 1];
    return latest?.timestamp ?? getTime();
  }, [messages]);

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        content: trimmed,
        timestamp: getTime(),
      },
    ]);
    setInputValue("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "Terima kasih! Tim kami sedang merancang respon terbaik untuk Anda. Nantikan ide segar segera.",
          timestamp: getTime(),
        },
      ]);
    }, 600);
  }

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={handleToggle}
        className={classNames(
          "fixed bottom-8 right-8 z-60 border border-foreground/20 bg-background/90 px-5 py-3 uppercase tracking-wide text-xs hover:opacity-70 duration-300 backdrop-blur-xs focus-visible:outline focus-visible:outline-foreground/40",
          isOpen && "opacity-0 pointer-events-none"
        )}
      >
        Chat MERAI
      </button>

      <div
        className={classNames(
          "fixed inset-0 z-55 flex justify-end",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          aria-hidden="true"
          onClick={handleClose}
          className={classNames(
            "absolute inset-0 bg-foreground/20 backdrop-blur-[1px] transition-opacity duration-500",
            isOpen ? "opacity-100" : "opacity-0"
          )}
        />

        <section
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Asisten MERAI"
          tabIndex={-1}
          className="relative flex h-full w-full max-w-[420px] flex-col border-l border-foreground/20 bg-background/95 text-foreground shadow-[0_0_45px_rgba(10,10,10,0.25)] transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${isOpen ? "0%" : "100%"})` }}
        >
          <header className="border-b border-foreground/15 px-6 py-5">
            <div className="flex items-start justify-between">
              <div>
                <span>AI Chat</span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="border border-foreground/20 px-4 py-3 text-xs uppercase tracking-wide hover:opacity-70 duration-300"
              >
                Tutup
              </button>
            </div>
          </header>

          <div ref={listRef} className="flex-1 overflow-y-auto px-6 py-6">
            <div className="flex flex-col gap-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={classNames(
                    "flex",
                    message.role === "user" && "justify-end"
                  )}
                >
                  <div
                    className={classNames(
                      "max-w-[85%] border border-foreground/15 bg-background/85 px-4 py-4 text-sm leading-relaxed text-foreground/95 tracking-wide",
                      message.role === "assistant" ? "" : "opacity-80"
                    )}
                  >
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-foreground/15 px-6 py-5"
          >
            <textarea
              id="chat-message"
              name="message"
              required
              rows={3}
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Ceritakan kebutuhan digital Anda..."
              className="mb-3 w-full border border-foreground/20 bg-transparent px-4 py-3 text-sm leading-relaxed tracking-wide text-foreground outline-none transition-colors duration-300 focus:border-foreground/40"
            />
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted">
              <button
                type="submit"
                className="border border-foreground/20 px-4 py-3 ml-auto text-xs uppercase tracking-wide hover:opacity-70 duration-300"
              >
                Kirim
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
