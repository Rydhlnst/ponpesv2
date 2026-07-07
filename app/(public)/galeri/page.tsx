import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getGallerySection } from "@/lib/db/queries";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

export default async function GaleriPage() {
  const galleryImages = await getGallerySection();

  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 text-white overflow-hidden border-b border-white/10">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/gallery/gallery-02.jpeg"
            alt="Galeri Background"
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
                Galeri Kegiatan
              </h1>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <p className="text-sm sm:text-base text-white/80 max-w-3xl leading-relaxed">
                Dokumentasi kegiatan akademik, tahfizh Al-Qur&apos;an, pembangunan, serta kebersamaan santri di Pondok Pesantren As Salam Metro.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--line)] bg-slate-50">
        <div className="site-shell site-section">
          {galleryImages.length === 0 ? (
            <div className="text-center py-12 bg-white shadow-sm rounded-none">
              <p className="text-muted-foreground font-medium">Belum ada foto galeri saat ini.</p>
            </div>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 xl:columns-3">
              {galleryImages.map((image, index) => (
                <ScrollAnimation key={index} direction="up" delay={index * 0.05}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="group relative mb-4 block w-full overflow-hidden rounded-none sm:mb-5 border-none bg-white shadow-sm cursor-pointer hover:shadow-md transition duration-300"
                        style={{ aspectRatio: image.aspect }}
                      >
                        <Image
                          src={image.image}
                          alt={image.alt}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3 text-left text-xs text-white opacity-100 transition sm:p-4 sm:text-sm sm:opacity-0 sm:group-hover:opacity-100">
                          {image.alt}
                        </div>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl border-none bg-white rounded-none">
                      <DialogTitle className="sr-only">{image.alt}</DialogTitle>
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none bg-slate-950/10">
                        <Image src={image.image} alt={image.alt} fill className="object-contain" />
                      </div>
                      <p className="text-center text-sm leading-7 text-muted-foreground pt-2">{image.alt}</p>
                    </DialogContent>
                  </Dialog>
                </ScrollAnimation>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
