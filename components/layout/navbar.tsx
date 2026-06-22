"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, X, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

type NavChild = {
  label: string;
  href: string;
  soon?: boolean;
};

type NavItem = {
  label: string;
  href: string;
  soon?: boolean;
  children?: NavChild[];
};

const navItems: NavItem[] = [
  {
    label: "About",
    href: "/about",
    // children: [
    //   { label: "Bio", href: "/about/bio", soon: true },
    //   { label: "Now", href: "/about/now", soon: true },
    //   { label: "Timeline", href: "/about/timeline", soon: true },
    //   { label: "Uses", href: "/about/uses", soon: true },
    // ],
  },
  {
    label: "Work",
    href: "/work",
    children: [
      { label: "Portfolio", href: "/work/portfolio", soon: true },
      { label: "Projects", href: "/work/projects", soon: true },
      { label: "Open Source", href: "/work/open-source", soon: true },
      { label: "Speaking", href: "/work/speaking", soon: true },
    ],
  },
  {
    label: "Writing",
    href: "/writing",
    children: [
      { label: "Blog", href: "/writing/blog", soon: true },
      { label: "TIL", href: "/writing/til", soon: true },
      { label: "Snippets", href: "/writing/snippets", soon: true },
    ],
  },
  {
    label: "Interests",
    href: "/interests",
    children: [
      { label: "Komik / Manhwa", href: "/interests/manhwa", soon: true },
      { label: "Media", href: "/interests/media", soon: true },
      { label: "Hobi", href: "/interests/hobi", soon: true },
      { label: "Bookshelf", href: "/interests/bookshelf", soon: true },
    ],
  },
  {
    label: "Life",
    href: "/life",
    children: [
      { label: "Travels", href: "/life/travels", soon: true },
      { label: "Kuliner", href: "/life/kuliner", soon: true },
      { label: "Quotes", href: "/life/quotes", soon: true },
      { label: "Bucket List", href: "/life/bucket-list", soon: true },
    ],
  },
  {
    label: "Finance",
    href: "/finance",
    children: [
      { label: "Investasi", href: "/finance/investasi", soon: true },
      { label: "Financial Goals", href: "/finance/goals", soon: true },
    ],
  },
  {
    label: "Learn",
    href: "/learn",
    children: [
      { label: "Certifications", href: "/learn/certifications", soon: true },
      { label: "Courses", href: "/learn/courses", soon: true },
    ],
  },
  {
    label: "Community",
    href: "/community",
    children: [
      { label: "Guestbook", href: "/community/guestbook", soon: true },
    ],
  },
  { label: "Changelog", href: "/changelog", soon: true },
  { label: "Contact", href: "/contact", soon: true },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileChild, setOpenMobileChild] = useState<string | null>(null);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="font-heading text-lg font-bold text-amber-500">
            Mahpudeen
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${openDropdown === item.href ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openDropdown === item.href && (
                    <div className="absolute left-0 top-full pt-2">
                      <div className="min-w-[180px] rounded-xl border border-border bg-background p-1.5 shadow-lg">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.soon ? "#" : child.href}
                            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                          >
                            {child.label}
                            {child.soon && (
                              <span className="ml-2 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-500">
                                Soon
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.soon ? "#" : item.href}
                  className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                  {item.soon && (
                    <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-500">
                      Soon
                    </span>
                  )}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 z-50 flex h-full w-[280px] flex-col border-l border-border bg-background">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <span className="font-heading font-bold text-amber-500">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-2 text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.href}>
                    <button
                      onClick={() =>
                        setOpenMobileChild(
                          openMobileChild === item.href ? null : item.href
                        )
                      }
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${openMobileChild === item.href ? "rotate-180" : ""}`}
                      />
                    </button>

                    {openMobileChild === item.href && (
                      <div className="ml-3 mt-1 space-y-1 border-l border-border pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.soon ? "#" : child.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                          >
                            {child.label}
                            {child.soon && (
                              <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-500">
                                Soon
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.soon ? "#" : item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  >
                    {item.label}
                    {item.soon && (
                      <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-500">
                        Soon
                      </span>
                    )}
                  </Link>
                )
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
}