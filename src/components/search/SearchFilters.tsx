import { Segmented } from "@/components/ui/Segmented";
import { Switch } from "@/components/ui/Switch";
import type { Sort } from "./SearchView";

export function SearchFilters({ sort, onSort, photos, onPhotos }: { sort: Sort; onSort: (s: Sort) => void; photos: boolean; onPhotos: (v: boolean) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 sm:items-end">
      <Segmented label="Order" value={sort} onChange={onSort} options={[{ value: "new", label: "Newest" }, { value: "liked", label: "Most liked" }]} />
      <Switch label="With photos only" checked={photos} onChange={onPhotos} />
    </div>
  );
}
