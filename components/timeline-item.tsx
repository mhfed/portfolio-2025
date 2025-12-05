"use client";

import { useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import {
  Drawer,
  DrawerContentSide,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "./ui/drawer";

interface TimelineItemProps {
  company: string;
  position: string;
  period: string;
  description: string;
  skills: string[];
}

export function TimelineItem({
  company,
  position,
  period,
  description,
  skills,
}: TimelineItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const descriptionLines = description
    .split(". ")
    .filter((line) => line.trim().length > 0);
  const hasMultipleLines = descriptionLines.length > 1;

  return (
    <div className="scroll-animate relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0">
      <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full transform -translate-x-1.5"></div>

      <div className="space-y-3">
        <div>
          <h3 className="text-h3 text-foreground">{position}</h3>
          <p className="text-body-lg text-primary font-semibold">{company}</p>
          <p className="text-body-sm text-muted-foreground">{period}</p>
        </div>

        <div className="space-y-2">
          <div className="text-foreground text-body line-clamp-2">
            <p>{description}</p>
          </div>
          {hasMultipleLines && (
            <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
              <DrawerTrigger asChild>
                <button className="text-accent font-semibold text-body-sm hover:opacity-80 transition-opacity inline-flex items-center gap-1 cursor-pointer">
                  <span>Read more</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </DrawerTrigger>
              <DrawerContentSide>
                <div className="overflow-y-auto h-full">
                  <DrawerHeader className="text-left pb-4 border-b border-border/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <DrawerTitle>{position}</DrawerTitle>
                        <p className="text-body-lg text-primary font-semibold mt-1">
                          {company}
                        </p>
                        <p className="text-body-sm text-muted-foreground mt-1">
                          {period}
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
                      <h4 className="text-body-lg font-semibold text-foreground mb-3">
                        Description
                      </h4>
                      <ul className="list-disc list-inside space-y-2 text-body text-foreground">
                        {descriptionLines.map((line, idx) => (
                          <li key={idx}>{line.trim()}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-body-lg font-semibold text-foreground mb-3">
                        Skills & Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-sm text-xs font-medium text-primary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </DrawerContentSide>
            </Drawer>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-sm text-xs font-medium text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
