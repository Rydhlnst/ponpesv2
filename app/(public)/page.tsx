import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { getIconComponent } from "@/lib/cms/icons";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";
import {
  getSiteSettings,
  getHomepageSections,
  getWhyUsItems,
  getNewsItems,
  getHistoryTimeline,
  getEducationSection,
  getFacilitiesSection,
  getFaqSection,
  getTestimonials,
  getPartnerItems,
} from "@/lib/db/queries";

type EducationProgram = Awaited<ReturnType<typeof getEducationSection>>["programs"][number];
type EducationPoint = EducationProgram["points"][number];
type FaqCategory = Awaited<ReturnType<typeof getFaqSection>>[number];
type FaqItem = FaqCategory["items"][number];

export default async function Home() {
  const siteConfig = await getSiteSettings();
  const homepage = await getHomepageSections();
  const whyUs = await getWhyUsItems();
  const news = await getNewsItems();
  const timeline = await getHistoryTimeline();
  const education = await getEducationSection();
  const facilities = await getFacilitiesSection();
  const faq = await getFaqSection();
  const testimonialItems = await getTestimonials();
  const partners = await getPartnerItems();

  const faqPreview: FaqItem[] = faq[0]?.items.slice(0, 6) || [];

  return (
    <div className="flex flex-col">
      {/* Light Background Hero Section matching the Al-Itqan screenshot */}
      <section className="relative min-h-[75vh] sm:min-h-[80vh] md:min-h-[85vh] flex items-center justify-start overflow-hidden bg-slate-50 dark:bg-neutral-900 border-b border-border">
        {/* Background Image on the right half or full screen with opacity */}
        <div className="absolute inset-y-0 right-0 z-0 w-full md:w-2/3 lg:w-7/12">
          <Image 
            src={homepage.heroImageUrl} 
            alt={siteConfig.name} 
            fill 
            priority 
            className="object-cover opacity-30 md:opacity-95" 
          />
          {/* Gradient fade on the left to ensure text readability */}
          <div 
            className="absolute inset-0" 
            style={{ 
              background: 'linear-gradient(to right, rgba(248,250,252,1) 0%, rgba(248,250,252,0.98) 4%, rgba(248,250,252,0.93) 10%, rgba(248,250,252,0.82) 18%, rgba(248,250,252,0.65) 28%, rgba(248,250,252,0.43) 38%, rgba(248,250,252,0.22) 49%, rgba(248,250,252,0.08) 59%, rgba(248,250,252,0.02) 67%, transparent 74%)' 
            }} 
          />
        </div>

        <div className="site-shell relative z-10 w-full py-20 sm:py-28 md:py-36">
          <div className="max-w-2xl space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <ScrollAnimation direction="down" delay={0.1}>
                <p className="text-sm font-bold tracking-[0.24em] text-primary uppercase sm:text-base">{homepage.heroBadge}</p>
              </ScrollAnimation>
              <ScrollAnimation direction="down" delay={0.2}>
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-tight font-heading">
                  {homepage.heroTitle}
                </h1>
              </ScrollAnimation>
              <ScrollAnimation direction="down" delay={0.3}>
                <RichTextRenderer 
                  content={homepage.heroDescription} 
                  className="text-base text-muted-foreground sm:text-lg lg:text-xl max-w-2xl leading-relaxed font-sans" 
                />
              </ScrollAnimation>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <ScrollAnimation direction="up" delay={0.4} className="w-full sm:w-auto">
                <Button size="lg" className="w-full justify-center shadow-sm sm:w-auto bg-primary text-primary-foreground hover:bg-primary/95 rounded-none px-6 py-6 text-sm font-bold uppercase tracking-wider" asChild>
                  <Link href={homepage.primaryCtaHref}>
                    {homepage.primaryCtaLabel}
                    <FaArrowRight className="ml-1 size-3" />
                  </Link>
                </Button>
              </ScrollAnimation>
              <ScrollAnimation direction="up" delay={0.5} className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full justify-center shadow-xs sm:w-auto border-primary text-primary hover:bg-primary/5 rounded-none px-6 py-6 text-sm font-bold uppercase tracking-wider bg-transparent" asChild>
                  <a href={homepage.secondaryCtaHref} target="_blank" rel="noopener noreferrer">{homepage.secondaryCtaLabel}</a>
                </Button>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Bottom Feature Cards overlapping the Hero section */}
      <section className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1: Lingkungan Islami */}
          <ScrollAnimation direction="up" delay={0.1}>
            <Card className="bg-white dark:bg-neutral-800 border-none shadow-md rounded-none p-6 h-full flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground font-heading border-l-4 border-primary pl-3">
                  Lingkungan Islami
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Suasana nyaman untuk membentuk akhlak dan kebiasaan baik setiap hari.
                </p>
              </div>
            </Card>
          </ScrollAnimation>

          {/* Card 2: Guru Berpengalaman */}
          <ScrollAnimation direction="up" delay={0.2}>
            <Card className="bg-white dark:bg-neutral-800 border-none shadow-md rounded-none p-6 h-full flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground font-heading border-l-4 border-primary pl-3">
                  Guru Berpengalaman
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dibimbing oleh tenaga pendidik berpengalaman, profesional, dan kompeten di bidang pendidikan, kepesantrenan, dan kesiswaan.
                </p>
              </div>
            </Card>
          </ScrollAnimation>

          {/* Card 3: Hafalan Tertarget (Dark Blue/Slate background) */}
          <ScrollAnimation direction="up" delay={0.3}>
            <Card className="bg-[#111827] dark:bg-neutral-950 text-white border-none shadow-md rounded-none p-6 h-full flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white font-heading border-l-4 border-primary pl-3">
                  Hafalan Tertarget
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Target hafal Al-Qur’an 30 juz dengan metode yang terstruktur dan pendampingan rutin.
                </p>
              </div>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      <section className="site-section border-t border-[color:var(--line)] bg-white">
        <div className="site-shell space-y-8">
          <div className="text-center space-y-3">
            <ScrollAnimation direction="down">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">{homepage.newsTitle}</h2>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <RichTextRenderer content={homepage.newsDescription} className="max-w-2xl mx-auto text-muted-foreground" />
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.2}>
              <div className="w-16 h-1 bg-primary mx-auto rounded-none" />
            </ScrollAnimation>
          </div>

          {news.length === 0 ? (
            <div className="text-center py-12 border-none bg-white shadow-sm rounded-none">
              <p className="text-muted-foreground font-medium">Belum ada berita terbaru saat ini.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.slice(0, 3).map((item, index) => (
                <ScrollAnimation key={index} direction="up" delay={index * 0.1} className="h-full">
                  <Card className="overflow-hidden border-none bg-white shadow-sm flex flex-col h-full group hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 rounded-none">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={item.cover || "/gallery/gallery-01.jpeg"} alt={item.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                    </div>
                    <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                          <span>{item.dateLabel}</span>
                          {item.category ? <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-none font-semibold uppercase tracking-wider text-[10px]">{item.category}</span> : null}
                        </div>
                        <Link href={item.href || "#"} className="block group-hover:text-primary transition-colors duration-200">
                          <h3 className="text-lg font-bold leading-snug text-foreground font-heading">{item.title}</h3>
                        </Link>
                      </div>
                      <Link href={item.href || "#"} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:underline">
                        Baca Selengkapnya
                        <FaArrowRight className="size-3" />
                      </Link>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          )}

          <div className="text-center pt-4">
            <ScrollAnimation direction="up" delay={0.2} className="inline-block">
              <Button className="bg-accent-gold text-white hover:bg-accent-gold/90 px-8 py-6 rounded-none text-base shadow-sm" asChild>
                <Link href="/galeri">Lihat Semua Berita</Link>
              </Button>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="site-section border-t border-[color:var(--line)] bg-white">
        <div className="site-shell space-y-8">
          <div className="text-center space-y-3">
            <ScrollAnimation direction="down">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">{homepage.partnersTitle}</h2>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <RichTextRenderer content={homepage.partnersDescription} className="max-w-2xl mx-auto text-muted-foreground" />
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.2}>
              <div className="w-16 h-1 bg-primary mx-auto rounded-none" />
            </ScrollAnimation>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 items-stretch max-w-4xl mx-auto pt-4">
            {partners.map((partner, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
                <div className="flex items-center justify-center p-6 bg-slate-50 min-h-20 text-center font-bold text-sm text-foreground/60 flex-col gap-1 hover:border-primary/50 transition-all duration-300 h-full rounded-none border-none">
                  <span className="font-heading text-[15px]">{partner.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">{partner.note}</span>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section id="profil" className="site-section border-t border-[color:var(--line)] bg-slate-50">
        <div className="site-shell grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
          <div className="space-y-5 lg:sticky lg:top-24">
            <ScrollAnimation direction="left">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">{homepage.historyTitle}</h2>
            </ScrollAnimation>
            <ScrollAnimation direction="left" delay={0.1}>
              <RichTextRenderer content={homepage.historyDescription} className="max-w-xl text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8" />
            </ScrollAnimation>
            <ScrollAnimation direction="left" delay={0.2}>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/95 rounded-none" asChild>
                <a href={siteConfig.mapHref} target="_blank" rel="noopener noreferrer">Lihat Lokasi Google Maps</a>
              </Button>
            </ScrollAnimation>
          </div>
          <div className="relative border-l border-border pl-6 ml-2 space-y-10 py-2">
            {timeline.map((item, index) => (
              <ScrollAnimation key={index} direction="right" delay={index * 0.1} className="relative group">
                <div className={cn("absolute -left-[31px] top-1.5 size-4 rounded-full border-2 border-white shadow-sm transition-all duration-300 group-hover:scale-125", item.color || "bg-primary")} />
                <div className="space-y-2">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-none bg-slate-900 text-white font-heading">{item.year}</span>
                  <h3 className="text-xl font-bold text-foreground tracking-tight font-heading">{item.title}</h3>
                  <RichTextRenderer content={item.description} className="text-sm leading-7 text-muted-foreground max-w-3xl" />
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section border-t border-[color:var(--line)] bg-white">
        <div className="site-shell space-y-8">
          <div className="text-center space-y-3">
            <ScrollAnimation direction="down">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">{homepage.whyUsTitle}</h2>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <RichTextRenderer content={homepage.whyUsDescription} className="max-w-2xl mx-auto text-muted-foreground" />
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.2}>
              <div className="w-16 h-1 bg-primary mx-auto rounded-none" />
            </ScrollAnimation>
          </div>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {whyUs.map((item, index) => {
              const Icon = getIconComponent(item.iconKey);
              return (
                <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
                  <Card className="border-none bg-white shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 h-full rounded-none">
                    <CardHeader className="space-y-4">
                      <div className="flex size-10 items-center justify-center rounded-none bg-primary/8 text-primary"><Icon className="size-5" /></div>
                      <CardTitle className="text-xl font-bold text-foreground font-heading">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm leading-7 text-muted-foreground">
                      <RichTextRenderer content={item.description} className="text-sm leading-7 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      {/* Foto Kegiatan Section */}
      <section className="site-section border-t border-[color:var(--line)] bg-slate-50">
        <div className="site-shell space-y-8">
          <div className="text-center space-y-3">
            <ScrollAnimation direction="down">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">Foto Kegiatan</h2>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <p className="max-w-2xl mx-auto text-muted-foreground">Momen kegiatan santri dan kegiatan Pondok Pesantren As Salam Metro</p>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.2}>
              <div className="w-16 h-1 bg-primary mx-auto rounded-none" />
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
            {/* Large featured image — spans 2 rows */}
            <ScrollAnimation direction="up" delay={0.1} className="col-span-2 md:col-span-1 row-span-2">
              <div className="relative overflow-hidden" style={{ height: "100%", minHeight: "280px" }}>
                <Image src="/gallery/gallery-03.jpeg" alt="Tasmi' Hafalan Al-Qur'an 30 Juz As Salam Metro" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.15}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src="/gallery/gallery-08.jpeg" alt="Santri Putri As Salam Metro bersama Ustadz" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src="/gallery/gallery-02.jpeg" alt="Santri Putra Pondok Pesantren As Salam Metro" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.25}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src="/gallery/gallery-04.jpeg" alt="Kegiatan Santri Putri As Salam Metro" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.3}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src="/gallery/gallery-06.jpeg" alt="Foto Bersama Santri As Salam Metro" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </ScrollAnimation>
          </div>

          <div className="text-center pt-2">
            <ScrollAnimation direction="up" delay={0.2} className="inline-block">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/95 px-8 py-6 rounded-none text-sm font-bold uppercase tracking-wider shadow-sm" asChild>
                <Link href="/galeri">Lihat Semua Foto <FaArrowRight className="inline ml-2 size-3" /></Link>
              </Button>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="site-section border-t border-[color:var(--line)] bg-white">
        <div className="site-shell space-y-8">
          <div className="text-center space-y-3">
            <ScrollAnimation direction="down">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">{education.pageTitle}</h2>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <RichTextRenderer content={education.pageDescription} className="max-w-2xl mx-auto text-muted-foreground" />
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.2}>
              <div className="w-16 h-1 bg-primary mx-auto rounded-none" />
            </ScrollAnimation>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {education.programs.map((program: EducationProgram, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
                <Card className="overflow-hidden border-none bg-white shadow-sm flex flex-col justify-between h-full p-0 hover:-translate-y-1 hover:shadow-md transition-all duration-300 rounded-none">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={program.imagePath} alt={program.name} fill className="object-cover" />
                    </div>
                    <div className="p-5 space-y-4">
                      <h3 className="text-lg font-bold text-foreground font-heading">{program.name}</h3>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        {program.points.map((point: EducationPoint, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] mt-0.5 font-bold">&#10003;</span>
                            <RichTextRenderer content={point.body} className="leading-snug text-sm text-muted-foreground" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="p-5 pt-0 mt-auto flex flex-col gap-2">
                    {program.homeSecondaryLabel && program.homeSecondaryHref ? (
                      <div className="grid grid-cols-2 gap-2">
                        <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/95 text-xs py-4 rounded-none" asChild>
                          <Link href={program.homePrimaryHref}>{program.homePrimaryLabel}</Link>
                        </Button>
                        <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/95 text-xs py-4 rounded-none" asChild>
                          <Link href={program.homeSecondaryHref}>{program.homeSecondaryLabel}</Link>
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/95 text-xs py-4 rounded-none" asChild>
                        <Link href={program.homePrimaryHref}>{program.homePrimaryLabel}</Link>
                      </Button>
                    )}
                  </div>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section border-t border-[color:var(--line)] bg-slate-50">
        <div className="site-shell space-y-8">
          <div className="text-center space-y-3">
            <ScrollAnimation direction="down">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">{facilities.pageTitle}</h2>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <RichTextRenderer content={facilities.pageDescription} className="max-w-2xl mx-auto text-muted-foreground" />
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.2}>
              <div className="w-16 h-1 bg-primary mx-auto rounded-none" />
            </ScrollAnimation>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.items.slice(0, 4).map((facility, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
                <Card className="overflow-hidden border-none bg-white shadow-sm flex flex-col p-0 hover:-translate-y-1 hover:shadow-md transition-all duration-300 rounded-none">
                  <div className="relative aspect-[4/3]">
                    <Image src={facility.imagePath} alt={facility.name} fill className="object-cover" />
                  </div>
                  <div className="p-5 space-y-2 flex-1">
                    <h3 className="text-lg font-bold text-foreground font-heading">{facility.name}</h3>
                    <RichTextRenderer content={facility.description} className="text-sm leading-relaxed text-muted-foreground" />
                  </div>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
          <div className="text-center pt-4">
            <ScrollAnimation direction="up" delay={0.2} className="inline-block">
              <Button className="bg-accent-gold text-white hover:bg-accent-gold/90 px-8 py-6 rounded-none text-base shadow-sm" asChild>
                <Link href="/fasilitas">Lihat Semua Fasilitas</Link>
              </Button>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="site-section border-t border-[color:var(--line)] bg-white">
        <div className="site-shell space-y-8">
          <div className="text-center space-y-3">
            <ScrollAnimation direction="down">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">{homepage.faqTitle}</h2>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <RichTextRenderer content={homepage.faqDescription} className="max-w-2xl mx-auto text-muted-foreground" />
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.2}>
              <div className="w-16 h-1 bg-primary mx-auto rounded-none" />
            </ScrollAnimation>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 items-stretch pt-4">
            <div className="flex flex-col justify-between h-full">
              <Accordion type="single" collapsible className="w-full border-none">
                {faqPreview.map((item: FaqItem, index: number) => (
                  <ScrollAnimation key={index} direction="right" delay={index * 0.05}>
                    <AccordionItem value={`faq-${index}`} className="mb-3 border-none bg-slate-100/70 rounded-none overflow-hidden transition-all duration-200">
                      <AccordionTrigger className="px-5 py-4 text-[15px] sm:text-base font-bold text-left hover:no-underline text-foreground focus:outline-none font-heading">{item.question}</AccordionTrigger>
                      <AccordionContent className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                        <RichTextRenderer content={item.answer} className="text-sm leading-relaxed text-muted-foreground" />
                      </AccordionContent>
                    </AccordionItem>
                  </ScrollAnimation>
                ))}
              </Accordion>
              <div className="pt-4 text-center sm:text-left">
                <ScrollAnimation direction="up" delay={0.2} className="inline-block">
                  <Button className="bg-accent-gold text-white hover:bg-accent-gold/90 px-8 py-6 rounded-none text-base shadow-sm" asChild>
                    <Link href="/faq">Lihat Semua Pertanyaan</Link>
                  </Button>
                </ScrollAnimation>
              </div>
            </div>
            <ScrollAnimation direction="left" delay={0.1} className="relative aspect-[4/3] lg:aspect-auto min-h-[300px] overflow-hidden rounded-none shadow-md">
              <Image src={homepage.faqImageUrl} alt="FAQ As Salam Metro" fill className="object-cover" />
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="site-section border-t border-[color:var(--line)] bg-slate-50">
        <div className="site-shell space-y-8">
          <div className="text-center space-y-3">
            <ScrollAnimation direction="down">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">{homepage.testimonialsTitle}</h2>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <RichTextRenderer content={homepage.testimonialsDescription} className="max-w-2xl mx-auto text-muted-foreground" />
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.2}>
              <div className="w-16 h-1 bg-primary mx-auto rounded-none" />
            </ScrollAnimation>
          </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {testimonialItems.map((testimonial, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
                <Card className="border-none bg-white shadow-sm p-6 space-y-4 flex flex-col justify-between hover:shadow-md transition-all duration-300 h-full rounded-none">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      {testimonial.avatar ? (
                        <div className="relative size-14 rounded-full overflow-hidden border border-border shrink-0">
                          <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20 shrink-0">
                          {testimonial.name.split(" ").slice(0, 2).map((n: string) => n[0]).join("")}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-foreground font-heading">{testimonial.name}</h4>
                        <p className="text-[11px] leading-snug text-muted-foreground mt-0.5">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="text-sm italic leading-relaxed text-muted-foreground">
                      <RichTextRenderer content={testimonial.quote} className="text-sm italic leading-relaxed text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell site-section">
        <div className="grid gap-5 rounded-none bg-primary px-6 py-8 text-white shadow-md sm:gap-8 sm:px-8 sm:py-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
          <ScrollAnimation direction="up" className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-white font-heading">{homepage.bottomCtaTitle}</h2>
            <RichTextRenderer content={homepage.bottomCtaDescription} className="max-w-2xl text-[15px] leading-7 text-white/80 sm:text-base sm:leading-8" />
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={0.15}>
            <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10 shadow-sm rounded-none" asChild>
              <a href={homepage.bottomCtaHref} target="_blank" rel="noopener noreferrer">{homepage.bottomCtaLabel}</a>
            </Button>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}
