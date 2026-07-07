"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";

import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";
import { faqCategories } from "@/lib/content";

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].category);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const currentCategory = faqCategories.find((c) => c.category === activeCategory);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/gallery/gallery-02.jpeg"
            alt="FAQ Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-secondary/90" />
        </div>
        <div className="site-shell relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-gold hover:underline mb-6"
          >
            <FaArrowLeft /> Kembali ke Beranda
          </Link>
          <ScrollAnimation direction="down">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Pusat Informasi</p>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight font-heading">
                Pertanyaan<br />yang Sering Ditanyakan
              </h1>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Temukan jawaban untuk pertanyaan umum seputar pendaftaran, biaya, dan program di Pesantren As Salam Metro.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-background">
        <div className="site-shell site-section">
          <div className="grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-16">

            {/* Sidebar: Category Nav */}
            <div className="lg:sticky lg:top-28 lg:self-start space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4 px-1">
                Kategori
              </p>
              {faqCategories.map((cat) => {
                const Icon = cat.icon;
                const isActive = cat.category === activeCategory;
                return (
                  <button
                    key={cat.category}
                    onClick={() => { setActiveCategory(cat.category); setOpenItem(null); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-left transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted hover:text-primary"
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    {cat.category}
                    <span className={`ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>
                      {cat.items.length}
                    </span>
                  </button>
                );
              })}

              {/* CTA Box */}
              <div className="mt-8 bg-secondary text-secondary-foreground p-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-white/60">Masih bingung?</p>
                <p className="text-white font-semibold text-sm leading-snug">Hubungi kami langsung via WhatsApp</p>
                <Link
                  href="https://wa.me/6285609689565"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-2.5 transition-colors"
                >
                  <FaWhatsapp className="size-4" />
                  Chat WhatsApp
                </Link>
              </div>
            </div>

            {/* FAQ Items */}
            <div>
              {currentCategory && (
                <ScrollAnimation direction="up" key={activeCategory}>
                  <div className="mb-8 pb-6 border-b border-border">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading mb-1">
                      {currentCategory.category}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {currentCategory.items.length} pertanyaan dalam kategori ini
                    </p>
                  </div>

                  <div className="space-y-3">
                    {currentCategory.items.map((item, idx) => {
                      const key = `${activeCategory}-${idx}`;
                      const isOpen = openItem === key;
                      return (
                        <div
                          key={key}
                          className={`border transition-all duration-200 ${
                            isOpen ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40"
                          }`}
                        >
                          <button
                            onClick={() => setOpenItem(isOpen ? null : key)}
                            className="w-full flex items-start gap-4 px-6 py-5 text-left"
                          >
                            <span className={`text-xs font-black mt-0.5 shrink-0 w-6 text-center transition-colors ${isOpen ? "text-primary" : "text-muted-foreground/40"}`}>
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className={`flex-1 text-sm sm:text-base font-bold leading-snug font-heading transition-colors ${isOpen ? "text-primary" : "text-foreground"}`}>
                              {item.question}
                            </span>
                            <ChevronDown
                              className={`size-4 shrink-0 mt-0.5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-6 pt-0">
                              <div className="ml-10 text-sm leading-relaxed text-muted-foreground border-l-2 border-primary/30 pl-4">
                                {item.answer}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </ScrollAnimation>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
