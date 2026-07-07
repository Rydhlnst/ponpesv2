import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { Check, MapPin, Phone, Mail, Clock, FileText, Globe, ChevronDown } from "lucide-react";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { getIconComponent } from "@/lib/cms/icons";
import { getEducationSection } from "@/lib/db/queries";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

type EducationSection = Awaited<ReturnType<typeof getEducationSection>>;
type EducationProgram = EducationSection["programs"][number];
type EducationHighlight = EducationSection["highlights"][number];

export default async function PendidikanPage() {
  const education = await getEducationSection();

  return (
    <div className="flex flex-col">

      {/* Hero Banner */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/gallery/gallery-04.jpeg"
            alt="Pendidikan Background"
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
                {education.pageTitle}
              </h1>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <RichTextRenderer content={education.pageDescription} className="text-sm sm:text-base text-white/80 max-w-3xl leading-relaxed" />
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="bg-muted">
        <div className="site-shell site-section grid gap-4 sm:gap-5 md:grid-cols-3">
          {education.highlights.map((item: EducationHighlight, index: number) => (
            <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
              <div className="px-5 py-5 text-sm leading-relaxed text-muted-foreground bg-card shadow-xs">
                <RichTextRenderer content={item.body} className="text-sm leading-relaxed text-muted-foreground" />
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </section>

      {/* Main Content: Accordion Left + Sidebar Right */}
      <section className="bg-background">
        <div className="site-shell site-section">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px]">

            {/* LEFT: Accordion */}
            <div>
              <ScrollAnimation direction="up">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading mb-2">
                    Kurikulum Pendidikan
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Membentuk generasi Qur&apos;ani yang berilmu, beradab, dan siap berdakwah
                  </p>
                </div>
              </ScrollAnimation>

              <Accordion
                type="single"
                collapsible
                defaultValue="program-0"
                className="divide-y divide-border"
              >
                {education.programs.map((program: EducationProgram, index: number) => {
                  const Icon = getIconComponent(program.iconKey);
                  return (
                    <ScrollAnimation key={index} direction="up" delay={index * 0.07}>
                      <AccordionItem
                        value={`program-${index}`}
                        className="bg-background transition-colors duration-200"
                      >
                        <AccordionTrigger className="py-4 hover:no-underline hover:text-primary text-left [&>svg]:hidden group">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="flex size-9 shrink-0 items-center justify-center bg-primary/10 text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground transition-colors duration-200">
                              <Icon className="size-4" />
                            </div>
                            <span className="font-bold text-foreground text-sm sm:text-base font-heading leading-tight group-hover:text-primary transition-colors">
                              {program.name}
                            </span>
                          </div>
                          <ChevronDown className="size-4 text-muted-foreground shrink-0 ml-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </AccordionTrigger>

                        <AccordionContent className="pb-6 pt-1">
                          <div className="space-y-5">
                            <div className="relative aspect-[16/7] w-full overflow-hidden">
                              <Image
                                src={program.imagePath}
                                alt={program.name}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                            <div className="space-y-4">
                              <div className="space-y-1.5">
                                <RichTextRenderer content={program.summary} className="text-sm leading-relaxed text-muted-foreground" />
                                <RichTextRenderer content={program.focus} className="text-sm font-semibold text-primary" />
                              </div>
                              <ul className="space-y-2.5">
                                {program.points.map((point, idx: number) => (
                                  <li key={idx} className="flex items-start gap-3">
                                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                                      <Check className="size-3" />
                                    </span>
                                    <RichTextRenderer content={point.body} className="text-sm leading-relaxed text-muted-foreground" />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </ScrollAnimation>
                  );
                })}
              </Accordion>
            </div>

            {/* RIGHT: Sidebar */}
            <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">

              {/* Contact Info Card */}
              <ScrollAnimation direction="up" delay={0.1}>
                <div className="bg-secondary text-secondary-foreground p-6 space-y-5">
                  <div className="pb-4 border-b border-white/15">
                    <h3 className="text-sm font-bold tracking-widest uppercase text-white/80">
                      Informasi Kontak
                    </h3>
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-xl font-extrabold text-white font-heading leading-tight">
                      As Salam Metro
                    </p>
                    <p className="text-[11px] text-white/60 uppercase tracking-widest">
                      Pondok Pesantren Tahfizh Al-Qur&apos;an
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2.5 items-start">
                      <MapPin className="size-3.5 shrink-0 mt-0.5 text-accent-gold" />
                      <div>
                        <p className="font-semibold text-white/70 text-[11px] uppercase tracking-wider mb-0.5">Alamat:</p>
                        <p className="text-white/85 leading-relaxed text-xs">
                          Jl. Salam No. 10 Kel. Hadimulyo Barat Kec. Metro Pusat Kota Metro Lampung
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <Mail className="size-3.5 shrink-0 text-accent-gold" />
                      <p className="text-white/85 text-xs">pptqassalammetro@gmail.com</p>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <Phone className="size-3.5 shrink-0 mt-0.5 text-accent-gold" />
                      <div>
                        <p className="text-white/85 text-xs">0856-0968-9565</p>
                        <p className="text-white/50 text-[11px]">(Ustadzah Hilya)</p>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <Clock className="size-3.5 shrink-0 text-accent-gold" />
                      <p className="text-white/85 text-xs">Senin–Sabtu: 08.00–17.00 WIB</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/15 space-y-3">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
                      Social Info
                    </p>
                    <div className="flex gap-2">
                      {[
                        { href: "https://facebook.com", icon: <FaFacebook className="size-4" /> },
                        { href: "https://wa.me/6285609689565", icon: <FaWhatsapp className="size-4" /> },
                        { href: "https://instagram.com/assalammetroindonesia", icon: <FaInstagram className="size-4" /> },
                      ].map((s, i) => (
                        <Link
                          key={i}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex size-8 items-center justify-center bg-white/10 text-white hover:bg-white hover:text-secondary transition-colors duration-150"
                        >
                          {s.icon}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              {/* Link & Downloads */}
              <ScrollAnimation direction="up" delay={0.2}>
                <div className="bg-muted p-6 space-y-4">
                  <h3 className="text-sm font-bold text-foreground font-heading uppercase tracking-wider">
                    Link &amp; Downloads
                  </h3>
                  <ul className="space-y-3">
                    {[
                      { href: "#", icon: <FileText className="size-4 text-primary shrink-0" />, label: "Brosur PSB" },
                      { href: "/pendaftaran", icon: <FileText className="size-4 text-primary shrink-0" />, label: "Info Pendaftaran" },
                      { href: "https://bit.ly/PSBPPAsSalamMetroIndonesia", icon: <Globe className="size-4 text-primary shrink-0" />, label: "Form Pendaftaran Online", external: true },
                    ].map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                        >
                          {item.icon}
                          <span className="group-hover:underline underline-offset-2">{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>

              {/* CTA WhatsApp */}
              <ScrollAnimation direction="up" delay={0.3}>
                <Link
                  href="https://wa.me/6285609689565"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-wider transition-colors duration-150"
                >
                  <FaWhatsapp className="size-4" />
                  Daftar via WhatsApp
                </Link>
              </ScrollAnimation>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
