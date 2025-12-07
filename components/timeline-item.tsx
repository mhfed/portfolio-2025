import { Badge } from "./ui/badge";

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
  return (
    <div className="pb-8 last:pb-0">
      <div className="space-y-3">
        <div className="flex items-start gap-4 justify-between">
          <h3 className="text-h4 text-foreground font-semibold ">{position}</h3>
          <Badge
            variant="outline"
            className="bg-primary/50 border-primary/20 text-foreground hover:bg-primary/20 hover:border-primary/40 hover:scale-105 hover:shadow-sm active:scale-[0.98] font-medium rounded-full"
            size="md"
          >
            {period}
          </Badge>
        </div>
        <p className="text-body-lg text-foreground/70 mb-2">{company}</p>

        <p className="text-body text-foreground/80 leading-relaxed">
          {description}
        </p>
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="primary" size="sm">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
