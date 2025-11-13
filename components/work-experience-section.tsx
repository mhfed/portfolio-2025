import { getTranslations } from "next-intl/server"
import { SectionTitleWrapper } from "./section-title-wrapper"
import { TimelineItem } from "./timeline-item"

interface TimelineItemProps {
  company: string
  position: string
  period: string
  description: string
  skills: string[]
}

export async function WorkExperienceSection() {
  const t = await getTranslations('experience')
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
      className="min-h-screen flex flex-col justify-center py-12 md:py-16 lg:py-24 px-4 md:px-6 bg-background scroll-mt-0"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {/* Title */}
          <SectionTitleWrapper title={t('title')} />

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
