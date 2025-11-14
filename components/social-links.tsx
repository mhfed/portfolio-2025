interface SocialLink {
  name: string
  url: string
}

interface SocialLinksProps {
  links: SocialLink[]
  orConnectText: string
  reachDirectlyText: string
  email: string
  phoneText: string
  phone: string
}

export function SocialLinks({ 
  links, 
  orConnectText, 
  reachDirectlyText, 
  email, 
  phoneText, 
  phone 
}: SocialLinksProps) {
  return (
    <>
      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border/30"></div>
        <span className="text-sm text-muted-foreground">{orConnectText}</span>
        <div className="flex-1 h-px bg-border/30"></div>
      </div>

      {/* Social Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            className="px-4 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-none text-primary font-semibold transition-all hover:scale-105 text-center text-sm md:text-base"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Direct Contact */}
      <div className="pt-6 border-t border-border/20 space-y-3 text-center">
        <p className="text-foreground/70">
          {reachDirectlyText} <span className="font-semibold text-primary">{email}</span>
        </p>
        <p className="text-foreground/70">
          {phoneText} <span className="font-semibold text-primary">{phone}</span>
        </p>
      </div>
    </>
  )
}

