import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { UserLite } from "@/types";

/** Round avatar. Photos are user-supplied; fallback is initials on the brand colour. */
export function Avatar({ user, size = 40, className }: { user: Pick<UserLite, "name" | "username" | "image">; size?: number; className?: string }) {
  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand font-display font-bold text-on-brand", className)}
      style={{ width: size, height: size, fontSize: size * 0.45 }}
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
