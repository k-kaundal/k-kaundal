import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaMedium,
  FaGlobe,
  FaEnvelope,
  FaDiscord,
  FaSlack,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";

/**
 * Chat links. Paste the real URLs here and they show up everywhere
 * (hero, contact and footer) automatically. Empty values are skipped.
 *
 * Discord: an invite (https://discord.gg/xxxx) or profile (https://discord.com/users/<id>)
 * Slack:   a workspace invite or Slack Connect URL
 */
export const DISCORD_URL = "";
export const SLACK_URL = "";

/** Original X account — kept alongside the newer one. */
export const X_HANDLE = "k_k_kaundal";
/** X account whose articles/threads are embedded on the site. */
export const X_ARTICLES_HANDLE = "kkworld";

export type Social = {
  icon: IconType;
  url: string;
  label: string;
  color: string;
};

const allSocials: Social[] = [
  {
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/kaundal",
    label: "LinkedIn",
    color: "hover:text-blue-700",
  },
  {
    icon: FaGithub,
    url: "https://github.com/k-kaundal",
    label: "GitHub",
    color: "hover:text-gray-900 dark:hover:text-white",
  },
  {
    icon: FaXTwitter,
    url: `https://x.com/${X_ARTICLES_HANDLE}`,
    label: `X — @${X_ARTICLES_HANDLE}`,
    color: "hover:text-black dark:hover:text-white",
  },
  {
    icon: FaTwitter,
    url: `https://x.com/${X_HANDLE}`,
    label: `X — @${X_HANDLE}`,
    color: "hover:text-blue-500",
  },
  {
    icon: FaDiscord,
    url: DISCORD_URL,
    label: "Discord",
    color: "hover:text-indigo-500",
  },
  {
    icon: FaSlack,
    url: SLACK_URL,
    label: "Slack",
    color: "hover:text-fuchsia-600",
  },
  {
    icon: FaMedium,
    url: "https://solidity.today",
    label: "Medium (Solidity.Today)",
    color: "hover:text-green-700",
  },
  {
    icon: FaGlobe,
    url: "https://kaundal.vip",
    label: "Blog (kaundal.vip)",
    color: "hover:text-purple-500",
  },
  {
    icon: FaEnvelope,
    url: "mailto:kaundal.k.k@gmail.com",
    label: "Email",
    color: "hover:text-red-500",
  },
];

/** Every social with a URL filled in. */
export const socials = allSocials.filter((s) => s.url.length > 0);

/** Icon-row set for the hero — the short list, no email. */
export const heroSocials = socials.filter((s) => s.label !== "Email");

export const EMAIL = "kaundal.k.k@gmail.com";
