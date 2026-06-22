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
              Biasa dipanggil <span className="text-foreground font-medium">Mahpudeen</span> — seorang Frontend Developer dengan pengalaman lebih dari 5 tahun di industri teknologi yang passionate dalam membangun pengalaman digital yang bermakna. Saya percaya bahwa kode yang baik bukan hanya soal fungsi, tapi juga soal estetika dan dampak.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Di luar dunia coding, saya aktif mengikuti perkembangan investasi, membaca manhwa, dan mendokumentasikan perjalanan hidup. Website ini adalah arsip digital saya — tempat saya tumbuh, belajar, dan berbagi.
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: Code2, label: "Frontend Developer", desc: "React, Next.js, Nuxt.js" },
            { icon: TrendingUp, label: "Investor", desc: "Saham & Reksa Dana" },
            { icon: BookOpen, label: "Manhwa Reader", desc: "Selalu update chapter terbaru" },
            { icon: Heart, label: "Family First", desc: "Merawat keluarga tercinta" },
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
            { year: "2024 - Present", title: "Section Head - Frontend Engineer", desc: "DBO - PT. Depoguna Bangunan Online. Develop frontend dengan React.js & React Native." },
            { year: "2022 - 2023", title: "Senior Frontend Developer", desc: "EdenFarm - Rebranding website, revamp dashboard internal, ERP system dengan microfrontend Vue.js." },
            { year: "2021 - 2022", title: "Frontend Developer", desc: "EdenFarm - Membangun dashboard internal dengan Vue.js & Vuetify, migrasi company profile ke Nuxt.js + Strapi." },
            { year: "2019 - 2020", title: "Full Stack Developer", desc: "PT. Teknoglobal - DJP Dashboard, OJK mobile app, dan IdScore untuk Pefindo menggunakan Quarkus & Quasar." },
            { year: "2015 - 2018", title: "Lab Assistant", desc: "Universitas Komputer Indonesia - Physics, Electronic, Cisco, dan Microcontroller Lab." },
            { year: "2014 - 2018", title: "S1 Ilmu Komputer", desc: "Universitas Komputer Indonesia (UNIKOM), Bandung." },
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