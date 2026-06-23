"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

type Category = "All" | "Professional" | "Side Projects" | "Open Source" | "Speaking";

type Project = {
  title: string;
  description: string;
  tech: string[];
  images: string[];
  category: Exclude<Category, "All">;
  link?: string;
};

const projects: Project[] = [
  {
    title: "EdenFarm Company Profile",
    description:
      "EdenFarm is a food service startup that aims to create the most efficient food supply chain. Puts partners' growth first by delivering excellent services and solving problems with technology.",
    tech: ["Nuxt.js", "Strapi", "GraphQL", "MySQL", "DigitalOcean", "AWS"],
    images: ["/images/portfolio/edenfarm-profile-1.png"],
    category: "Professional",
  },
  {
    title: "EdenFarm Internal Dashboard",
    description:
      "EdenFarm's internal dashboard provides an interactive and intuitive interface to monitor real-time business insights and support operational activities.",
    tech: ["Vue.js", "Vuetify", "Golang", "MySQL", "MongoDB", "AWS", "GCP"],
    images: ["/images/portfolio/edenfarm-dashboard-1.png"],
    category: "Professional",
  },
  {
    title: "Otter32Run",
    description:
      "An online platform providing all necessary information about the Otten32Run event, including event details, registration, ticketing, and news updates.",
    tech: ["Vue.js", "Bootstrap", "Laravel", "MySQL", "GCP"],
    images: ["/images/portfolio/otter32run-1.png"],
    category: "Professional",
  },
  {
    title: "Sinyal Ibu",
    description:
      "An Android app to monitor signal strength and help stay connected with mom. Built with love as a personal project.",
    tech: ["React Native", "Android"],
    images: ["/images/portfolio/sinyal-ibu-1.png"],
    category: "Side Projects",
  },
  {
    title: "mahpudeen.com",
    description:
      "Personal CEO website — a long-term digital archive and personal branding asset. Built with Next.js and Supabase.",
    tech: ["Next.js", "Tailwind CSS", "Supabase", "Vercel"],
    images: ["/images/portfolio/mahpudeen-1.png"],
    category: "Side Projects",
  },
];

const categories: Category[] = ["All", "Professional", "Side Projects", "Open Source", "Speaking"];

function ProjectCard({ project }: { project: Project }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? project.images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === project.images.length - 1 ? 0 : c + 1));

  return (
    <div className="rounded-2xl border border-border overflow-hidden flex flex-col">
      {/* Image Slider */}
      <div className="relative aspect-video bg-foreground/5 overflow-hidden">
        <img
          src={project.images[current]}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs -z-10">
          No screenshot yet
        </div>

        {project.images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 backdrop-blur-sm hover:bg-background">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 backdrop-blur-sm hover:bg-background">
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${i === current ? "w-4 bg-amber-500" : "w-1.5 bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-amber-500 border border-amber-500/20">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading font-semibold">{project.title}</h3>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-amber-500 transition-colors shrink-0">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WorkPage() {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-bold">Work</h1>
        <p className="text-muted-foreground">Projects I&apos;ve built — professionally and personally.</p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors border ${
              active === cat
                ? "bg-amber-500 text-black border-amber-500 font-medium"
                : "border-border text-muted-foreground hover:border-amber-500/40 hover:text-foreground"
            }`}
          >
            {cat}
            {cat !== "All" && (
              <span className="ml-1.5 text-xs opacity-60">
                {projects.filter((p) => p.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <p className="text-muted-foreground text-sm">No projects in this category yet.</p>
          <span className="text-xs text-amber-500">Coming soon</span>
        </div>
      )}
    </div>
  );
}