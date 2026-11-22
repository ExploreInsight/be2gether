import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { UserLite } from "@/types";

// Soft pastels with fixed dark text (all >= 4.5:1), picked per person so faces are not identical.
const TINTS = ["#fbd5df", "#d3ecdc", "#d0e6f2", "#e3d9f7", "#fde1b0", "#fbd6c8"];

function tintFor(username: string): string {
  let h = 0;
  for (const ch of username) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TINTS[h % TINTS.length];
}

/** Round avatar. Photos are user-supplied; the fallback is initials on a per-person pastel. */
export function Avatar({ user, size = 40, className }: { user: Pick<UserLite, "name" | "username" | "image">; size?: number; className?: string }) {
  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-display font-bold text-[#2b2330]", className)}
      style={{ width: size, height: size, fontSize: size * 0.4, background: tintFor(user.username) }}
      aria-hidden
    >
      {user.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.image} alt="" width={size} height={size} className="size-full object-cover" loading="lazy" />
      ) : (
        initials(user.name, user.username)
      )}
    </span>
  );
}
