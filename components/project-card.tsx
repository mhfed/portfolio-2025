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
import { Badge } from "./ui/badge";
import { UiLink } from "./ui/link";
import { Button } from "./ui/button";
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
      className={`grid md:grid-cols-2 gap-4 md:gap-6 items-center scroll-animate ${
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
      <div className="space-y-3">
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
              <Badge key={tech} variant="primary">
                {tech}
              </Badge>
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
                <Button variant="ghost" className="mt-4">
                  <span>{t("viewProject")}</span>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
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
                        <Button variant="ghost" size="icon">
                          <X className="w-5 h-5" />
                        </Button>
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
                            <Badge key={tech} variant="primary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-4 pt-4 border-t border-border/20">
                      {liveUrl && (
                        <UiLink href={liveUrl} variant="primary" external>
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm">Live Demo</span>
                        </UiLink>
                      )}
                      {githubUrl && (
                        <UiLink href={githubUrl} variant="ghost" external>
                          <Github className="w-4 h-4" />
                          <span className="text-sm">GitHub</span>
                        </UiLink>
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
            <UiLink href={liveUrl} variant="primary" external>
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Live Demo</span>
            </UiLink>
          )}
          {githubUrl && (
            <UiLink href={githubUrl} variant="ghost" external>
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </UiLink>
          )}
        </div>
      </div>
    </div>
  );
}
