"use client";

import { useState } from "react";
import { CheckCircle2, Circle, ExternalLink } from "lucide-react";

type Category = "All" | "Travels" | "Kuliner" | "Quotes" | "Bucket List";
const categories: Category[] = ["All", "Travels", "Kuliner", "Quotes", "Bucket List"];

const travels = [
  {
    location: "Jakarta, Indonesia",
    year: "2024",
    desc: "Exploring the heart of Indonesia's capital city.",
    image: "/images/life/travels/jakarta.jpg",
    instagramUrl: "https://instagram.com/mahpudeen",
  },
];

const kuliner = [
  {
    name: "Placeholder Kuliner",
    location: "Jakarta",
    rating: 5,
    desc: "Makanan favorit yang selalu bikin balik lagi.",
    tiktokEmbed: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@mahpudeen" data-video-id="" style="max-width:605px;min-width:325px;"><section></section></blockquote><script async src="https://www.tiktok.com/embed.js"></script>`,
  },
];

const quotes = [
  {
    text: "Jangan bergantung kepada manusia, karena engkau akan kecewa. Bergantunglah hanya kepada Allah.",
    author: "Imam Syafi'i",
  },
  {
    text: "Barangsiapa yang mengandalkan manusia, maka Allah akan menyerahkan urusannya kepada manusia itu.",
    author: "Sayidina Ali bin Abi Thalib",
  },
];

const bucketList = [
  { title: "Aquarium pribadi", done: true },
  { title: "Action figure collection", done: true },
  { title: "Tempat gym di rumah", done: false },
  { title: "Kolam depan rumah", done: false },
  { title: "Perpustakaan pribadi (taman baca)", done: false },
];

export default function LifePage() {
  const [active, setActive] = useState<Category>("All");

  const doneCount = bucketList.filter((b) => b.done).length;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-bold">Life</h1>
        <p className="text-muted-foreground">Travels, food, wisdom, and dreams.</p>
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
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-16">

        {/* TRAVELS */}
        {(active === "All" || active === "Travels") && (
          <section className="flex flex-col gap-6">
            {active === "All" && <h2 className="font-heading text-xl font-bold">✈️ Travels</h2>}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {travels.map((item) => (
                <a
                  key={item.location}
                  href={item.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-border overflow-hidden flex flex-col hover:border-amber-500/40 transition-colors"
                >
                  <div className="aspect-square bg-foreground/5 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.location}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-4xl -z-10">🗺️</div>
                    <div className="absolute top-3 right-3 rounded-full bg-background/80 backdrop-blur-sm p-1.5">
                      <ExternalLink size={12} className="text-foreground" />
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm">{item.location}</p>
                      <span className="text-xs text-amber-500">{item.year}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* KULINER */}
        {(active === "All" || active === "Kuliner") && (
          <section className="flex flex-col gap-6">
            {active === "All" && <h2 className="font-heading text-xl font-bold">🍜 Kuliner</h2>}
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
              {kuliner.map((item) => (
                <div key={item.name} className="snap-start shrink-0 w-[325px] rounded-2xl border border-border overflow-hidden flex flex-col">
                  <div
                    dangerouslySetInnerHTML={{ __html: item.tiktokEmbed }}
                    className="w-full"
                  />
                  <div className="p-4 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <span className="text-xs text-amber-500">{"⭐".repeat(item.rating)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.location}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* QUOTES */}
        {(active === "All" || active === "Quotes") && (
          <section className="flex flex-col gap-6">
            {active === "All" && <h2 className="font-heading text-xl font-bold">💬 Quotes</h2>}
            <div className="grid gap-4 sm:grid-cols-2">
              {quotes.map((item) => (
                <div key={item.author} className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 flex flex-col gap-4">
                  <p className="text-foreground leading-relaxed italic">&quot;{item.text}&quot;</p>
                  <p className="text-sm text-amber-500 font-medium">— {item.author}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BUCKET LIST */}
        {(active === "All" || active === "Bucket List") && (
          <section className="flex flex-col gap-6">
            {active === "All" && <h2 className="font-heading text-xl font-bold">🎯 Bucket List</h2>}

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-amber-500 font-medium">{doneCount}</span>
              <span>of {bucketList.length} completed</span>
              <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all"
                  style={{ width: `${(doneCount / bucketList.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {bucketList.map((item) => (
                <div
                  key={item.title}
                  className={`flex items-center gap-4 rounded-xl border px-5 py-4 transition-colors ${
                    item.done
                      ? "border-amber-500/20 bg-amber-500/5"
                      : "border-border"
                  }`}
                >
                  {item.done
                    ? <CheckCircle2 size={18} className="text-amber-500 shrink-0" />
                    : <Circle size={18} className="text-muted-foreground shrink-0" />
                  }
                  <p className={`text-sm ${item.done ? "line-through text-muted-foreground" : ""}`}>
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}