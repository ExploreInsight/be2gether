'use client';

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";
// import Image from "next/image";

interface ImageUploadProps {
    onChange: (url: string) => void;
    value: string;
    endpoint: "postImage";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
    if (value) {
        return (
            <div className="relative inline-block">
                <img src={value} alt="Uploaded" className="rounded-md size-40 object-cover" />
                <button
                    onClick={() => onChange("")}
                    className="absolute top-0 right-0 p-1 bg-destructive text-destructive-foreground rounded-full shadow-sm"
                    type="button"
                    aria-label="Remove image"
                >
                    <XIcon className="h-4 w-4" />
                </button>
            </div>
        )
    }
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />

    )

}

export default ImageUpload;