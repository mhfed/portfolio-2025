"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink, Github, ChevronLeft, X } from "lucide-react";
import {
  Drawer,
  DrawerContentSide,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
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
      <div className="relative h-80 md:h-96 bg-muted rounded-lg overflow-hidden border border-border/20 group cursor-pointer">
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
                className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-sm text-xs font-medium text-primary"
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
            <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
              <DrawerTrigger asChild>
                <button className="text-accent font-semibold text-body-lg hover:opacity-80 transition-opacity mt-4 cursor-pointer inline-flex items-center gap-2">
                  <span>{t("viewProject")}</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </DrawerTrigger>
              <DrawerContentSide>
                <div className="overflow-y-auto h-full">
                  <DrawerHeader className="text-left pb-4 border-b border-border/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <DrawerTitle>{title}</DrawerTitle>
                        <p className="text-body-lg text-primary font-semibold mt-1">
                          {description}
                        </p>
                        <p className="text-body-sm text-muted-foreground mt-1">
                          {year}
                        </p>
                      </div>
                      <DrawerClose asChild>
                        <button className="p-2 hover:bg-muted rounded-md transition-colors">
                          <X className="w-5 h-5" />
                        </button>
                      </DrawerClose>
                    </div>
                  </DrawerHeader>
                  <div className="p-6 space-y-6">
                    <div>
                      <div className="relative h-64 bg-muted rounded-lg overflow-hidden border border-border/20 mb-4">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 100vw"
                        />
                      </div>
                      <h4 className="text-body-lg font-semibold text-foreground mb-3">
                        Project Details
                      </h4>
                      <p className="text-body text-foreground leading-relaxed">
                        {details}
                      </p>
                    </div>
                    {techStack && techStack.length > 0 && (
                      <div>
                        <h4 className="text-body-lg font-semibold text-foreground mb-3">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-sm text-xs font-medium text-primary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-4 pt-4 border-t border-border/20">
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-md text-primary font-semibold transition-all hover:scale-105"
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
                          className="flex items-center gap-2 px-4 py-2 bg-background hover:bg-primary/10 border border-border/30 rounded-md text-foreground font-semibold transition-all hover:scale-105"
                        >
                          <Github className="w-4 h-4" />
                          <span className="text-sm">GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </DrawerContentSide>
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
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-md text-primary font-semibold transition-all hover:scale-105"
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
              className="flex items-center gap-2 px-4 py-2 bg-background hover:bg-primary/10 border border-border/30 rounded-md text-foreground font-semibold transition-all hover:scale-105"
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
