import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowRight,
  FaWhatsapp,
  FaCircleCheck,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";
import { Check, FileText, Globe, BookOpen, GraduationCap, ClipboardList } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

const WA_HREF = "https://wa.me/6285609689565";
const WA_FORM = "https://bit.ly/PSBPPAsSalamMetroIndonesia";

const syaratItems = [
  "Fotokopi Ijazah SD (untuk pendaftar SMP) atau Ijazah SMP (untuk pendaftar SMA)",
  "Mengisi formulir pendaftaran online atau datang langsung ke sekretariat",
  "Lulus tes membaca Al-Qur'an yang diselenggarakan pesantren",
  "Melampirkan fotokopi Kartu Keluarga",
  "Memiliki komitmen kuat untuk menghafal Al-Qur'an",
  "Mematuhi seluruh aturan dan tata tertib pondok pesantren",
  "Untuk santri pindahan: Fotokopi rapor + Surat Keterangan Pindah Sekolah",
];

const alurItems = [
  { step: "01", label: "Isi Formulir", desc: "Daftar online via link bit.ly atau datang ke sekretariat" },
  { step: "02", label: "Tes Baca Al-Qur'an", desc: "Jalani tes membaca Al-Qur'an sesuai jadwal yang ditentukan" },
  { step: "03", label: "Pengumuman", desc: "Cek hasil seleksi dan konfirmasi diterimanya pendaftaran" },
  { step: "04", label: "Daftar Ulang", desc: "Lunasi biaya pendaftaran & perlengkapan awal masuk pondok" },
];

const biayaRincian = [
  { label: "Infaq Pembangunan", nilai: "Rp 2.000.000", note: "(dapat diangsur 3x)" },
  { label: "Infaq Perlengkapan Asrama", nilai: "Rp 1.700.000", note: "(ranjang, kasur, bantal, sprei, lemari)" },
  { label: "Seragam", nilai: "Rp 750.000", note: "" },
  { label: "Kitab", nilai: "Rp 200.000", note: "" },
  { label: "Infaq Kesehatan", nilai: "Rp 100.000", note: "(per tahun)" },
];

const biayaBulanan = [
  { label: "Makan 3x Sehari", nilai: "Rp 600.000" },
  { label: "Infaq Pendidikan", nilai: "Rp 250.000" },
  { label: "Jasa Laundry Pakaian", nilai: "Rp 150.000" },
];

