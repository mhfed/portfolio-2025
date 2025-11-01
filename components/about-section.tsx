import { SectionTitle } from "./section-title"

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-24 px-6 bg-background scroll-mt-20">
      <div className="max-w-6xl mx-auto w-full">
        <SectionTitle title="ABOUT ME" />

        <div className="scroll-animate">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <p className="text-lg text-foreground leading-relaxed">
                I'm a passionate frontend developer with a keen eye for design and user experience. With over 7 years of
                experience in web development, I specialize in creating beautiful, functional, and performant
                applications.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                My journey started with a curiosity about how things work on the web. Today, I combine my technical
                expertise with creative thinking to deliver exceptional digital experiences. I believe in writing clean,
                maintainable code and staying updated with the latest technologies.
              </p>
              <div className="pt-6">
                <h3 className="text-xl font-bold text-primary mb-4">Core Skills</h3>
                <div className="grid grid-cols-2 gap-3">
                  {["React", "TypeScript", "Tailwind CSS", "Next.js", "Web Animation", "UI/UX Design"].map((skill) => (
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
                <div className="text-5xl font-black text-primary mb-2">7+</div>
                <p className="text-lg text-foreground font-semibold">Years of Experience</p>
                <p className="text-sm text-muted-foreground mt-2">Building web experiences with modern technologies</p>
              </div>

              <div className="bg-background border border-border/30 rounded-2xl p-8">
                <div className="text-5xl font-black text-accent mb-2">50+</div>
                <p className="text-lg text-foreground font-semibold">Projects Completed</p>
                <p className="text-sm text-muted-foreground mt-2">Delivered across various industries and platforms</p>
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
    </section>
  )
}
