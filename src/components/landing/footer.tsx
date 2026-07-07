import Link from "next/link";

const footerLinks = {
  Product: ["Features", "Research", "Pricing", "FAQ"].map((name) => ({
    name,
    href: name === "FAQ" ? "#faq" : `#${name.toLowerCase()}`,
  })),
  Company: ["About", "Blog", "Careers", "Contact"].map((name) => ({
    name,
    href: "#",
  })),
  Legal: ["Privacy", "Terms", "License"].map((name) => ({
    name,
    href: "#",
  })),
};

export default function Footer() {
  return (
    <footer className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg font-semibold tracking-tight">brofounder</span>
            <p className="mt-3 text-sm text-muted-foreground">
              Your AI co-founder.
              <br />
              From idea to launch.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-medium">{category}</h3>
              <ul className="mt-4 space-y-3">
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
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} brofounder. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Twitter", "GitHub", "LinkedIn"].map((social) => (
              <Link
                key={social}
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
