import seo from "../config/seo.json";

export const prerender = true;

export function GET() {
  return new Response(seo.robots || "User-agent: *\nAllow: /", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
