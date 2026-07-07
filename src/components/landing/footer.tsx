import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  Product: [
    { name: "Features", href: "/product" },
    { name: "Product", href: "/product" },
    { name: "Workspace", href: "/workspace" },
    { name: "Research", href: "/research" },
    { name: "Validation", href: "/validation" },
    { name: "MVP Planner", href: "/mvp" },
    { name: "Marketing", href: "/marketing" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Changelog", href: "/changelog" },
    { name: "Press Kit", href: "/press" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
    { name: "Security", href: "/security" },
    { name: "License", href: "/license" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/logo.svg"
              alt="brofounder"
              width={120}
              height={32}
              className="mb-4 brightness-0 invert opacity-50"
            />
            <p className="text-sm text-muted-foreground">
              Your AI co-founder.
              <br />
              From idea to launch.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-medium">{category}</h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} brofounder. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="/security" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Security
            </Link>
            <Link href="/status" className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              All systems operational
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
