import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

interface SocialLink {
  name: string;
  url: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  orConnectText: string;
  reachDirectlyText: string;
  email: string;
  phoneText: string;
  phone: string;
}

export function SocialLinks({
  links,
  orConnectText,
  reachDirectlyText,
  email,
  phoneText,
  phone,
}: SocialLinksProps) {
  return (
    <>
      {/* Divider */}
      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground">{orConnectText}</span>
        <Separator className="flex-1" />
      </div>

      {/* Social Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {links.map((link) => (
          <Button
            key={link.name}
            asChild
            variant="outline"
            className="border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary hover:scale-105"
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          </Button>
        ))}
      </div>

      {/* Direct Contact */}
      <div className="pt-6 border-t border-border/20 space-y-3 text-center">
        <p className="text-foreground/70">
          {reachDirectlyText}{" "}
          <span className="font-semibold text-primary">{email}</span>
        </p>
        <p className="text-foreground/70">
          {phoneText}{" "}
          <span className="font-semibold text-primary">{phone}</span>
        </p>
      </div>
    </>
  );
}
