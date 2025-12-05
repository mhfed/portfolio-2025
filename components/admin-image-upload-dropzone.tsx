"use client";

import { useState, useCallback } from "react";

interface ImageUploadDropzoneProps {
  initialUrl?: string;
  onUploadSuccess: (url: string) => void;
  label?: string;
  description?: string;
}

interface CloudinaryUploadResponse {
  secure_url?: string;
  url?: string;
}

export function ImageUploadDropzone({
  initialUrl,
  onUploadSuccess,
  label = "Project image",
  description = "Drag and drop an image here, or click to browse.",
}: ImageUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | undefined>(initialUrl);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const file = files[0];

      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        return;
      }

      if (!cloudName || !uploadPreset) {
        setError("Cloudinary is not configured. Please set the required env variables.");
        return;
      }

      setIsUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          },
        );

        if (!res.ok) {
          throw new Error("Upload failed");
        }

        const data = (await res.json()) as CloudinaryUploadResponse;
        const url = data.secure_url || data.url;

        if (!url) {
          throw new Error("No URL returned from Cloudinary");
        }

        setUploadedUrl(url);
        onUploadSuccess(url);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while uploading the image.",
        );
      } finally {
        setIsUploading(false);
      }
    },
    [cloudName, uploadPreset, onUploadSuccess],
  );

  const onDrop = useCallback<React.DragEventHandler<HTMLDivElement>>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      void handleFiles(event.dataTransfer.files);
    },
    [handleFiles],
  );

  const onDragOver = useCallback<React.DragEventHandler<HTMLDivElement>>((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback<React.DragEventHandler<HTMLDivElement>>((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  const onFileChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      void handleFiles(event.target.files);
    },
    [handleFiles],
  );

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <label className="block text-sm font-semibold text-foreground">
          {label}
        </label>
        {uploadedUrl && (
          <span className="text-xs text-muted-foreground truncate max-w-[60%]">
            {uploadedUrl}
          </span>
        )}
      </div>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`flex flex-col items-center justify-center gap-2 px-4 py-6 border border-dashed rounded-lg cursor-pointer text-sm transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border/40 bg-background"
        } ${isUploading ? "opacity-60 cursor-wait" : "hover:border-primary/60"}`}
        onClick={() => {
          const input = document.getElementById("image-upload-input");
          if (input instanceof HTMLInputElement && !isUploading) {
            input.click();
          }
        }}
        aria-label="Upload project image"
        role="button"
      >
        <p className="text-foreground text-sm text-center">
          {description}
        </p>
        <p className="text-xs text-muted-foreground">
          {isUploading ? "Uploading..." : "PNG, JPG, or WebP"}
        </p>
      </div>

      <input
        id="image-upload-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
        disabled={isUploading}
      />

      {uploadedUrl && (
        <div className="mt-2 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={uploadedUrl}
            alt="Uploaded preview"
            className="h-16 w-16 object-cover border border-border/30 bg-background rounded-md"
          />
          <span className="text-xs text-muted-foreground">
            Preview of uploaded image
          </span>
        </div>
      )}

      {error && (
        <p className="text-xs text-destructive mt-1">{error}</p>
      )}
    </div>
  );
}
