import { notFound } from "next/navigation";

// With two root layouts Next no longer renders app/not-found for unmatched URLs, so this catch-all
// sends them to the (legal) not-found page (still a 404 status).
export default function CatchAll() {
  notFound();
}
