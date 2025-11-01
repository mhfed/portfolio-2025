import { SectionTitle } from "./section-title"

interface TimelineItemProps {
  company: string
  position: string
  period: string
  description: string
  skills: string[]
}

function TimelineItem({ company, position, period, description, skills }: TimelineItemProps) {
  return (
    <div className="scroll-animate relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0">
      <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full transform -translate-x-1.5"></div>

      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold text-foreground">{position}</h3>
          <p className="text-primary font-semibold">{company}</p>
          <p className="text-sm text-muted-foreground">{period}</p>
        </div>

        <p className="text-foreground text-base leading-relaxed">{description}</p>

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

export function WorkExperienceSection() {
  const experiences: TimelineItemProps[] = [
    {
      company: "Tech Startup Co",
      position: "Senior Frontend Developer",
      period: "2022 - Present",
      description:
        "Leading frontend development team, architecting scalable React applications, and mentoring junior developers in modern web technologies.",
      skills: ["React", "TypeScript", "Next.js", "Team Leadership"],
    },
    {
      company: "Digital Agency",
      position: "Frontend Developer",
      period: "2020 - 2022",
      description:
        "Developed responsive web applications for high-profile clients, focusing on performance optimization and user experience enhancement.",
      skills: ["React", "Vue.js", "Tailwind CSS", "JavaScript"],
    },
    {
      company: "Web Solutions Inc",
      position: "Junior Developer",
      period: "2018 - 2020",
      description:
        "Contributed to multiple web projects, learned best practices in front-end development, and built a strong foundation in web technologies.",
      skills: ["HTML/CSS", "JavaScript", "jQuery", "Bootstrap"],
    },
  ]

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-center py-24 px-6 bg-background scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column - Title */}
          <div className="scroll-animate">
            <SectionTitle title="WORK EXPERIENCE" />
          </div>

          {/* Right Column - Timeline */}
          <div className="md:col-span-2">
            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <TimelineItem key={idx} {...exp} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
