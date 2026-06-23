import Image from "next/image";
import { MapPin, Briefcase, Heart, Code2, BookOpen, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 flex flex-col gap-20">

      {/* BIO */}
      <section id="bio" className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <Image
            src="/images/avatar.webp"
            alt="Mahpudeen"
            width={120}
            height={120}
            className="rounded-2xl border-2 border-amber-500/40 object-cover"
          />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm text-amber-500">
              <MapPin size={14} />
              <span>Jakarta, Indonesia</span>
            </div>
            <h1 className="font-heading text-3xl font-bold">Dindin Mahpudin</h1>
            <p className="text-muted-foreground leading-relaxed">
              Known as <span className="text-foreground font-medium">Mahpudeen</span> — a Frontend Developer with over 5 years of experience in the tech industry, passionate about building meaningful digital experiences. I believe that good code is not just about functionality, but also about aesthetics and impact.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Outside of coding, I actively follow investment developments, read manhwa, and document my life journey. This website is my digital archive — a place where I grow, learn, and share.
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: Code2, label: "Frontend Developer", desc: "React, Next.js, Nuxt.js" },
            { icon: TrendingUp, label: "Investor", desc: "Bitcoin, Stocks & Mutual Funds" },
            { icon: BookOpen, label: "Manhwa Reader", desc: "Up to date with latest chapters" },
            { icon: Heart, label: "Family First", desc: "Taking care of beloved family" },
            { icon: Briefcase, label: "Builder", desc: "Side projects & tools" },
            { icon: MapPin, label: "Jakarta", desc: "Based in Indonesia" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border p-4 flex gap-3 items-start">
              <item.icon size={16} className="text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <h2 className="font-heading text-xl font-bold">Timeline</h2>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="relative flex flex-col gap-0">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
          {[
            { year: "2024 - Present", title: "Section Head - Frontend Engineer", desc: "DBO - PT. Depoguna Bangunan Online. Developing frontend with React.js & React Native." },
            { year: "2022 - 2023", title: "Senior Frontend Developer", desc: "EdenFarm - Website rebranding, internal dashboard revamp, ERP system with microfrontend Vue.js." },
            { year: "2021 - 2022", title: "Frontend Developer", desc: "EdenFarm - Built internal dashboard with Vue.js & Vuetify, migrated company profile to Nuxt.js + Strapi." },
            { year: "2019 - 2020", title: "Full Stack Developer", desc: "PT. Teknoglobal - DJP Dashboard, OJK mobile app, and IdScore for Pefindo using Quarkus & Quasar." },
            { year: "2015 - 2018", title: "Lab Assistant", desc: "Universitas Komputer Indonesia - Physics, Electronic, Cisco, and Microcontroller Lab." },
            { year: "2014 - 2018", title: "Bachelor of Computer Science", desc: "Universitas Komputer Indonesia (UNIKOM), Bandung." },
          ].map((item) => (
            <div key={item.year} className="relative flex gap-6 pb-8 pl-8">
              <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-amber-500 bg-background" />
              <div className="flex flex-col gap-1">
                <span className="text-xs text-amber-500 font-medium">{item.year}</span>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* USES */}
      <section id="uses" className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <h2 className="font-heading text-xl font-bold">Uses</h2>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              category: "Dev Tools",
              items: ["Android Studio", "VS Code", "Antigravity", "Claude Code", "Open Code", "Figma / Canva"],
            },
            {
              category: "Tech Stack",
              items: ["Next.js / Nuxt.js", "React Native", "Tailwind CSS", "Vue / Vuetify", "GraphQL", "Typescript"],
            },
            {
              category: "Productivity",
              items: ["Jira", "Trello", "Git", "Slack"],
            },
            {
              category: "Hardware",
              items: ["MacBook", "iPhone", "Monitor Samsung", "Mechanical Keyboard"],
            },
          ].map((group) => (
            <div key={group.category} className="rounded-xl border border-border p-5 flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-500">{group.category}</p>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}