/**
 * Notes, articles and experiments shown in the Research & Notes section.
 *
 * TO ADD AN ENTRY: append to `entries` below. `topic` must be one of the
 * values in `topics` so the filter picks it up. `minutes` is reading time;
 * `kind` drives the badge. Keep `summary` to two or three sentences — it is
 * the abstract people skim before deciding to open the piece.
 */

export const topics = [
  "All",
  "LLM Engineering",
  "RAG & Retrieval",
  "Agents",
  "Security",
  "Web3",
] as const;

export type Topic = (typeof topics)[number];

export type Kind = "Article" | "Note" | "Experiment" | "Collection";

export type Entry = {
  title: string;
  kind: Kind;
  topic: Exclude<Topic, "All">;
  summary: string;
  href: string;
  /** Estimated reading time in minutes. Omit for collections. */
  minutes?: number;
  /** Where it lives, e.g. "kaundal.vip". */
  venue: string;
};

/**
 * Seeded with the places the writing actually lives. Replace these with
 * individual pieces as you publish them — the section is built to hold
 * per-article entries, not just hubs.
 */
export const entries: Entry[] = [
  {
    title: "Notes on AI engineering, LLM patterns and building in public",
    kind: "Collection",
    topic: "LLM Engineering",
    summary:
      "The main writing archive: working notes on retrieval quality, evaluation, prompt architecture and what breaks when an LLM feature meets real users.",
    href: "https://kaundal.vip",
    venue: "kaundal.vip",
  },
  {
    title: "Solidity, smart contracts and Web3 engineering",
    kind: "Collection",
    topic: "Web3",
    summary:
      "Long-form pieces on contract design, auditing habits and the practical side of shipping on-chain systems.",
    href: "https://solidity.today",
    venue: "solidity.today",
  },
  {
    title: "Threads and articles on X",
    kind: "Collection",
    topic: "LLM Engineering",
    summary:
      "Shorter, faster notes — things learned mid-build, benchmarks worth sharing, and arguments about agent design.",
    href: "https://x.com/kkworld",
    venue: "@kkworld",
  },
];

/** Open questions currently being worked on. Edit freely — this is your agenda. */
export const researchThreads: {
  question: string;
  detail: string;
  status: "Active" | "Exploring" | "Background";
}[] = [
  {
    question: "How do you evaluate a RAG system without a labelled dataset?",
    detail:
      "Most retrieval work starts with no ground truth. Interested in bootstrapping evals from production traffic, LLM-as-judge with calibration checks, and knowing when a retrieval score is measuring anything real.",
    status: "Active",
  },
  {
    question: "What guardrails actually stop an agent loop from running away?",
    detail:
      "Step budgets and tool allowlists are the easy part. The harder question is detecting when an agent is confidently wrong mid-run, and where a human checkpoint belongs without destroying the workflow.",
    status: "Active",
  },
  {
    question: "Where does prompt injection defence belong in the stack?",
    detail:
      "Input filtering, output constraints, tool-permission boundaries — each catches a different class. Working through which layer earns its complexity for an app that reads untrusted content.",
    status: "Exploring",
  },
  {
    question: "What is the real cost curve of an LLM feature at scale?",
    detail:
      "Token spend is visible; latency budgets, cache hit rates and the retries hiding behind a p99 are not. Building the observability to answer this before the invoice does.",
    status: "Background",
  },
];
