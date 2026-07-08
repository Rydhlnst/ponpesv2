"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { FaWhatsapp, FaEnvelope, FaClock, FaPhone } from "react-icons/fa6"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { defaultNavigation as staticMainNav, defaultSiteSettings } from "@/lib/cms/default-content"
import { cn } from "@/lib/utils"

const staticSiteConfig = {
  ...defaultSiteSettings,
  logo: defaultSiteSettings.logoPath || "/logo.png",
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  if (href.startsWith("/#")) return pathname === "/"
  return pathname.startsWith(href)
}

export function SiteHeader({
  siteConfig = staticSiteConfig,
  mainNav = staticMainNav,
}: {
  siteConfig?: {
    name?: string
    shortName: string
    tagline: string
    logo: string
    whatsapp: string
    whatsappLabel?: string
    email?: string
    officeHours?: string
  }
  mainNav?: {
    label: string
    href: string
  }[]
}) {
  const pathname = usePathname()

  // Clean WhatsApp number for link (remove spaces, symbols)
  const waNumber = siteConfig.whatsapp.replace(/\D/g, "")
  const waHref = waNumber.startsWith("62")
    ? `https://wa.me/${waNumber}`
    : waNumber.startsWith("0")
    ? `https://wa.me/62${waNumber.substring(1)}`
    : `https://wa.me/${waNumber}`

  // Display-friendly number: 62XXXXXXXXXX → 0XXX-XXXX-XXXX
  const rawDigits = waNumber.startsWith("62") ? "0" + waNumber.slice(2) : waNumber
  const waDisplay = rawDigits.replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3")

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-xs">
      {/* Tier 1: Top Bar */}
      <div className="w-full border-b border-gray-100 py-3 sm:py-4">
        <div className="site-shell flex items-center justify-between gap-4">
          {/* Logo & Brand Info */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.shortName}
              width={64}
              height={64}
              className="size-10 sm:size-12 object-cover rounded-full"
            />
            <div>
              <p className="font-heading text-base sm:text-lg font-bold text-foreground tracking-tight leading-tight uppercase">
                {siteConfig.shortName}
              </p>
              <p className="text-[10px] text-muted-foreground italic font-sans leading-none mt-0.5">
                {siteConfig.tagline}
              </p>
            </div>
          </Link>

          {/* Right Side: Contact info (desktop) / Square Buttons (mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Info blocks - Desktop & Tablet */}
            <div className="hidden md:flex items-center gap-4 lg:gap-5 text-xs text-muted-foreground">
              {siteConfig.email && (
                <a href={`mailto:${siteConfig.email}`} className="group flex items-center gap-2 hover:text-primary transition-colors">
                  <FaEnvelope className="size-3.5 text-primary shrink-0" />
                  <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out">
                    {siteConfig.email}
                  </span>
                </a>
              )}
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 hover:text-primary transition-colors">
                <FaPhone className="size-3.5 text-primary shrink-0" />
                <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out">
                  {waDisplay}
                </span>
              </a>
              {siteConfig.officeHours && (
                <div className="group flex items-center gap-2">
                  <FaClock className="size-3.5 text-primary shrink-0" />
                  <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out">
                    {siteConfig.officeHours}
                  </span>
                </div>
              )}
            </div>

            {/* Mobile Contact Shortcuts (Mail & Phone square buttons) */}
            <div className="flex md:hidden items-center gap-1.5">
              {siteConfig.email && (
                <Button variant="ghost" size="icon" className="size-9 rounded-none border border-gray-100 hover:bg-secondary/40 text-primary p-0 bg-gray-50/50" asChild>
                  <a href={`mailto:${siteConfig.email}`} aria-label="Kirim Email">
                    <FaEnvelope className="size-4" />
                  </a>
                </Button>
              )}
              <Button variant="ghost" size="icon" className="size-9 rounded-none border border-gray-100 hover:bg-secondary/40 text-primary p-0 bg-gray-50/50" asChild>
                <a href={`tel:${siteConfig.whatsapp}`} aria-label="Telepon">
                  <FaPhone className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 2: Navigation Links (Desktop) / Hamburger Trigger & WA (Mobile) */}
      <div className="w-full py-2 bg-primary">
        <div className="site-shell flex items-center justify-between gap-6">

          {/* Mobile Tier 2 Content (Below lg) */}
          <div className="flex lg:hidden w-full items-center justify-between">
            {/* Left: Mobile Sheet Trigger / Hamburger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white size-9 rounded-none border-none p-0 flex items-center justify-start hover:bg-transparent"
                  aria-label="Buka menu"
                >
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" showCloseButton={false} className="w-full max-w-[300px] border-r border-border bg-white rounded-none p-0 flex flex-col">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Image
                      src={siteConfig.logo}
                      alt={siteConfig.shortName}
                      width={40}
                      height={40}
                      className="size-9 object-cover rounded-full"
                    />
                    <div>
                      <p className="font-heading text-sm font-bold text-foreground tracking-tight leading-tight uppercase">
                        {siteConfig.shortName}
                      </p>
                      <p className="text-[9px] text-muted-foreground italic font-sans leading-none mt-0.5">
                        {siteConfig.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Close Button in a square border */}
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-9 rounded-none border border-gray-200 hover:bg-secondary/40 text-muted-foreground flex items-center justify-center p-0"
                      aria-label="Tutup menu"
                    >
                      <span className="font-sans text-sm font-bold">X</span>
                    </Button>
                  </SheetClose>
                </div>

                {/* Drawer Links */}
                <nav className="flex-1 overflow-y-auto flex flex-col">
                  {mainNav.map((item) => {
                    const active = isActivePath(pathname, item.href)
                    const isExternal = item.href.startsWith("http")
                    return (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className={cn(
                            "px-6 py-4 text-xs font-bold uppercase tracking-wider border-b border-gray-100 transition-colors block text-left",
                            active
                              ? "text-primary font-bold"
                              : "text-foreground hover:bg-secondary/10"
                          )}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Right: WhatsApp Button */}
            <Button size="sm" className="bg-white text-primary hover:bg-white/90 rounded-none px-4 py-4 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" asChild>
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="size-4" />
                WHATSAPP
              </a>
            </Button>
          </div>

          {/* Desktop Tier 2 Content (lg and above) */}
          <div className="hidden lg:flex w-full items-center justify-between">
            {/* Main Navigation Links */}
            <nav className="flex items-center gap-2">
              {mainNav.map((item) => {
                const active = isActivePath(pathname, item.href)
                const isExternal = item.href.startsWith("http")
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={cn(
                      "rounded-none px-4 py-2 text-xs font-bold tracking-widest transition-all duration-300 uppercase",
                      active
                        ? "text-white font-bold underline underline-offset-4"
                        : "text-white/75 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* WhatsApp Button */}
            <Button size="sm" className="bg-white text-primary hover:bg-white/90 rounded-none px-5 py-5 text-xs font-bold uppercase tracking-widest flex items-center gap-2" asChild>
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="size-4" />
                WHATSAPP
              </a>
            </Button>
          </div>

        </div>
      </div>
    </header>
  )
}
