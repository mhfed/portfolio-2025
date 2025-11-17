"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink, Github } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import type { Project } from "@/data/projects";

interface ProjectCardProps extends Project {
  isAlternate: boolean;
  index?: number;
}

export function ProjectCard({
  image,
  title,
  year,
  description,
  details,
  isAlternate,
  index = 0,
  liveUrl,
  githubUrl,
  techStack,
}: ProjectCardProps) {
  const [isTruncated, setIsTruncated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const t = useTranslations("projects");

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const element = textRef.current;
        // Check if text is truncated by comparing scrollHeight with clientHeight
        const isOverflowing = element.scrollHeight > element.clientHeight;
        setIsTruncated(isOverflowing);
      }
    };

    checkTruncation();
    // Re-check on window resize
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [details]);

  return (
    <div
      className={`grid md:grid-cols-2 gap-8 items-center scroll-animate ${
        isAlternate ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative h-80 md:h-96 bg-muted rounded-none overflow-hidden border border-border/20 group cursor-pointer">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index === 0}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-h3 text-primary">{title}</h3>
          <p className="text-body-sm text-muted-foreground">{year}</p>
        </div>
        <p className="text-foreground text-body-lg font-semibold">
          {description}
        </p>

        {/* Tech Stack Badges */}
        {techStack && techStack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-none text-xs font-medium text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <p ref={textRef} className="text-body text-foreground line-clamp-2">
            {details}
          </p>
          {isTruncated && (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <button className="text-accent font-semibold text-body-lg hover:opacity-80 transition-opacity mt-4 cursor-pointer">
                  {t("viewProject")}
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="overflow-y-auto">
                  <DrawerHeader className="text-left pb-4">
                    <DrawerTitle>{title}</DrawerTitle>
                    <p className="text-body-sm text-muted-foreground mt-1">
                      {year}
                    </p>
                  </DrawerHeader>
                  <div className="px-6 pb-8">
                    <p className="text-body text-foreground">{details}</p>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>

        {/* Project Links */}
        <div className="flex items-center gap-4 pt-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-none text-primary font-semibold transition-all hover:scale-105"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Live Demo</span>
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-background hover:bg-primary/10 border border-border/30 rounded-none text-foreground font-semibold transition-all hover:scale-105"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
