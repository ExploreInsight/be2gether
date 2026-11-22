import Link from "next/link";
import { TAG_RE } from "@/lib/format";

/** Post text with #tags turned into search links. */
export function TrackBody({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TAG_RE)) {
    const i = m.index ?? 0;
    if (i > last) parts.push(text.slice(last, i));
    parts.push(
      <Link key={i} href={`/search?q=${encodeURIComponent("#" + m[1])}`} className="font-semibold text-accent underline">
        #{m[1]}
      </Link>,
    );
    last = i + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <p className="whitespace-pre-wrap text-lg leading-snug [text-wrap:pretty]">{parts}</p>;
}
