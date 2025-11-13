"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface TimelineItemProps {
  company: string
  position: string
  period: string
  description: string
  skills: string[]
}

export function TimelineItem({ company, position, period, description, skills }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const descriptionLines = description.split('. ').filter(line => line.trim().length > 0)

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
          <div className={`text-foreground text-body ${isExpanded ? '' : 'line-clamp-2'}`}>
            {isExpanded ? (
              <ul className="list-disc list-inside space-y-1">
                {descriptionLines.map((line, idx) => (
                  <li key={idx}>{line.trim()}</li>
                ))}
              </ul>
            ) : (
              <p>{description}</p>
            )}
          </div>
          {descriptionLines.length > 1 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-accent font-semibold text-body-sm hover:opacity-80 transition-opacity inline-flex items-center gap-1 cursor-pointer"
            >
              {isExpanded ? (
                <>
                  <span>Show less</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Read more</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

