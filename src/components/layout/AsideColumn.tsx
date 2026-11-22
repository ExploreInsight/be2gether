import { SuggestedPeople } from "@/components/people/SuggestedPeople";
import { TrendingTags } from "@/components/people/TrendingTags";

export function AsideColumn() {
  return (
    <aside aria-label="Suggestions" className="sticky top-10 hidden h-fit w-72 shrink-0 space-y-10 xl:block">
      <TrendingTags />
      <SuggestedPeople />
      <p className="text-sm text-muted">Posts and people marked demo are sample content and can be removed from Admin.</p>
    </aside>
  );
}
