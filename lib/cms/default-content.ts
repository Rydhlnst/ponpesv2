import {
  educationHighlights,
  educationPrograms,
  facilityHighlights,
  facilityItems,
  faqCategories,
  galleryImages,
  heroStats,
  historyTimeline,
  mainNav,
  newsItems,
  siteConfig,
  testimonials,
  whyUsItems,
} from "@/lib/content"
import { richTextParagraph } from "@/lib/cms/rich-text"

export const defaultMediaAssets = [
  { label: "Primary Logo", url: "/logo.png", storageKey: "/logo.png", kind: "image", alt: siteConfig.shortName },
  { label: "Hero Image", url: siteConfig.heroImage, storageKey: siteConfig.heroImage, kind: "image", alt: siteConfig.name },
  ...galleryImages.map((item, index) => ({
    label: `Gallery ${index + 1}`,
    url: item.src,
    storageKey: item.src,
    kind: "image",
    alt: item.alt,
  })),
]

export const defaultSiteSettings = {
  id: "site",
  name: siteConfig.name,
  shortName: siteConfig.shortName,
  tagline: siteConfig.tagline,
  description: richTextParagraph(siteConfig.description),
  whatsapp: siteConfig.whatsapp,
  whatsappLabel: siteConfig.whatsappLabel,
  brochureHref: siteConfig.brochureHref,
  mapHref: siteConfig.mapHref,
  logoPath: siteConfig.logo,
  address: siteConfig.address,
  email: siteConfig.email,
  officeHours: siteConfig.officeHours,
  metadataTitle: `${siteConfig.shortName} | ${siteConfig.tagline}`,
  metadataDescription: siteConfig.description,
}

export const defaultHomepage = {
  id: "homepage",
  heroBadge: "QUR'AN - ADAB - AKADEMIK",
  heroTitle: siteConfig.name,
  heroDescription: richTextParagraph(siteConfig.description),
  heroImagePath: siteConfig.heroImage,
  primaryCtaLabel: "Daftar Sekarang",
  primaryCtaHref: siteConfig.whatsapp,
  secondaryCtaLabel: "Informasi Pendaftaran",
  secondaryCtaHref: siteConfig.whatsapp,
  newsTitle: "As Salam Metro News",
  newsDescription: richTextParagraph("Berita terbaru tentang Pondok Pesantren As Salam Metro"),
  partnersTitle: "Program Unggulan",
  partnersDescription: richTextParagraph("Didukung oleh kurikulum terpadu dan pembinaan intensif"),
  historyTitle: "Sejarah As Salam Metro",
  historyDescription: richTextParagraph("Pondok Pesantren As Salam Metro berkomitmen kuat dalam melahirkan generasi pecinta Al-Qur'an, beradab, dan berilmu luas."),
  whyUsTitle: "Mengapa As Salam Metro?",
  whyUsDescription: richTextParagraph("Alasan utama memilih As Salam Metro sebagai program pendidikan terbaik untuk anak Anda"),
  educationTitle: "Pendidikan As Salam",
  educationDescription: richTextParagraph("Kami menawarkan program pendidikan formal terakreditasi dan diniyyah yang terpadu"),
  facilitiesTitle: "Fasilitas As Salam",
  facilitiesDescription: richTextParagraph("Kami menyediakan berbagai sarana pendukung proses tholabul 'ilmi bagi kenyamanan santri"),
  faqTitle: "Pertanyaan Umum",
  faqDescription: richTextParagraph("Informasi yang mungkin Anda butuhkan sebelum mendaftar"),
  faqImagePath: "/gallery/gallery-08.jpeg",
  testimonialsTitle: "Apa Kata Mereka?",
  testimonialsDescription: richTextParagraph("Testimoni dari wali santri dan alumni yang telah mengikuti program di Pesantren As Salam Metro"),
  bottomCtaTitle: "Siap mengenal As Salam Metro lebih dekat?",
  bottomCtaDescription: richTextParagraph("Hubungi tim kami untuk konsultasi program, jadwal survey, dan informasi pendaftaran terbaru."),
  bottomCtaLabel: "Hubungi via WhatsApp",
  bottomCtaHref: siteConfig.whatsapp,
  heroStats,
}

export const defaultNavigation = mainNav.map((item, index) => ({
  ...item,
  sortOrder: index,
  openInNewTab: item.href.startsWith("http"),
}))

