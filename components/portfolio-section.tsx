"use client"

import { useState, useRef, useEffect } from "react"
import { SectionTitle } from "./section-title"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"

interface ProjectProps {
  image: string
  title: string
  year: string
  description: string
  details: string
}

function ProjectCard({
  image,
  title,
  year,
  description,
  details,
  isAlternate,
}: ProjectProps & { isAlternate: boolean }) {
  const [isTruncated, setIsTruncated] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const element = textRef.current
        // Check if text is truncated by comparing scrollHeight with clientHeight
        const isOverflowing = element.scrollHeight > element.clientHeight
        setIsTruncated(isOverflowing)
      }
    }

    checkTruncation()
    // Re-check on window resize
    window.addEventListener("resize", checkTruncation)
    return () => window.removeEventListener("resize", checkTruncation)
  }, [details])

  return (
    <div
      className={`grid md:grid-cols-2 gap-8 items-center scroll-animate ${isAlternate ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <div className="relative h-80 md:h-96 bg-muted rounded-xl overflow-hidden border border-border/20">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-3xl md:text-4xl font-black text-primary">{title}</h3>
          <p className="text-sm text-muted-foreground">{year}</p>
        </div>
        <p className="text-foreground text-lg font-semibold">{description}</p>
        <div className="space-y-2">
          <p
            ref={textRef}
            className="text-base text-foreground leading-relaxed line-clamp-2"
          >
            {details}
          </p>
          {isTruncated && (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <button className="text-accent font-bold text-sm hover:opacity-80 transition-opacity inline-flex items-center gap-1">
                  Xem thêm...
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="overflow-y-auto">
                  <DrawerHeader className="text-left pb-4">
                    <DrawerTitle>{title}</DrawerTitle>
                    <p className="text-sm text-muted-foreground mt-1">{year}</p>
                  </DrawerHeader>
                  <div className="px-6 pb-8">
                    <p className="text-base text-foreground leading-relaxed">
                      {details}
                    </p>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
        <button className="text-accent font-bold text-lg hover:opacity-80 transition-opacity mt-4">
          VIEW PROJECT →
        </button>
      </div>
    </div>
  )
}

export function PortfolioSection() {
  const projects: ProjectProps[] = [
    {
      image: "/ecommerce-website.jpg",
      title: "Mobile App Iress Trading",
      year: "[2023]",
      description: "React Native Trading Mobile Application",
      details:
        "Developed responsive UI components and navigational flows using React native navigation. Implemented state management using Redux. Developed features for viewing, adding, editing, and deleting watchlists. Drew portfolio distribution charts based on backend data. Integrated API for real-time data updates and smooth trading experience. Tech: React Native, Redux, RN Reanimated, TypeScript, SSE, Restful APIs, Git, i18n, Firebase.",
    },
    {
      image: "/luxury-jewelry-store.jpg",
      title: "CMS Website Projects",
      year: "[2022-2023]",
      description: "CGSI, Iress Wealth, Admin Portal Equix",
      details:
        "Implemented login flow and user authentication with third party. Performed functions such as adding, editing, deleting, and updating data using Formik to handle form data validation with Yup for reports, notification, users, and article screens. Created advanced filtering functionalities for list screens. Developed theme builder feature on CMS to customize color scheme of trading application on mobile devices. Tech: TypeScript, ReactJS, Redux, RestAPI, Formik, Yup, Material UI, Golden layout, i18n, Axios.",
    },
    {
      image: "/ecommerce-website.jpg",
      title: "Trading Website",
      year: "[2022-2023]",
      description: "EQUIX, MAGPIE, CGSI Trading Platforms",
      details:
        "Developed login, registration, and forgot password features with reCAPTCHA. Implemented two-factor authentication using PIN. Collaborated with designers, product managers, and back-end developers to translate requirements into functional front-end code. Implemented trading functionalities such as order placement, trade execution, and portfolio management features with real-time updates using Server-Sent Events (SSE). Utilized Next.js to create Fundamental embedded Website for tracking stock information. Tech: JavaScript, TypeScript, ReactJS, SSE, Restful API, Git, Golden layout, Chart.js, i18n, Axios, Firebase.",
    },
    {
      image: "/luxury-jewelry-store.jpg",
      title: "Metacity System & Landing Page",
      year: "[2021-2022]",
      description: "Game Interface & Landing Page",
      details:
        "Made interface, effect animation, and customized game interface. Translated designs from Figma to HTML and CSS while ensuring UX and UI design are maintained. Refactored code, investigated code and fixed bugs. Ensured cross-browser compatibility and responsiveness across various devices and screen sizes. Tech: NextJS, ReactJS, Redux, Sass, Ant Design, PHP, Git, Axios.",
    },
  ]

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center py-12 md:py-16 lg:py-24 px-4 md:px-6 bg-background scroll-mt-0">
      <div className="max-w-6xl mx-auto w-full">
        {/* Mobile: Full width sticky title */}
        <div className="md:hidden scroll-animate sticky top-[var(--header-height)] z-40 -mx-4 px-4 py-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/10 mb-6">
          <SectionTitle title="PROJECTS" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {/* Desktop: Left Column - Title */}
          <div className="hidden md:block scroll-animate sticky top-[var(--header-height)] self-start">
            <SectionTitle title="PROJECTS" />
          </div>

          {/* Right Column - Projects */}
          <div className="md:col-span-2 space-y-12 md:space-y-16 lg:space-y-20">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} {...project} isAlternate={idx % 2 === 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
