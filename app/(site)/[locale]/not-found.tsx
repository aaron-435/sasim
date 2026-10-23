import type { Metadata } from "next";
import NotFoundView from "@/components/NotFoundView";

// Unknown slugs under a language (e.g. /es/day-master/nope). No headers()/cookies() here: that would
// make every prerendered page under [locale] dynamic. NotFoundView reads the language from the URL.
export const metadata: Metadata = { title: "Fatesaid", robots: { index: false } };

export default function NotFound() {
  return <NotFoundView />;
}