export const defaultPartnerItems = [
  { name: "Tahfizh 30 Juz", note: "Target terukur", sortOrder: 0 },
  { name: "Program Mutqin", note: "Kualitas hafalan", sortOrder: 1 },
  { name: "Program Sanad", note: "Sanad bersambung", sortOrder: 2 },
  { name: "Tafsir & Tajwid", note: "Pemahaman mendalam", sortOrder: 3 },
]

const whyUsIconKeys = [
  "book-text",
  "hand-helping",
  "graduation-cap",
  "shield-check",
  "languages",
  "sparkles",
]

export const defaultWhyUsItems = whyUsItems.map((item, index) => ({
  title: item.title,
  description: richTextParagraph(item.description),
  iconKey: whyUsIconKeys[index] ?? "sparkles",
  sortOrder: index,
}))

export const defaultNewsItems = newsItems.map((item, index) => ({
  title: item.title,
  dateLabel: item.date,
  category: item.category ?? "",
  summary: richTextParagraph(item.summary),
  href: item.href,
  coverPath: item.image ?? siteConfig.heroImage,
  published: true,
  sortOrder: index,
}))

export const defaultHistoryTimeline = historyTimeline.map((item, index) => ({
  year: item.year,
  title: item.title,
  description: richTextParagraph(item.description),
  color: item.color,
  sortOrder: index,
}))

export const defaultEducationSection = {
  pageTitle: "Program Pendidikan",
  pageDescription: richTextParagraph("Jalur pembinaan terpadu di As Salam Metro dirancang untuk menyeimbangkan hafalan Al-Qur'an, pemahaman ilmu syar'i, kemampuan akademik nasional, serta karakter adab islami."),
  highlights: educationHighlights.map((item, index) => ({ body: richTextParagraph(item), sortOrder: index })),
  programs: educationPrograms.map((program, index) => ({
    name: program.name,
    summary: richTextParagraph(program.summary),
    focus: richTextParagraph(program.focus),
    imagePath: program.image,
    iconKey: ["school", "graduation-cap", "star", "book-open"][index] ?? "sparkles",
    homePrimaryLabel: "Lihat Detail",
    homePrimaryHref: "/pendidikan",
    homeSecondaryLabel: "",
    homeSecondaryHref: "",
    sortOrder: index,
    points: program.points.map((point, pointIndex) => ({ body: richTextParagraph(point), sortOrder: pointIndex })),
  })),
}

export const defaultFacilitiesSection = {
  pageTitle: "Fasilitas Pesantren",
  pageDescription: richTextParagraph("Kami menyediakan berbagai sarana dan prasarana penunjang yang tertib, bersih, dan representatif untuk memastikan kenyamanan belajar serta pembinaan santri."),
  highlights: facilityHighlights.map((item, index) => ({ body: richTextParagraph(item), sortOrder: index })),
  items: facilityItems.map((item, index) => ({
    name: item.name,
    description: richTextParagraph(item.description),
    imagePath: item.image,
    iconKey: ["building-2", "book-open", "landmark", "book-text", "folder-open", "medal"][index] ?? "sparkles",
    sortOrder: index,
  })),
}

export const defaultGallerySection = {
  pageTitle: "Galeri Kegiatan",
  pageDescription: richTextParagraph("Dokumentasi kegiatan akademik, tahfizh Al-Qur'an, pembangunan, serta kebersamaan santri di Pondok Pesantren As Salam Metro."),
  items: galleryImages.map((item, index) => ({
    imagePath: item.src,
    alt: item.alt,
    caption: richTextParagraph(item.alt),
    aspect: item.aspect,
    published: true,
    sortOrder: index,
  })),
}

export const defaultFaqSection = {
  pageTitle: "Pertanyaan Umum (FAQ)",
  pageDescription: richTextParagraph("Mulai dari alur pendaftaran sampai rincian biaya masuk dan bulanan, semua jawaban utama dirangkum di sini untuk membantu keluarga calon santri."),
  categories: faqCategories.map((category, index) => ({
    name: category.category,
    iconKey: ["list-tree", "file-text", "book-text"][index] ?? "circle-help",
    sortOrder: index,
    items: category.items.map((item, itemIndex) => ({
      question: item.question,
      answer: richTextParagraph(item.answer),
      sortOrder: itemIndex,
    })),
  })),
}

