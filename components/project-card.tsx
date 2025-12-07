"use client";

import { ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import type { Project } from "@/data/projects";

interface ProjectCardProps extends Project {
  isAlternate: boolean;
  index?: number;
}

export function ProjectCard({
  title,
  year,
  description,
  techStack,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <div className="space-y-4 pb-8 last:pb-0">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-h4 text-foreground font-semibold mb-1">
              {title}
            </h3>
            {year && (
              <Badge variant="cyan" size="sm">
                {year}
              </Badge>
            )}
          </div>
        </div>
        <p className="text-body text-foreground/80 leading-relaxed">
          {description}
        </p>
        {techStack && techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {techStack.map((tech) => (
              <Badge key={tech} variant="outline" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        )}
        {(liveUrl || githubUrl) && (
          <div className="flex items-center gap-4 mt-4">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-primary hover:underline flex items-center gap-1"
              >
                View Project
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-foreground/70 hover:text-foreground hover:underline flex items-center gap-1"
              >
                GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
