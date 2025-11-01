import { SectionTitle } from "./section-title"

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-24 px-6 bg-background scroll-mt-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column - Title */}
          <div className="scroll-animate sticky top-20 md:top-24 self-start">
            <SectionTitle title="ABOUT ME" />
          </div>

          {/* Right Column - Content */}
          <div className="md:col-span-2">
            <div className="scroll-animate">
              <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Content */}
                <div className="space-y-6">
                  <p className="text-lg text-foreground leading-relaxed">
                    Skilled Front-end Developer with 5 years of experience in developing and maintaining front-end
                    web applications. Proficient in JavaScript, TypeScript, HTML, CSS, ES6, React.js, and Next.js.
                    Experienced in code testing and debugging.
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    Proficient in HTML, CSS, JavaScript, React.js & Next.js, experience in responsive design.
                    Skilled in Redux, RESTful APIs, Websockets, and SSE for real-time features.
                    Experienced with Material-UI, Ant Design, Tailwind CSS and more for UI development.
                  </p>
                  <div className="pt-6">
                    <h3 className="text-xl font-bold text-primary mb-4">Core Skills</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {["JavaScript", "TypeScript", "React.js", "Next.js", "Redux", "React Native"].map((skill) => (
                        <div
                          key={skill}
                          className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary font-semibold"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Content - Stats */}
                <div className="space-y-8">
                  <div className="bg-background border border-border/30 rounded-2xl p-8">
                    <div className="text-5xl font-black text-primary mb-2">5+</div>
                    <p className="text-lg text-foreground font-semibold">Years of Experience</p>
                    <p className="text-sm text-muted-foreground mt-2">Building web experiences with modern technologies</p>
                  </div>

                  <div className="bg-background border border-border/30 rounded-2xl p-8">
                    <div className="text-5xl font-black text-primary mb-2">100%</div>
                    <p className="text-lg text-foreground font-semibold">Client Satisfaction</p>
                    <p className="text-sm text-muted-foreground mt-2">Dedicated to exceeding expectations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