export default function PendaftaranPage() {
  return (
    <div className="flex flex-col">

      {/* ─── HERO BANNER ─── */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 text-white overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/gallery/gallery-04.jpeg"
            alt="Penerimaan Santri Baru"
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
                Penerimaan Santri Baru
              </h1>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <p className="text-sm sm:text-base text-white/80 max-w-3xl leading-relaxed">
                Bergabunglah bersama keluarga besar Pondok Pesantren Tahfizh Al-Qur&apos;an As Salam Metro. Kami membuka pendaftaran santri baru untuk jenjang SMP dan SMA setiap tahun ajaran baru.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ─── SECTION 1: INTRO 2-COLUMN (white bg) ─── */}
      <section className="bg-white border-t border-[color:var(--line)]">
        <div className="site-shell site-section">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">

            {/* Left: Text */}
            <ScrollAnimation direction="up">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading leading-tight mb-3">
                    Program Pendidikan
                  </h2>
                  <div className="h-1 w-16 bg-primary" />
                </div>

                <div>
                  <p className="text-lg font-bold text-primary font-heading mb-3">
                    Pondok Pesantren As Salam Metro
                  </p>
                  <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <p>
                      As Salam Metro menghadirkan program pendidikan berbasis pesantren modern yang memadukan antara penguasaan ilmu syar&apos;i, hafalan Al-Qur&apos;an, dan pendidikan formal terakreditasi.
                    </p>
                    <p>
                      Dengan sistem boarding school, santri dibina secara intensif dalam lingkungan yang kondusif, islami, dan disiplin untuk membentuk karakter, ilmu, dan kesiapan dakwah.
                    </p>
                    <p>
                      Program ini dirancang untuk mencetak generasi berilmu, berakhlak, dan siap menjadi hafizh serta pemimpin umat.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="bg-primary text-white hover:bg-primary/95 rounded-none px-6 py-5 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    asChild
                  >
                    <Link href="/pendidikan">
                      Lihat Kurikulum <FaArrowRight className="size-3" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none px-6 py-5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
                    asChild
                  >
                    <Link href={WA_HREF} target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp className="size-4" />
                      Daftar Sekarang
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollAnimation>

            {/* Right: Photo */}
            <ScrollAnimation direction="up" delay={0.15}>
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-lg">
                <Image
                  src="/gallery/gallery-02.jpeg"
                  alt="Santri As Salam Metro"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: SYARAT & ALUR (dark navy left + photo right) ─── */}
      <section className="border-t border-[color:var(--line)]">
        <div className="grid lg:grid-cols-[1fr_1fr]">

          {/* Left: Dark navy content */}
          <div className="bg-secondary text-secondary-foreground px-6 py-14 sm:px-10 sm:py-18 lg:py-22 xl:px-16">
            <div className="max-w-lg mx-auto space-y-10">

              {/* Syarat */}
              <ScrollAnimation direction="up">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <FaCircleCheck className="size-7 text-accent-gold shrink-0" />
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                      Syarat Pendaftaran
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {syaratItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/85 leading-relaxed">
                        <FaArrowRight className="size-3 shrink-0 mt-1 text-accent-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>

              {/* Alur */}
              <ScrollAnimation direction="up" delay={0.1}>
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <FaCircleCheck className="size-7 text-accent-gold shrink-0" />
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                      Alur Pendaftaran
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {alurItems.map((item) => (
                      <div key={item.step} className="flex gap-4 items-start">
                        <div className="flex size-9 shrink-0 items-center justify-center bg-accent-gold text-secondary font-extrabold text-sm font-heading">
                          {item.step}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{item.label}</p>
                          <p className="text-white/70 text-xs leading-relaxed mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              {/* CTA links */}
              <ScrollAnimation direction="up" delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href={WA_FORM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-accent-gold text-secondary hover:bg-accent-gold/80 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <Globe className="size-3.5" />
                    Form Pendaftaran Online
                  </Link>
                  <Link
                    href={WA_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <FaWhatsapp className="size-4" />
                    Tanya via WhatsApp
                  </Link>
                </div>
              </ScrollAnimation>
            </div>
          </div>

          {/* Right: Big photo */}
          <div className="relative min-h-[400px] lg:min-h-0">
            <Image
              src="/gallery/gallery-03.jpeg"
              alt="Kegiatan Belajar Santri"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: BIAYA (white bg) ─── */}
      <section className="bg-slate-50 border-t border-[color:var(--line)]">
        <div className="site-shell site-section">
          <ScrollAnimation direction="up">
            <div className="text-center mb-10 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">
                Rincian Biaya Pendaftaran
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Transparansi biaya awal masuk dan biaya bulanan pondok pesantren.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">

            {/* Biaya Masuk Awal */}
            <ScrollAnimation direction="up" delay={0.05}>
              <div className="bg-white shadow-sm p-6 space-y-4 h-full">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="flex size-9 items-center justify-center bg-primary/10 text-primary">
                    <ClipboardList className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground font-heading text-sm">Biaya Masuk Awal</h3>
                    <p className="text-[11px] text-muted-foreground">Santri Reguler (belum termasuk syahriah)</p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {biayaRincian.map((item, i) => (
                    <li key={i} className="flex items-start justify-between gap-3 text-sm">
                      <span className="text-muted-foreground leading-snug">
                        {item.label}
                        {item.note && <span className="text-xs text-muted-foreground/70 block">{item.note}</span>}
                      </span>
                      <span className="font-semibold text-foreground shrink-0">{item.nilai}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-foreground text-sm">Total</span>
                  <span className="font-extrabold text-primary text-base">Rp 4.750.000</span>
                </div>
                <p className="text-[11px] text-muted-foreground italic">* Infaq Kesehatan Rp 100.000/tahun dibayar terpisah</p>
              </div>
            </ScrollAnimation>

            {/* Biaya Bulanan */}
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="bg-white shadow-sm p-6 space-y-4 h-full">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="flex size-9 items-center justify-center bg-primary/10 text-primary">
                    <BookOpen className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground font-heading text-sm">Biaya Bulanan (Syahriah)</h3>
                    <p className="text-[11px] text-muted-foreground">Dibayar setiap bulan selama aktif mondok</p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {biayaBulanan.map((item, i) => (
                    <li key={i} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-foreground">{item.nilai}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-foreground text-sm">Total / Bulan</span>
                  <span className="font-extrabold text-primary text-base">Rp 1.000.000</span>
                </div>

                <div className="mt-2 p-3 bg-primary/5 border border-primary/20 space-y-1">
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-primary shrink-0" />
                    <p className="text-xs font-semibold text-secondary">Beasiswa Tersedia</p>
                  </div>
                  <p className="text-[11px] text-primary/80 leading-relaxed">
                    Beasiswa penuh bagi anak yatim &amp; dhu&apos;afa yang memiliki kesungguhan dan memenuhi kualifikasi seleksi.
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          <ScrollAnimation direction="up" delay={0.15}>
            <p className="text-center text-xs text-muted-foreground mt-6">
              * Rincian biaya dapat berubah sewaktu-waktu. Hubungi admin untuk informasi terkini.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* ─── SECTION 4: GELOMBANG (white bg) ─── */}
      <section className="bg-white border-t border-[color:var(--line)]">
        <div className="site-shell site-section">
          <div className="grid gap-12 lg:grid-cols-2 items-center">

            {/* Left: Gelombang info */}
            <ScrollAnimation direction="up">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading mb-3">
                    Gelombang Pendaftaran
                  </h2>
                  <div className="h-1 w-16 bg-primary" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Pendaftaran dibuka bertahap setiap tahun ajaran. Segera daftarkan putra/putri Anda sebelum kuota terpenuhi.
                </p>
                <div className="space-y-3">
                  {[
                    { gelombang: "Gelombang Utama", periode: "15 September – 14 Desember", badge: "Terbuka" },
                    { gelombang: "Gelombang Kedua", periode: "Januari – Maret", badge: "Menyusul" },
                    { gelombang: "Gelombang Ketiga", periode: "April – Juni", badge: "Menyusul" },
                  ].map((g, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border border-slate-100 bg-slate-50">
                      <div className="flex size-9 shrink-0 items-center justify-center bg-primary text-primary-foreground font-extrabold text-sm font-heading">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-foreground text-sm">{g.gelombang}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{g.periode}</p>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 shrink-0 ${
                        g.badge === "Terbuka"
                          ? "bg-primary/10 text-primary"
                          : "bg-slate-100 text-slate-400"
                      }`}>
                        {g.badge}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    size="lg"
                    className="bg-primary text-white hover:bg-primary/95 rounded-none px-6 py-5 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    asChild
                  >
                    <Link href={WA_FORM} target="_blank" rel="noopener noreferrer">
                      <Globe className="size-3.5" />
                      Daftar Online Sekarang
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-200 text-muted-foreground hover:bg-slate-50 rounded-none px-6 py-5 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    asChild
                  >
                    <Link href="/faq">
                      Lihat FAQ <FaArrowRight className="size-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollAnimation>

            {/* Right: Photo */}
            <ScrollAnimation direction="up" delay={0.15}>
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-lg">
                <Image
                  src="/gallery/gallery-04.jpeg"
                  alt="Wisuda Kelulusan Santri"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA BAR ─── */}
      <section className="bg-secondary border-t border-white/10">
        <div className="site-shell py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-white font-extrabold text-lg sm:text-xl font-heading leading-tight">
                Siap Bergabung Bersama Kami?
              </p>
              <p className="text-white/70 text-sm mt-1">
                Hubungi admin pendaftaran untuk info lebih lanjut atau daftar langsung sekarang.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <FaWhatsapp className="size-4" />
                Chat WhatsApp
              </Link>
              <Link
                href="/pendidikan"
                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Lihat Program <FaArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
