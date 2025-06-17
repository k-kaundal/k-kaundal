"use client";
import { useEffect, useState } from "react";

type FeedItem = {
  title: string;
  link: string;
  pubDate?: string;
  channel?: string;
  contentSnippet?: string;
  image?: string;
  categories?: string[];
};

type FeedsResult = Record<string, FeedItem[]>;

function formatDate(date?: string) {
  if (!date) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

function LoadingCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-blue-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 shadow p-6 animate-pulse"
        >
          <div className="h-32 w-full bg-gradient-to-r from-blue-100 via-blue-50 to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 rounded mb-4" />
          <div className="h-4 bg-blue-100 dark:bg-gray-800 rounded w-1/4 mb-2" />
          <div className="h-6 bg-blue-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
          <div className="h-4 bg-blue-100 dark:bg-gray-800 rounded w-2/3 mb-2" />
          <div className="h-4 bg-blue-50 dark:bg-gray-900 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

function SidebarDoc({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />
      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 z-50 shadow-lg transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ fontFamily: "inherit", overflowY: "auto" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300">API Usage & Docs</h2>
          <button
            className="text-2xl text-blue-500 hover:text-blue-700 focus:outline-none"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>
        <div className="p-5 text-sm max-h-[calc(100vh-64px)] overflow-y-auto">
          <h3 className="font-semibold text-blue-600 mb-3">How to call this API</h3>
          <p className="mb-4">
            <b>Endpoint:</b> <code className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">/api/trending</code>
          </p>
          <h4 className="font-semibold mb-2">Response Example</h4>
          <pre className="bg-gray-100 dark:bg-gray-800 rounded p-3 mb-4 text-xs overflow-x-auto">
{`{
  "feeds": {
    "Google News": [
      {
        "title": "Some Headline",
        "link": "https://...",
        "pubDate": "2025-06-17T10:55:19+00:00",
        "channel": "Google News",
        "contentSnippet": "A short description...",
        "categories": ["Tech", "World"],
        "image": "https://..."
      }
    ],
    ...
  }
}`}
          </pre>
          <h4 className="font-semibold mb-2">How to fetch (JavaScript):</h4>
          <pre className="bg-gray-100 dark:bg-gray-800 rounded p-3 mb-4 text-xs overflow-x-auto">
{`fetch("/api/trending")
  .then(res => res.json())
  .then(data => {
    // data.feeds: { [source: string]: FeedItem[] }
  });`}
          </pre>
          <h4 className="font-semibold mb-2">FeedItem Fields</h4>
          <ul className="list-disc list-inside mb-4">
            <li><b>title</b>: string</li>
            <li><b>link</b>: string</li>
            <li><b>pubDate</b>: string (ISO date)</li>
            <li><b>channel</b>: string (source/author)</li>
            <li><b>contentSnippet</b>: string (short summary)</li>
            <li><b>categories</b>: string[] (tags/categories)</li>
            <li><b>image</b>: string (URL, if available)</li>
          </ul>
          <h4 className="font-semibold mb-2">How to use</h4>
          <ul className="list-disc list-inside">
            <li>Call <code className="bg-gray-100 dark:bg-gray-800 rounded px-1">/api/trending</code> to get all feeds and articles.</li>
            <li>Each feed is keyed by its name, value is a list of FeedItems.</li>
            <li>Show, filter, or search articles as you want!</li>
          </ul>
          <div className="mt-6 text-center text-xs text-gray-500">
            Need more help? Open an issue on GitHub!
          </div>
        </div>
      </aside>
    </>
  );
}

export default function Home() {
  const [feeds, setFeeds] = useState<FeedsResult>({});
  const [sources, setSources] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("/api/trending")
      .then((res) => res.json())
      .then((data) => {
        setFeeds(data.feeds || {});
        const srcs = Object.keys(data.feeds || {});
        setSources(srcs);
        setSelected(srcs[0] || "");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors">
      {/* Sidebar Doc Button */}
      <button
        className="fixed left-4 top-4 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 shadow-lg font-bold transition"
        onClick={() => setSidebarOpen(true)}
      >
        API Docs
      </button>
      {sidebarOpen && <SidebarDoc open={sidebarOpen} setOpen={setSidebarOpen} />}

      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center text-blue-800 dark:text-blue-400 mb-4 tracking-tight drop-shadow-lg">
          🚀 Trending News & Tech
        </h1>
        <p className="text-center text-lg text-blue-900/60 dark:text-blue-200/70 mb-10 font-medium">
          Stay updated with the latest headlines and technology trends from top sources. <span className="font-semibold">No account. No tracking. Just news.</span>
        </p>
        <div className="flex gap-2 sm:gap-4 justify-center mb-8 flex-wrap">
          {sources.map((src) => (
            <button
              key={src}
              className={`relative px-5 py-2 rounded-full font-semibold transition-all duration-200
                ${
                  selected === src
                    ? "bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 text-blue-700 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-gray-800"
                }
              `}
              style={{ minWidth: 120 }}
              onClick={() => setSelected(src)}
            >
              {src}
              {selected === src && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-slidein" />
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingCards />
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {(feeds[selected] || []).map((a, i) => (
              <a
                key={a.link}
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-3xl border border-blue-100 dark:border-gray-800 bg-white/70 dark:bg-gray-950/70 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.025] transition-all duration-300 p-0 overflow-hidden backdrop-blur-lg"
                style={{ minHeight: 380 }}
              >
                {/* Image */}
                {a.image ? (
                  <div className="h-40 w-full relative overflow-hidden bg-gradient-to-r from-blue-100/50 via-purple-100/20 to-purple-200/30 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="h-40 w-full bg-gradient-to-r from-blue-100 via-purple-100 to-blue-200 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950" />
                )}

                {/* Content */}
                <div className="p-5 pb-4">
                  <div className="flex items-center gap-2 mb-1 text-xs text-blue-500 dark:text-blue-300">
                    {a.channel && (
                      <span className="bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-900 px-2 py-1 rounded-full font-bold mr-1 text-[11px] uppercase tracking-wide drop-shadow">
                        {a.channel}
                      </span>
                    )}
                    <span className="opacity-50">•</span>
                    <span className="mr-2">{formatDate(a.pubDate)}</span>
                  </div>
                  <h3 className="font-extrabold text-lg leading-snug text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors mb-2 line-clamp-2">
                    {a.title}
                  </h3>
                  {a.categories && a.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {a.categories.slice(0, 3).map((cat) => (
                        <span
                          key={cat}
                          className="inline-block text-xs bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-200 rounded px-2 py-0.5 font-medium"
                        >
                          #{cat}
                        </span>
                      ))}
                    </div>
                  )}
                  {a.contentSnippet && (
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-4">
                      {a.contentSnippet}
                    </p>
                  )}
                  <span className="inline-block text-xs text-blue-600 dark:text-blue-300 font-bold group-hover:underline group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                    Read full story →
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        <footer className="mt-14 text-center text-xs text-gray-400 dark:text-gray-500 select-none">
          <span className="font-bold text-blue-500">Trending News Blog</span> &mdash; Powered by RSS. <br />
          No DB, No tracking. © {new Date().getFullYear()}.
          <div className="flex justify-center mt-6">
            <a
              href="https://www.buymeacoffee.com/kaundalkkz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold bg-yellow-400 hover:bg-yellow-300 text-gray-900 shadow-lg transition mt-2"
              style={{ fontSize: 16 }}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <ellipse cx="12" cy="12" rx="11" ry="10" fill="#FFDD00"/>
                <path d="M7.7 17c-.9-.8-1.4-2-1.8-3.2-.5-1.3-.7-2.7-.7-4.1 0-3.2 2.8-5.8 6.3-5.8s6.3 2.6 6.3 5.8c0 1.4-.3 2.8-.7 4.1-.4 1.2-.9 2.4-1.8 3.2H7.7z" fill="#fff" />
                <circle cx="12" cy="11" r="3" fill="#FFDD00"/>
              </svg>
              Buy me a coffee
            </a>
          </div>
        </footer>
      </div>
      {/* Animations */}
      <style>{`
        @keyframes slidein {
          0% { width:0; opacity:0 }
          100% { width:75%; opacity:1 }
        }
        .animate-slidein { animation: slidein 0.5s cubic-bezier(.4,2,.7,.8) }
      `}</style>
    </div>
  );
}