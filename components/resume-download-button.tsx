"use client";

import { useTranslations } from "next-intl";
import { Download } from "lucide-react";
import { Button } from "./ui/button";

export function ResumeDownloadButton() {
  const t = useTranslations("header");

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // Update with actual resume path
    link.download = "Nguyen-Minh-Hieu-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={handleDownload} variant="default" size="lg">
      <Download className="w-4 h-4" />
      {t("downloadResume")}
    </Button>
  );
}
