"use client";

import { useState } from "react";

type Category = "All" | "Manhwa" | "Media" | "Hobi" | "Bookshelf";
const categories: Category[] = ["All", "Manhwa", "Media", "Hobi", "Bookshelf"];

const manhwa = [
  { title: "Reborn Rich", status: "Completed", genre: "Drama, Business", cover: "https://static.wikia.nocookie.net/koreanwebtoons/images/6/66/Reborn_Rich.jpg" },
  { title: "The Man", status: "Ongoing", genre: "Action", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1SjWK9JWVW1o4lP4RsQ2CCfMjfF23mnRtFAumUj4M4mHTk8mGUhBxYtsN&s=10" },
  { title: "The Office Worker Who Sees Fate", status: "Ongoing", genre: "Fantasy, Office", cover: "https://swebtoon-phinf.pstatic.net/20250725_273/1753420755671rKjSw_JPEG/Thumb_Poster.jpg?type=crop540_540" },
  { title: "The Office Worker Who Sees Fate", status: "Ongoing", genre: "Fantasy, Office", cover: "https://swebtoon-phinf.pstatic.net/20250725_273/1753420755671rKjSw_JPEG/Thumb_Poster.jpg?type=crop540_540" },
  { title: "The Office Worker Who Sees Fate", status: "Ongoing", genre: "Fantasy, Office", cover: "https://swebtoon-phinf.pstatic.net/20250725_273/1753420755671rKjSw_JPEG/Thumb_Poster.jpg?type=crop540_540" },
  { title: "The Office Worker Who Sees Fate", status: "Ongoing", genre: "Fantasy, Office", cover: "https://swebtoon-phinf.pstatic.net/20250725_273/1753420755671rKjSw_JPEG/Thumb_Poster.jpg?type=crop540_540" },
  { title: "The Office Worker Who Sees Fate", status: "Ongoing", genre: "Fantasy, Office", cover: "https://swebtoon-phinf.pstatic.net/20250725_273/1753420755671rKjSw_JPEG/Thumb_Poster.jpg?type=crop540_540" },
  { title: "The Office Worker Who Sees Fate", status: "Ongoing", genre: "Fantasy, Office", cover: "https://swebtoon-phinf.pstatic.net/20250725_273/1753420755671rKjSw_JPEG/Thumb_Poster.jpg?type=crop540_540" },
];

const media = [
  { title: "Marvel", type: "🎬 Film/Series", desc: "MCU fan from the beginning. Favorite: Iron Man & Doctor Strange.", emoji: "🦸" },
  { title: "IU", type: "🎵 Musik", desc: "Korean singer-songwriter. Favorite albums: LILAC, Love Poem.", emoji: "🎶" },
  { title: "Mobile Legends", type: "🎮 Game", desc: "MOBA player. Main role: Support & Marksman.", emoji: "⚔️" },
];

const hobi = [
  { title: "Berkebun", desc: "Menanam sayuran dan tanaman hias di rumah. Terapi terbaik setelah coding seharian.", emoji: "🌱" },
  { title: "Lego", desc: "Membangun set Lego — melatih kesabaran dan kreativitas di luar layar.", emoji: "🧱" },
];

const bookshelf = [
  { title: "Sebuah Seni untuk Bersikap Bodo Amat", author: "Mark Manson", status: "Read", desc: "Tentang memilih hal-hal yang benar-benar penting dalam hidup." },
  { title: "Segala-galanya Ambyar", author: "Mark Manson", status: "Read", desc: "Lanjutan dari buku pertama — tentang harapan dan makna hidup." },
];

export default function InterestsPage() {
  const [active, setActive] = useState<Category>("All");

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-bold">Interests</h1>
        <p className="text-muted-foreground">Things I enjoy outside of work.</p>
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

        {/* MANHWA */}
        {(active === "All" || active === "Manhwa") && (
          <section className="flex flex-col gap-6">
            {active === "All" && (
              <h2 className="font-heading text-xl font-bold flex items-center gap-2">
                📚 Manhwa
              </h2>
            )}
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
            {manhwa.map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-border overflow-hidden flex flex-col snap-start shrink-0 w-[200px]">
                <div className="aspect-[3/4] bg-foreground/5 relative">
                  <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center text-4xl -z-10">📖</div>
                  <span className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-medium border ${
                    item.status === "Ongoing"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.genre}</p>
                </div>
              </div>
            ))}
          </div>
          </section>
        )}

        {/* MEDIA */}
        {(active === "All" || active === "Media") && (
          <section className="flex flex-col gap-6">
            {active === "All" && (
              <h2 className="font-heading text-xl font-bold">🎬 Media</h2>
            )}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {media.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-2xl">
                      {item.emoji}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-xs text-amber-500">{item.type}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* HOBI */}
        {(active === "All" || active === "Hobi") && (
          <section className="flex flex-col gap-6">
            {active === "All" && (
              <h2 className="font-heading text-xl font-bold">🎯 Hobi</h2>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              {hobi.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border p-6 flex gap-5 items-start">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-3xl">
                    {item.emoji}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BOOKSHELF */}
        {(active === "All" || active === "Bookshelf") && (
          <section className="flex flex-col gap-6">
            {active === "All" && (
              <h2 className="font-heading text-xl font-bold">📖 Bookshelf</h2>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              {bookshelf.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border p-6 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-xs text-amber-500 mt-0.5">{item.author}</p>
                    </div>
                    <span className="rounded-full bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 text-[10px] font-medium text-green-400 shrink-0">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}