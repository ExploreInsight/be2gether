"use client";
import { Button } from "@/components/ui/Button";
import { Segmented } from "@/components/ui/Segmented";
import { Switch } from "@/components/ui/Switch";
import { useSettings } from "@/stores/settings";
import { ThemePicker } from "./ThemePicker";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-4 rounded-3xl border border-rule bg-card p-5 shadow-card">
    <h2 className="font-display text-xl font-extrabold leading-tight">{title}</h2>
    {children}
  </section>
);

export function SettingsView() {
  const mode = useSettings((s) => s.mode);
  const density = useSettings((s) => s.density);
  const largeText = useSettings((s) => s.largeText);
  const animations = useSettings((s) => s.animations);
  const likes = useSettings((s) => s.showLikeCounts);
  const set = useSettings((s) => s.set);
  const reset = useSettings((s) => s.reset);
  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-extrabold leading-tight">Settings</h1>
      <p className="text-muted">Saved on this device only.</p>
      <Section title="Colour">
        <Segmented label="Light or dark" value={mode} onChange={(v) => set("mode", v)} options={[{ value: "system", label: "Match device" }, { value: "light", label: "Light" }, { value: "dark", label: "Dark" }]} />
        <ThemePicker />
      </Section>
      <Section title="Motion">
        <Switch label="Animations" description="Turn off every transition and entrance. Always off if your device asks for reduced motion." checked={animations} onChange={(v) => set("animations", v)} />
      </Section>
      <Section title="Reading">
        <Segmented label="Density" value={density} onChange={(v) => set("density", v)} options={[{ value: "comfortable", label: "Comfortable" }, { value: "compact", label: "Compact" }]} />
        <Switch label="Larger text" description="Scales everything up by about 12%." checked={largeText} onChange={(v) => set("largeText", v)} />
        <Switch label="Show like counts" description="Hide the numbers if you would rather not compare." checked={likes} onChange={(v) => set("showLikeCounts", v)} />
      </Section>
      <Button variant="outline" onClick={reset}>Reset to defaults</Button>
    </div>
  );
}
