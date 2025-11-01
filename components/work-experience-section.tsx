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
      company: "COOLmate",
      position: "Frontend Developer",
      period: "2025 - Present",
      description:
        "Working on frontend development projects using modern web technologies.",
      skills: ["React.js", "Next.js", "TypeScript", "JavaScript"],
    },
    {
      company: "NOVUS FINTECH",
      position: "Frontend Developer",
      period: "8/2022 - 11/2023",
      description:
        "Developed CMS Website (CGSI, Iress Wealth, Admin Portal Equix) implementing login flow, user authentication, form management with Formik and Yup validation. Created theme builder feature for customizing trading application color schemes. Developed Trading Website (EQUIX, MAGPIE, CGSI) with login, registration, forgot password features with reCAPTCHA, two-factor authentication using PIN. Implemented trading functionalities with real-time updates using Server-Sent Events (SSE). Utilized Next.js to create Fundamental embedded Website for tracking stock information.",
      skills: ["TypeScript", "ReactJS", "Redux", "RestAPI", "Formik", "Yup", "Material UI", "SSE", "Next.js", "Chart.js"],
    },
    {
      company: "METACITY",
      position: "Frontend Developer",
      period: "7/2021 - 8/2022",
      description:
        "Developed Metacity System and Landing Page. Created interface, effect animation, and customized game interface. Translated designs from Figma to HTML and CSS while ensuring UX and UI design are maintained. Refactored code, investigated and fixed bugs. Ensured cross-browser compatibility and responsiveness across various devices and screen sizes.",
      skills: ["NextJS", "ReactJS", "Redux", "Sass", "Ant Design", "PHP"],
    },
    {
      company: "IT Lab FPOLY",
      position: "Intern Frontend Developer",
      period: "2/2021 - 7/2021",
      description:
        "Contributed to multiple web projects, learned best practices in front-end development, and built a strong foundation in web technologies.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
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
          <div className="scroll-animate sticky top-20 md:top-24 self-start">
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
