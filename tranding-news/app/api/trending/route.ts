import Parser from "rss-parser";

type FeedItem = {
  title: string;
  link: string;
  pubDate?: string;
  channel?: string;
  contentSnippet?: string;
  categories?: string[];
  image?: string;
};
type FeedsResult = Record<string, FeedItem[]>;

const FEEDS = [
  { name: "Google News", url: "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en" },
  { name: "TechCrunch", url: "https://techcrunch.com/feed/" },
  { name: "BBC World", url: "http://feeds.bbci.co.uk/news/world/rss.xml" },
  { name: "Hacker News", url: "https://hnrss.org/frontpage" },
  { name: "The Verge", url: "https://www.theverge.com/rss/index.xml" },
  { name: "Wired", url: "https://www.wired.com/feed/rss" },
  { name: "Engadget", url: "https://www.engadget.com/rss.xml" },
  { name: "Kaundal VIP", url: "https://kaundal.vip/feed/" }
];

const parser = new Parser({
  customFields: {
    item: [
      ["dc:creator", "creator"],
      ["content:encoded", "contentEncoded"],
      ["category", "categories"]
    ]
    // No channel key here!
  }
});

// Helper to extract image from description/content (for feeds like Kaundal VIP)
function extractImage(html?: string): string | undefined {
  if (!html) return undefined;
  const match = html.match(/<img [^>]*src=["']([^"']+)["']/i);
  return match ? match[1] : undefined;
}

export async function GET() {
  try {
    const results: FeedsResult = {};

    for (const feed of FEEDS) {
      const parsed = await parser.parseURL(feed.url);

      // Channel image (if available)
      const channelImage =
        (parsed as any).image?.url ||
        extractImage(parsed.description);

      results[feed.name] = parsed.items.slice(0, 10).map(item => {
        // Prefer content:encoded, then description/contentSnippet for description
        const desc: string =
          (item as any).contentEncoded ||
          item.contentSnippet ||
          item['content:encoded'] ||
          item.description ||
          "";

        const categories =
          Array.isArray(item.categories)
            ? item.categories
            : typeof item.categories === "string"
            ? [item.categories]
            : [];

        // Try to extract image from description/content
        const img =
          extractImage(desc) ||
          extractImage(item.contentSnippet) ||
          channelImage;

        return {
          title: item.title ?? "",
          link: item.link ?? "",
          pubDate: item.pubDate ?? "",
          channel: (item.creator || (parsed as any).title || feed.name) as string,
          contentSnippet: desc.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 225) + "...",
          categories,
          image: img
        };
      });
    }

    return Response.json({ feeds: results });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}