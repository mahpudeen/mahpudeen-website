"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Send, User } from "lucide-react";

type GuestEntry = {
  id: string;
  name: string;
  message: string;
  email?: string;
  created_at: string;
};

export default function CommunityPage() {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", message: "", email: "" });

  const fetchEntries = async () => {
    const { data } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });
    setEntries(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchEntries(); }, []);

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.message.trim()) return;
    setSubmitting(true);

    const { error } = await supabase.from("guestbook").insert({
      name: form.name.trim(),
      message: form.message.trim(),
      email: form.email.trim() || null,
    });

    if (!error) {
      setSuccess(true);
      setForm({ name: "", message: "", email: "" });
      fetchEntries();
      setTimeout(() => setSuccess(false), 3000);
    }
    setSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-bold">
          Guestbook <span className="text-amber-500">✍️</span>
        </h1>
        <p className="text-muted-foreground">
          Leave a message — say hi, share your thoughts, or just drop your name!
        </p>
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-border p-6 flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Name *</label>
            <div className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 focus-within:border-amber-500/50 transition-colors">
              <User size={14} className="text-muted-foreground shrink-0" />
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Email / No. HP <span className="normal-case text-muted-foreground">(optional)</span>
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 focus-within:border-amber-500/50 transition-colors">
              <User size={14} className="text-muted-foreground shrink-0" />
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@example.com or 08xx"
                className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Message *</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Say something nice..."
            rows={3}
            className="rounded-xl border border-border px-4 py-2.5 bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground resize-none focus:border-amber-500/50 transition-colors"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting || !form.name.trim() || !form.message.trim()}
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed w-fit"
        >
          <Send size={14} />
          {submitting ? "Sending..." : "Sign Guestbook"}
        </button>

        {success && (
          <p className="text-sm text-green-400">✅ Message sent! Thanks for signing!</p>
        )}
      </div>

      {/* Entries */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">{entries.length} message{entries.length !== 1 ? "s" : ""}</p>

        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border p-5 animate-pulse h-20" />
          ))
        ) : entries.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No messages yet. Be the first to sign!
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="rounded-2xl border border-border p-5 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold">
                    {entry.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    {entry.email ? (
                      <a href={`mailto:${entry.email}`} className="text-sm font-medium hover:text-amber-500 transition-colors">
                        {entry.name}
                      </a>
                    ) : (
                      <p className="text-sm font-medium">{entry.name}</p>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(entry.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
              <p className="text-sm text-muted-foreground pl-10">{entry.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}