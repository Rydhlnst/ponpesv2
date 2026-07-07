import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { getIconComponent } from "@/lib/cms/icons";
import { getFacilitiesSection } from "@/lib/db/queries";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

type FacilitiesSection = Awaited<ReturnType<typeof getFacilitiesSection>>;
type FacilityItem = FacilitiesSection["items"][number];
type FacilityHighlight = FacilitiesSection["highlights"][number];

export default async function FasilitasPage() {
  const facilities = await getFacilitiesSection();

  return (
    <div className="flex flex-col">
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 text-white overflow-hidden border-b border-white/10">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/gallery/gallery-05.jpeg"
            alt="Fasilitas Background"
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
                {facilities.pageTitle}
              </h1>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <RichTextRenderer content={facilities.pageDescription} className="text-sm sm:text-base text-white/80 max-w-3xl leading-relaxed" />
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--line)] bg-slate-50">
        <div className="site-shell site-section grid gap-4 sm:gap-5 md:grid-cols-3">
          {facilities.highlights.map((item: FacilityHighlight, index: number) => (
            <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
              <div className="soft-surface px-5 py-5 text-sm leading-relaxed text-muted-foreground shadow-sm bg-white border-none rounded-none">
                <RichTextRenderer content={item.body} className="text-sm leading-relaxed text-muted-foreground" />
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </section>

      <section className="border-t border-[color:var(--line)] bg-white">
        <div className="site-shell site-section grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {facilities.items.map((facility: FacilityItem, index: number) => {
            const Icon = getIconComponent(facility.iconKey);
            return (
              <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
                <Card className="overflow-hidden border-none bg-white shadow-sm flex flex-col p-0 rounded-none hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 h-full">
                  <div className="relative aspect-[16/11] w-full overflow-hidden">
                    <Image src={facility.imagePath} alt={facility.name} fill className="object-cover" />
                  </div>
                  <CardHeader className="space-y-4 p-6 pb-2">
                    <div className="flex size-10 items-center justify-center rounded-none bg-primary/10 text-primary shrink-0">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground font-heading">{facility.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2 text-sm leading-relaxed text-muted-foreground flex-1">
                    <RichTextRenderer content={facility.description} className="text-sm leading-relaxed text-muted-foreground" />
                  </CardContent>
                </Card>
              </ScrollAnimation>
            );
          })}
        </div>
      </section>
    </div>
  );
}