export const defaultTestimonialsSection = {
  items: testimonials.map((item, index) => ({
    name: item.name,
    role: item.role,
    quote: richTextParagraph(item.quote),
    avatarPath: item.avatar ?? "",
    published: true,
    sortOrder: index,
  })),
}

export const defaultProfileSection = {
  pageTitle: "Profil Lembaga",
  pageDescription: richTextParagraph("Mengenal lebih dekat Pondok Pesantren Tahfizh Al-Qur'an As Salam Metro Indonesia, visi misi, program utama, dan struktur pengelola kami."),
  vision: richTextParagraph("Menjadi Lembaga terpercaya pencetak generasi berkarakter Al Qur’an pada tahun 2035"),
  identityRows: [
    ["Nama Lembaga", "Pondok Pesantren Tahfizh Al-Qur’an Yayasan As Salam Metro Indonesia"],
    ["NSPP / NSP", "510215720041"],
    ["Nama Pendiri", "KH. Agus Wibowo, SPdI, MM & Umi Sa'diyah, SH"],
    ["Tanggal Berdiri", "25 Desember 2017"],
    ["Alamat Lengkap", "Jl. Salam No. 10 Kel. Hadimulyo Barat Kec. Metro Pusat Kota Metro Lampung Indonesia"],
    ["Email Resmi", "pptqassalammetro@gmail.com"],
    ["Nomor HP / WhatsApp", "085609689565"],
  ].map(([label, value], index) => ({ label, value, sortOrder: index })),
  missionItems: [
    "Mendirikan Pondok Pesantren untuk menghasilkan hafidz dan hafidzah yang mutqin dan bersanad",
    "Mengembangkan metode menghafal cepat",
    "Membina komunitas pembaca dan penghafal Al Qur’an",
    "Mendirikan lembaga pendidikan berbasis Al Qur’an",
  ].map((body, index) => ({ body: richTextParagraph(body), sortOrder: index })),
  goalItems: [
    "Melahirkan generasi muda Hafizh Qur'an 30 juz yang beraqidah lurus dan beribadah dengan benar.",
    "Mempribadikan santri yang berakhlaqul karimah, berwawasan luas, dan berbadan sehat.",
    "Menanamkan karakter disiplin, bersungguh-sungguh, mandiri, dan tertata hidupnya.",
    "Mempersiapkan santri agar bermanfaat untuk sesama dan sukses mencapai keselamatan dunia akhirat.",
  ].map((body, index) => ({ body: richTextParagraph(body), sortOrder: index })),
  orgRows: [
    ["Ketua Pembina Yayasan", "H. Agus Wibowo, SPdI, MM"],
    ["Anggota Pembina Yayasan", "H. Sajino"],
    ["Anggota Pembina Yayasan", "Heri Ismayanto"],
    ["Anggota Pembina Yayasan", "Umi Sa'diyah, SH"],
    ["Anggota Pembina Yayasan", "Wasis Riyadi, SH, MH"],
    ["Ketua Pengurus Yayasan", "dr. H. Nanang Salman Saleh, SpB"],
    ["Wakil Ketua I", "Haryanto, SH"],
    ["Wakil Ketua II", "Dadang Haris, ST, MT"],
    ["Wakil Ketua III", "Heri Yusmargana, SP"],
    ["Wakil Ketua IV", "Dr. Waluyo Rudiyanto"],
    ["Sekretaris", "Asrori, ST"],
    ["Wakil Sekretaris", "Muhammad Arief Yutono"],
    ["Bendahara", "Ali Wardana, SE"],
    ["Wakil Bendahara", "Hj. Supri Handayani"],
    ["Ketua Pengawas", "Hardi, SKom"],
    ["Anggota Pengawas", "Drs. Sulistio"],
    ["Pimpinan Pondok", "KH. Agus Wibowo, SPdI, MM"],
    ["Musrif Santri Putra", "Yanuardi Fratama, SPdI (Al Hafizh)"],
    ["Musyrifah", "Dian Mardianti, SPd (Al Hafizhah)"],
    ["Musrif", "Muhammad Rafiq, SPd"],
    ["Kepesantrenan", "Ikhlasul 'Amal"],
    ["Admin", "Hilyatush Sholihah, SMat"],
  ].map(([role, name], index) => ({ role, name, sortOrder: index })),
  programRows: [
    ["Tahsin Tilawah", "book-text"],
    ["Tahfidz Al-Qur'an", "book-text"],
    ["Tafsir Al-Qur'an", "graduation-cap"],
    ["Program Sanad", "shield-check"],
    ["Program Mutqin", "star"],
    ["Kajian Diniyah & Aqidah", "sparkles"],
  ].map(([name, iconKey], index) => ({ name, iconKey, sortOrder: index })),
}

