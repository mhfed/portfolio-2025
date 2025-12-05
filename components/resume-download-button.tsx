"use client";

import { useTranslations } from "next-intl";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResumeDownloadButton() {
  const t = useTranslations("header");

  const handleDownload = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = `Nguyen-Minh-Hieu-Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={handleDownload}
      variant="gradient"
      size="lg"
      aria-label={t("downloadResume")}
    >
      <Download className="w-5 h-5" />
      <span>{t("downloadResume")}</span>
    </Button>
  );
}
