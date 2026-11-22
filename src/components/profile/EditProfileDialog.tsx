"use client";
import { useState } from "react";
import { MAX_BIO_LENGTH } from "@/lib/constants";
import { patch } from "@/lib/api";
import { toast } from "@/stores/toast";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Field, Input, Textarea } from "@/components/ui/Field";
import type { Profile } from "@/types";

export function EditProfileDialog({ profile, open, onOpenChange, onSaved }: { profile: Profile; open: boolean; onOpenChange: (o: boolean) => void; onSaved: () => void }) {
  const [form, setForm] = useState({ name: profile.name ?? "", bio: profile.bio ?? "", location: profile.location ?? "", website: profile.website ?? "" });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });

  async function save() {
    setBusy(true);
    setError(null);
    try {
      await patch("/api/me", form);
      toast.ok("Profile saved.");
      onOpenChange(false);
      onSaved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange} title="Edit profile">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); save(); }}>
        <Field label="Name">{(p) => <Input {...p} value={form.name} maxLength={60} onChange={set("name")} />}</Field>
        <Field label="Bio" hint={`${form.bio.length}/${MAX_BIO_LENGTH}`}>{(p) => <Textarea {...p} value={form.bio} maxLength={MAX_BIO_LENGTH} onChange={set("bio")} />}</Field>
        <Field label="Location">{(p) => <Input {...p} value={form.location} maxLength={60} onChange={set("location")} />}</Field>
        <Field label="Website" error={error} hint="Starts with https://">{(p) => <Input {...p} type="url" value={form.website} onChange={set("website")} />}</Field>
        <Button type="submit" loading={busy}>Save profile</Button>
      </form>
    </Dialog>
  );
}