export const defaultContactSection = {
  pageTitle: "Hubungi Kami",
  pageDescription: richTextParagraph("Hubungi tim kami untuk konsultasi program, jadwal survey lokasi pondok pesantren, dan informasi pendaftaran terbaru."),
  infoTitle: "Informasi Kontak",
  infoDescription: richTextParagraph("Kami siap melayani kebutuhan informasi seputar pendaftaran santri baru."),
  locationTitle: "Lokasi Pesantren",
  locationDescription: richTextParagraph("Mari kunjungi sekretariat kami untuk berkonsultasi secara langsung."),
  methods: [
    {
      type: "address",
      title: "Alamat Kantor",
      subtitle: "Sekretariat Utama",
      description: "Jl. Salam No. 10 Kel. Hadimulyo Barat Kec. Metro Pusat Kota Metro Lampung Indonesia",
      value: "Jl. Salam No. 10 Kel. Hadimulyo Barat Kec. Metro Pusat Kota Metro Lampung Indonesia",
      actionLabel: "Buka Peta",
      actionHref: siteConfig.mapHref,
      sortOrder: 0,
    },
    {
      type: "whatsapp",
      title: "WhatsApp Pendaftaran",
      subtitle: "Hubungi Admin Pendaftaran",
      description: "Ustadzah Hilya (0856-0968-9565)",
      value: "085609689565",
      actionLabel: "Chat WhatsApp",
      actionHref: siteConfig.whatsapp,
      sortOrder: 1,
    },
    {
      type: "email",
      title: "Email Resmi",
      subtitle: "Kirim Pertanyaan",
      description: "pptqassalammetro@gmail.com",
      value: "pptqassalammetro@gmail.com",
      actionLabel: "Kirim Email",
      actionHref: `mailto:${siteConfig.email}`,
      sortOrder: 2,
    },
    {
      type: "clock",
      title: "Jam Kantor",
      subtitle: "Operasional Sekretariat",
      description: "Senin - Sabtu : 08.00 - 17.00 WIB",
      value: "Senin - Sabtu : 08.00 - 17.00 WIB",
      actionLabel: "",
      actionHref: "",
      sortOrder: 3,
    },
  ],
  locations: [
    {
      title: "Pondok Pesantren As Salam Metro",
      subtitle: "Kampus Utama",
      address: "Jl. Salam No. 10 Kel. Hadimulyo Barat Kec. Metro Pusat Kota Metro Lampung Indonesia",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.8055610815157!2d105.29813589999999!3d-5.1189912000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40bf2b89694ffb%3A0xe7bf1b66a0cae18c!2sPondok%20Pesantren%20As-Salam%20Metro%20Lampung!5e0!3m2!1sid!2sid!4v1783414583909",
      mapHref: siteConfig.mapHref,
      sortOrder: 0,
    },
  ],
}

export const defaultFooterSection = {
  brandText: "Pondok Pesantren Tahfizh Al-Qur'an As Salam Metro",
  socialIntro: "Tetap terhubung bersama kami di media sosial resmi.",
  copyrightText: `© ${new Date().getFullYear()} Pondok Pesantren As Salam Metro. Hak Cipta Dilindungi.`,
  quickLinks: [
    { label: "Home", href: "/", sortOrder: 0 },
    { label: "Profil", href: "/profil", sortOrder: 1 },
    { label: "Pendidikan", href: "/pendidikan", sortOrder: 2 },
    { label: "Fasilitas", href: "/fasilitas", sortOrder: 3 },
    { label: "FAQ", href: "/faq", sortOrder: 4 },
    { label: "Kontak", href: "/kontak", sortOrder: 5 },
  ],
  socialLinks: [
    { platform: "facebook", href: "https://facebook.com", sortOrder: 0 },
    { platform: "instagram", href: "https://instagram.com/assalammetroindonesia", sortOrder: 1 },
  ],
}
