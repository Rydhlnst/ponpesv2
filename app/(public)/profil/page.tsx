import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa6";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { getIconComponent } from "@/lib/cms/icons";
import { getSiteSettings, getHistoryTimeline, getProfileSection } from "@/lib/db/queries";
import { cn } from "@/lib/utils";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

type TimelineItem = Awaited<ReturnType<typeof getHistoryTimeline>>[number];

export default async function ProfilPage() {
  const siteConfig = await getSiteSettings();
  const historyTimeline = await getHistoryTimeline();
  const profile = await getProfileSection();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 text-white overflow-hidden border-b border-white/10">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/gallery/gallery-08.jpeg"
            alt="Profil Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>

        <div className="site-shell space-y-4 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-gold hover:underline">
            <FaArrowLeft /> Kembali ke Beranda
          </Link>
          <div className="space-y-2">
            <ScrollAnimation direction="down">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white font-heading">
                {profile.pageTitle}
              </h1>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <RichTextRenderer content={profile.pageDescription} className="text-sm sm:text-base text-white/80 max-w-3xl leading-relaxed" />
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="site-section bg-white border-b border-border">
        <div className="site-shell space-y-8">
          <div className="space-y-2">
            <ScrollAnimation direction="down">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-heading">Identitas Lembaga</h2>
            </ScrollAnimation>
            <div className="w-12 h-1 bg-primary rounded-none" />
          </div>

          <ScrollAnimation direction="up" delay={0.1}>
            <div className="border-none rounded-none overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-border">
                      <th className="px-6 py-4 text-sm font-bold text-foreground w-1/3">Field</th>
                      <th className="px-6 py-4 text-sm font-bold text-foreground">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.identityRows.map((item, idx) => (
                      <tr key={idx} className="border-b border-border last:border-b-0 hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-foreground/80">{item.label}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground leading-relaxed">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section className="site-section bg-slate-50 border-b border-border">
        <div className="site-shell space-y-8">
          <div className="space-y-2">
            <ScrollAnimation direction="down">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-heading">Sejarah Lembaga</h2>
            </ScrollAnimation>
            <div className="w-12 h-1 bg-primary rounded-none" />
          </div>

          <div className="relative border-l border-border pl-6 ml-2 space-y-8 py-2 max-w-4xl">
            {historyTimeline.map((item: TimelineItem, index: number) => (
              <ScrollAnimation key={index} direction="right" delay={index * 0.1} className="relative group">
                <div className={cn(
                  "absolute -left-[31px] top-1.5 size-4 rounded-full border-2 border-white shadow-sm transition-all duration-300 group-hover:scale-125",
                  item.color || "bg-primary"
                )} />
                <div className="space-y-2">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-none bg-slate-900 text-white font-heading">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-foreground tracking-tight pt-1 font-heading">
                    {item.title}
                  </h3>
                  <RichTextRenderer content={item.description} className="text-sm leading-relaxed text-muted-foreground" />
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section bg-white border-b border-border">
        <div className="site-shell space-y-8">
          <div className="space-y-2">
            <ScrollAnimation direction="down">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-heading">Visi, Misi & Tujuan</h2>
            </ScrollAnimation>
            <div className="w-12 h-1 bg-primary rounded-none" />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <ScrollAnimation direction="up" delay={0.1}>
              <Card className="border-none shadow-sm flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-none h-full">
                <CardHeader className="bg-slate-50 border-b border-border/50">
                  <CardTitle className="text-xl font-bold text-primary font-heading">Visi</CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex-1 flex items-center justify-center">
                  <RichTextRenderer content={profile.vision} className="text-base font-medium italic text-foreground/90 text-center leading-relaxed" />
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={0.2} className="lg:col-span-2">
              <Card className="border-none shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-none h-full">
                <CardHeader className="bg-slate-50 border-b border-border/50">
                  <CardTitle className="text-xl font-bold text-primary font-heading">Misi</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {profile.missionItems.map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-none bg-primary/10 text-primary text-xs font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <RichTextRenderer content={item.body} className="text-sm leading-relaxed text-muted-foreground" />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>

          <ScrollAnimation direction="up" delay={0.3}>
            <Card className="border-none shadow-sm max-w-4xl mx-auto w-full hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-none">
              <CardHeader className="bg-slate-50 border-b border-border/50">
                <CardTitle className="text-xl font-bold text-primary text-center font-heading">Tujuan</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {profile.goalItems.map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start p-2 hover:bg-slate-50 rounded-none transition-colors">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                        <Check className="size-3" />
                      </span>
                      <RichTextRenderer content={item.body} className="text-sm leading-relaxed text-muted-foreground" />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      <section className="site-section bg-slate-50 border-b border-border">
        <div className="site-shell space-y-8">
          <div className="space-y-2">
            <ScrollAnimation direction="down">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-heading">Struktur Organisasi</h2>
            </ScrollAnimation>
            <div className="w-12 h-1 bg-primary rounded-none" />
          </div>

          <ScrollAnimation direction="up" delay={0.1}>
            <div className="border-none rounded-none overflow-hidden shadow-sm max-w-3xl bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-border">
                      <th className="px-6 py-4 text-sm font-bold text-foreground">Jabatan</th>
                      <th className="px-6 py-4 text-sm font-bold text-foreground">Nama Pengelola</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.orgRows.map((item, idx) => (
                      <tr key={idx} className="border-b border-border last:border-b-0 hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-foreground/80">{item.role}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground font-medium">{item.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="site-shell space-y-8">
          <div className="space-y-2">
            <ScrollAnimation direction="down">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-heading">Program & Kegiatan Utama</h2>
            </ScrollAnimation>
            <div className="w-12 h-1 bg-primary rounded-none" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.programRows.map((program, idx) => {
              const Icon = getIconComponent(program.iconKey);
              return (
                <ScrollAnimation key={idx} direction="up" delay={idx * 0.05}>
                  <Card className="border-none hover:border-primary/30 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md rounded-none">
                    <CardContent className="p-6 flex items-center gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-none bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </span>
                      <span className="text-base font-bold text-foreground tracking-tight font-heading">{program.name}</span>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      <section className="site-shell site-section pb-20">
        <ScrollAnimation direction="up">
          <div className="grid gap-5 rounded-none bg-primary px-6 py-8 text-white shadow-md sm:gap-8 sm:px-8 sm:py-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12 border-t border-white/10">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-white font-heading">Ingin mendaftar sebagai Santri?</h2>
              <p className="max-w-2xl text-[15px] leading-7 text-white/80 sm:text-base sm:leading-8">
                Hubungi tim kami untuk konsultasi program, jadwal survey, dan informasi pendaftaran terbaru.
              </p>
            </div>
            <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10 shadow-sm" asChild>
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
                Hubungi via WhatsApp
              </a>
            </Button>
          </div>
        </ScrollAnimation>
      </section>
    </div>
  );
}
