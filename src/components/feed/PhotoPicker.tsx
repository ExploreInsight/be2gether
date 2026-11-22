"use client";
import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "@/stores/toast";
import { Button } from "@/components/ui/Button";

export function PhotoPicker({ url, onChange }: { url: string | null; onChange: (u: string | null) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const { startUpload, isUploading } = useUploadThing("postImage", {
    onClientUploadComplete: (res) => onChange(res?.[0]?.ufsUrl ?? res?.[0]?.url ?? null),
    onUploadError: () => toast.error("Photo upload failed. Try a smaller image."),
  });
  return (
    <div className="flex items-center gap-3">
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-label="Choose a photo"
        tabIndex={-1}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) startUpload([f]);
          e.target.value = "";
        }}
      />
      <Button type="button" variant="ghost" size="sm" loading={isUploading} onClick={() => input.current?.click()}>
        <ImagePlus aria-hidden className="size-5" />Photo
      </Button>
      {url && (
        <span className="relative inline-block rounded-xl border border-rule">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Selected photo" className="size-14 rounded-xl object-cover" />
          <button type="button" aria-label="Remove photo" onClick={() => onChange(null)} className="absolute -right-3 -top-3 inline-flex size-8 items-center justify-center rounded-full border border-rule bg-card">
            <X aria-hidden className="size-4" />
          </button>
        </span>
      )}
    </div>
  );
}
