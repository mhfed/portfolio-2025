"use client";

import { useState, useTransition } from "react";
import { deleteProject } from "@/actions/project-actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface DeleteButtonProps {
  projectId: number;
}

export function DeleteButton({ projectId }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProject(projectId);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || "Failed to delete project");
      }
    });
  };

  if (showConfirm) {
    return (
      <div className="flex gap-2">
        <Button
          onClick={handleDelete}
          disabled={isPending}
          variant="destructive"
          loading={isPending}
        >
          {isPending ? "Deleting..." : "Confirm"}
        </Button>
        <Button
          onClick={() => setShowConfirm(false)}
          disabled={isPending}
          variant="outline"
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => setShowConfirm(true)}
      variant="outline"
      className="border-destructive/30 text-destructive hover:bg-destructive/10"
    >
      Delete
    </Button>
  );
}




