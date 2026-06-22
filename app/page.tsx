import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* HERO */}
      <section className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 pt-24 text-center md:pt-32">
        <Image
          src="/images/avatar.webp"
          alt="Mahpudeen"
          width={96}
          height={96}
          className="h-24 w-24 rounded-full border-2 border-amber-500/40 object-cover"
          priority
        />
        
        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-4xl font-bold md:text-6xl">
            Hi, I&apos;m <span className="text-amber-500">Mahpudeen</span>
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Frontend Developer. Builder. Lifelong Learner.
          </p>
        </div>

        <p className="max-w-xl text-muted-foreground">
          I build digital experiences and document my journey — work, life, investments, and everything in between.
        </p>

        <div className="flex gap-4">
          <Link
            href="/about"
            className="rounded-md bg-amber-500 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-amber-400"
          >
            About Me
          </Link>
          <Link
            href="/work"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/5"
          >
            See My Work
          </Link>
        </div>
      </section>

      {/* ABOUT SNIPPET */}
      <section className="mx-auto w-full max-w-7xl px-6">
        <div className="rounded-xl border border-border p-8">
          <p className="text-muted-foreground leading-relaxed">
            I&apos;m a frontend developer based in Jakarta, Indonesia. I specialize in building modern web and mobile applications. 
            This website is my digital garden — a living archive of my work, thoughts, and life journey.
          </p>
          <Link href="/about" className="mt-4 inline-block text-sm text-amber-500 hover:underline">
            More about me →
          </Link>
        </div>
      </section>

      {/* CURRENTLY */}
      <section className="mx-auto w-full max-w-7xl px-6">
        <h2 className="font-heading text-2xl font-bold mb-6">Currently</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Working on", value: "Personal Website (mahpudeen.com)" },
            { label: "Learning", value: "Next.js & React Native" },
            { label: "Reading", value: "Latest manhwa updates" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border p-6">
              <p className="text-xs text-amber-500 font-medium uppercase tracking-wider mb-2">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="mx-auto w-full max-w-7xl px-6">
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-10 text-center">
          <h2 className="font-heading text-2xl font-bold mb-3">Let&apos;s Connect</h2>
          <p className="text-muted-foreground mb-6">Have a project in mind or just want to say hi?</p>
          <Link
            href="/contact"
            className="rounded-md bg-amber-500 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-amber-400"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}