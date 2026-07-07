import Link from "next/link"
import { 
  FaLocationDot, 
  FaWhatsapp, 
  FaEnvelope, 
  FaClock,
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram 
} from "react-icons/fa6"

import { KirimEmailForm } from "@/components/kirim-email-form"
import { getContactSection, getFooterSection } from "@/lib/db/queries"
import { siteConfig } from "@/lib/content"

export default async function KontakPage() {
  const contact = await getContactSection()
  const footer = await getFooterSection()

  // Find specific values from methods or fall back to defaults
  const alamatMethod = contact.methods.find((m) => m.type.toLowerCase() === "address" || m.title.toLowerCase().includes("alamat"))
  const addressVal = alamatMethod?.value || siteConfig.address

  const waMethod = contact.methods.find((m) => m.type.toLowerCase() === "whatsapp")
  const waVal = waMethod?.value || "082311649025"

  const emailMethod = contact.methods.find((m) => m.type.toLowerCase() === "email")
  const emailVal = emailMethod?.value || "info@alitqan.id"

  const hoursMethod = contact.methods.find((m) => m.type.toLowerCase() === "clock" || m.type.toLowerCase() === "hours")
  const hoursVal = hoursMethod?.value || "Mon - Fri : 08.00-17.00\nSat - Sun : Closed"

  // Map settings
  const loc = contact.locations[0]
  const mapEmbedUrl = loc?.mapEmbedUrl || "https://maps.google.com/maps?q=Pesantren%20Al%20Itqan%20Jatisampurna%20Bekasi&t=&z=15&ie=UTF8&iwloc=&output=embed"

  // Social icon helper
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <FaFacebookF className="size-4" />
      case "twitter":
      case "x":
        return <FaTwitter className="size-4" />
      case "linkedin":
        return <FaLinkedinIn className="size-4" />
      case "instagram":
        return <FaInstagram className="size-4" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Contact Section Layout */}
      <section className="site-section py-16 sm:py-24">
        <div className="site-shell grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Column: Info, Socials & Map (Grid width: 7/12) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-sans leading-none">
                Hubungi Kami
              </h1>
              {/* Thick Orange Line */}
              <div className="w-full h-[3.5px] bg-primary mt-4 mb-6" />
              <h2 className="text-xl sm:text-2xl font-bold text-foreground font-sans">
                {siteConfig.shortName === "As Salam Metro" ? "Al Itqan - Islamic Boarding School" : `${siteConfig.shortName} - Islamic Boarding School`}
              </h2>
              <p className="text-sm text-muted-foreground">
                Mulai Perjalanan Ilmu Bersama Al-Qur'an
              </p>
            </div>

            {/* 2x2 Grid of Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-4">
              {/* Alamat */}
              <div className="flex gap-4">
                <FaLocationDot className="size-6 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="font-bold text-foreground text-sm font-sans">Alamat:</p>
                  <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                    {addressVal}
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-4">
                <FaWhatsapp className="size-6 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="font-bold text-foreground text-sm font-sans">WhatsApp</p>
                  <p className="text-sm text-muted-foreground font-sans">
                    {waVal}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <FaEnvelope className="size-6 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="font-bold text-foreground text-sm font-sans">Email</p>
                  <div className="text-sm text-muted-foreground font-sans space-y-0.5 whitespace-pre-line">
                    {emailVal}
                  </div>
                </div>
              </div>

              {/* Jam Kantor */}
              <div className="flex gap-4">
                <FaClock className="size-6 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="font-bold text-foreground text-sm font-sans">Jam Kantor</p>
                  <div className="text-sm text-muted-foreground font-sans space-y-0.5 whitespace-pre-line">
                    {hoursVal}
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal Line */}
            <div className="w-full h-px bg-gray-200 my-8" />

            {/* Social Media Row */}
            <div className="flex items-center gap-4">
              <span className="font-bold text-sm text-foreground font-sans">Our Social Media :</span>
              <div className="flex items-center gap-2">
                {footer.socialLinks.map((link, index) => {
                  const icon = getSocialIcon(link.platform)
                  if (!icon) return null
                  return (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-9 border border-gray-200 text-foreground hover:text-primary hover:border-primary flex items-center justify-center transition-colors rounded-none bg-white"
                      aria-label={link.platform}
                    >
                      {icon}
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="relative w-full h-[280px] rounded-none overflow-hidden border border-gray-100 shadow-inner">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Sekolah"
              />
            </div>

          </div>

          {/* Right Column: Kirim Email Form Card (Grid width: 5/12) */}
          <div className="lg:col-span-5 lg:pl-4">
            <KirimEmailForm targetEmail={emailVal} />
          </div>

        </div>
      </section>
    </div>
  )
}
