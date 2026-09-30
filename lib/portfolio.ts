import raw from "@/data/portfolio.json";
import type { Portfolio } from "@/lib/types";

/**
 * All page content lives in `data/portfolio.json`. Edit that file to change copy,
 * links, jobs, skills or themes — no component edits required.
 */
export const portfolio = raw as Portfolio;

export type { Portfolio };
