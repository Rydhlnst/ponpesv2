import type { IconType } from "react-icons";
import {
  FaBookOpen,
  FaBookOpenReader,
  FaBookQuran,
  FaBuildingColumns,
  FaClipboardList,
  FaFutbol,
  FaGraduationCap,
  FaHandsPraying,
  FaLanguage,
  FaMoneyBillWave,
  FaShieldHeart,
  FaStar,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa6";

export type NavItem = {
  label: string;
  href: string;
};

export type NewsItem = {
  title: string;
  date: string;
  summary: string;
  href: string;
  image?: string;
  category?: string;
};

export type PartnerItem = {
  name: string;
  note: string;
};

export type WhyUsItem = {
  title: string;
  description: string;
  icon: IconType;
};

export type EducationProgram = {
  name: string;
  summary: string;
  focus: string;
  image: string;
  points: string[];
  icon: IconType;
};

export type Facility = {
  name: string;
  description: string;
  image: string;
  icon: IconType;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  aspect: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  color: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  category: string;
  icon: IconType;
  items: FaqItem[];
};

export const siteConfig = {
  name: "Pondok Pesantren Tahfizh Al-Qur’an Yayasan As Salam Metro Indonesia",
  shortName: "As Salam Metro",
  location: "Hadimulyo Barat, Metro Pusat, Kota Metro, Lampung",
  tagline: "Pondok Pesantren Tahfizh Al-Qur’an",
  description:
    "Pondok Pesantren Tahfizh Al-Qur’an Yayasan As Salam Metro Indonesia adalah wadah belajar Al-Qur’an mulai dari membaca, mentadabburi, mengamalkan, hingga menghafalkannya, demi terwujudnya generasi muslim yang berakhlakul karimah, cerdik, terampil, dan bermanfaat.",
  whatsapp: "https://wa.me/6285609689565",
  whatsappLabel: "Hubungi Pendaftaran",
  brochureHref: "#",
  mapHref: "https://maps.app.goo.gl/oMWDr9k7J4ezrDuy5",
  logo: "/logo.png",
  heroImage: "/gallery/gallery-08.jpeg",
  address: "Jl. Salam No. 10 Kel. Hadimulyo Barat Kec. Metro Pusat Kota Metro Lampung Indonesia",
  email: "pptqassalammetro@gmail.com",
  officeHours: "Senin - Sabtu : 08.00 - 17.00",
};

const IMG = {
  belajarMengajar:       "/gallery/gallery-01.jpeg",
  santriBarisDisiplin:   "/gallery/gallery-02.jpeg",
  kajianTadabbur:        "/gallery/gallery-03.jpeg",
  wisudaKelulusan:       "/gallery/gallery-04.jpeg",
  pembangunanFasilitas:  "/gallery/gallery-05.jpeg",
  ekskul:                "/gallery/gallery-06.jpeg",
  olahragaPagi:          "/gallery/gallery-07.jpeg",
  profilPesantren:       "/gallery/gallery-08.jpeg",
  lingkunganSarana:      "/gallery/gallery-09.jpeg",
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Pendidikan", href: "/pendidikan" },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Galeri", href: "/galeri" },
  { label: "FAQ", href: "/faq" },
  { label: "Pendaftaran", href: "/pendaftaran" },
  { label: "Kontak", href: "/kontak" },
];

export const heroStats = [
  { value: "5", label: "Program utama" },
  { value: "Tahfizh", label: "dan Mutqin" },
  { value: "Reguler", label: "SMP & SMA" },
];

export const newsItems: NewsItem[] = [
  {
    title: "Santri As Salam Metro Selesaikan Setoran Ziyadah 30 Juz",
    date: "17 Jun 2026",
    summary: "Beberapa santri program SMP dan SMA berhasil menyelesaikan target setoran hafalan 30 juz dalam waktu singkat.",
    href: "#",
    image: IMG.wisudaKelulusan,
    category: "berita acara",
  },
  {
    title: "Qur’anic Boot Camp Perdana Sukses Dilaksanakan",
    date: "22 May 2026",
    summary: "Kegiatan Qur’anic Boot Camp bertujuan menanamkan karakter dan nilai-nilai Al-Qur’an dalam kehidupan sehari-hari.",
    href: "#",
    image: IMG.belajarMengajar,
    category: "kegiatan santri",
  },
  {
    title: "Kajian Pekanan dan Khataman Al-Qur’an Setiap Jum’at Pagi",
    date: "03 May 2026",
    summary: "Sebagai bagian dari pembiasaan rohani, seluruh santri mengikuti khataman Al-Qur’an dan kajian bersama pimpinan pondok.",
    href: "#",
    image: IMG.kajianTadabbur,
    category: "kegiatan santri",
  },
];

export const historyParagraphs = [
  "Puji dan syukur kita panjatkan ke hadirat Allah SWT. Yang telah menurunkan Al qur’an sebagai Petunjuk dan Rahmat bagi alam semesta, menganugerahkan nikmat yang paling utama yakni nikmat Iman, Islam, kesehatan dan panjang umur sehingga kita masih bisa melaksanakan aktivitas sebagaimana mestinya.",
  "Islam memandang bahwa dengan diturunkannya Al Qur’an di dunia ini dimaksudkan untuk mengubah masyarakat dari kegelapan kepada kehidupan yang terang benderang, dari akhlak yang buruk kepada akhlak yang mulia, dari kebodohan menuju kepandaian, dari keterbelakangan menuju kemajuan.",
  "Pondok Pesantren Tahfizh Al-Qur’an Yayasan As Salam Metro Indonesia didirikan sebagai sarana pendidikan dan pengembangan ilmu agama baik secara teoritis maupun praktis untuk kaderisasi muslim. Hal ini dimaksudkan dalam rangka turut serta menjunjung tinggi dan menegakkan Dienul Islam dan mempersiapkan generasi muslim yang cerdik, terampil, dan terdidik demi terwujudnya masyarakat yang “Berakhlakul Karimah”.",
  "Pembangunan Pondok Pesantren Tahfizh Al-Qur’an Yayasan As Salam Metro Indonesia dan sarana pelengkapnya mutlak dibutuhkan keberadaannya, sehingga pelaksanaan ibadah dan tholabul 'ilmi bagi para santri merasa nyaman, aman, dan tertib.",
];

export const partnerItems: PartnerItem[] = [
  { name: "Tahfizh 30 Juz", note: "Target terukur" },
  { name: "Program Mutqin", note: "Kualitas hafalan" },
  { name: "Program Sanad", note: "Sanad bersambung" },
  { name: "Tafsir & Tajwid", note: "Pemahaman mendalam" },
];

export const whyUsItems: WhyUsItem[] = [
  {
    title: "Tahfizh yang Terukur",
    description:
      "Setiap jenjang memiliki target hafalan, murajaah, dan evaluasi berkala agar kualitas hafalan santri tetap terjaga.",
    icon: FaBookQuran,
  },
  {
    title: "Adab dan Ibadah Harian",
    description:
      "Pembiasaan shalat berjamaah, dzikir pagi-petang, amalan sunnah, serta kedisiplinan beradab di asrama.",
    icon: FaHandsPraying,
  },
  {
    title: "Pendidikan Formal SMP & SMA",
    description:
      "Kurikulum nasional berjalan selaras dengan pendidikan kepesantrenan untuk mempersiapkan masa depan santri.",
    icon: FaGraduationCap,
  },
  {
    title: "Program Mutqin Lanjutan",
    description:
      "Program khusus bagi yang telah selesai 30 juz untuk memperkuat hafalan dengan setoran sekali duduk hingga 30 juz.",
    icon: FaShieldHeart,
  },
  {
    title: "Talaqqi Bersanad",
    description:
      "Program setoran Al-Qur'an dengan sanad yang menyambung hingga Rasulullah SAW melalui pengajar yang kompeten.",
    icon: FaLanguage,
  },
  {
    title: "Lokasi Nyaman & Asri",
    description:
      "Terletak di pusat Kota Metro namun jauh dari bising perkotaan, menciptakan iklim belajar yang sangat tenang.",
    icon: FaUsers,
  },
];

export const educationPrograms: EducationProgram[] = [
  {
    name: "SMP Reguler (Boarding)",
    summary:
      "Pendidikan formal tingkat menengah pertama terakreditasi, memadukan kurikulum nasional Kemendikbud dengan kurikulum kepesantrenan dan tahfizh intensif.",
    focus: "Fokus pada pembentukan pondasi adab, kelancaran bacaan tajwid, dan pencapaian hafalan Al-Qur'an secara terarah.",
    image: IMG.santriBarisDisiplin,
    points: [
      "Kurikulum nasional dipadukan pelajaran diniyah kepesantrenan",
      "Bimbingan intensif setoran ziyadah dan muraja'ah harian",
      "Pembiasaan kemandirian serta karakter akhlakul karimah",
    ],
    icon: FaBuildingColumns,
  },
  {
    name: "SMA Reguler (Boarding)",
    summary:
      "Pendidikan formal tingkat menengah atas terakreditasi, fokus pada penguatan hafalan Al-Qur'an, pemahaman ilmu syar'i, dan persiapan studi lanjut.",
    focus: "Mempersiapkan kader dakwah yang berwawasan luas, mandiri, hafal Al-Qur'an, and siap berkontribusi di masyarakat.",
    image: IMG.wisudaKelulusan,
    points: [
      "Kurikulum nasional dipadu dengan materi tafsir, hadits, dan bahasa Arab",
      "Persiapan karir akademik, keagamaan, serta pengabdian masyarakat",
      "Pendampingan target kelulusan hafalan 30 juz yang berkualitas",
    ],
    icon: FaUserGraduate,
  },
  {
    name: "Program Mutqin Lanjutan",
    summary:
      "Program pasca-tahfizh 30 juz yang dirancang khusus untuk mengokohkan hafalan santri melalui 5 tingkatan evaluasi sekali duduk.",
    focus: "Penguatan kualitas hafalan santri dari setoran 1 juz, 5 juz, 10 juz, 15 juz, hingga 30 juz sekali duduk.",
    image: IMG.belajarMengajar,
    points: [
      "Level 1-2: Menyetorkan 1 & 5 juz sekali duduk serta menghafal matan Tuhfatul Athfal",
      "Level 3-4: Menyetorkan 10 & 15 juz sekali duduk serta menghafal matan Jazariyah",
      "Level 5: Menyetorkan 30 juz sekali duduk serta memahami hukum fiqih & tafsirnya",
    ],
    icon: FaStar,
  },
  {
    name: "Program Sanad & Tafsir",
    summary:
      "Program khusus pendalaman ilmu Al-Qur'an secara mendalam meliputi pengambilan ijazah sanad bacaan dan pemahaman makna ayat (tafsir).",
    focus: "Menghubungkan bacaan santri dengan rantai sanad yang sah hingga Rasulullah SAW dan memperluas tadabbur Al-Qur'an.",
    image: IMG.kajianTadabbur,
    points: [
      "Talaqqi bacaan secara tartil di bawah bimbingan muhafizh pemegang sanad",
      "Kajian tafsir Al-Qur'an terjadwal untuk memperluas pemahaman isi kandungan",
      "Pemberian ijazah sanad resmi setelah menyelesaikan ujian tasmi' akhir",
    ],
    icon: FaBookQuran,
  },
];

export const facilityItems: Facility[] = [
  {
    name: "Gedung & Asrama Mukim",
    description:
      "Sarana asrama yang bersih dan tertib, memfasilitasi istirahat serta pembinaan karakter mandiri santri.",
    image: IMG.lingkunganSarana,
    icon: FaBuildingColumns,
  },
  {
    name: "Ruang Kelas Belajar",
    description:
      "Ruang belajar yang nyaman dan representatif untuk kegiatan sekolah formal maupun halaqah tahfizh.",
    image: IMG.belajarMengajar,
    icon: FaBookOpen,
  },
  {
    name: "Sarana Ibadah (Mushola)",
    description:
      "Pusat ibadah harian santri, sholat berjamaah, dzikir pagi-petang, serta koordinasi kegiatan keagamaan.",
    image: IMG.kajianTadabbur,
    icon: FaHandsPraying,
  },
  {
    name: "Perpustakaan & Kitab",
    description:
      "Koleksi buku-buku penunjang akademik serta kitab-kitab syar'i untuk mendukung tholabul 'ilmi santri.",
    image: IMG.ekskul,
    icon: FaBookOpenReader,
  },
  {
    name: "Kantor Sekretariat",
    description:
      "Pusat layanan administrasi, informasi operasional pesantren, serta ruang pendaftaran santri baru.",
    image: IMG.profilPesantren,
    icon: FaClipboardList,
  },
  {
    name: "Area Olahraga & Kebugaran",
    description:
      "Sarana olahraga lapangan untuk menjaga kesehatan fisik, sportivitas, dan keseimbangan aktivitas santri.",
    image: IMG.olahragaPagi,
    icon: FaFutbol,
  },
];

export const educationHighlights = [
  "Kurikulum nasional, diniyah, dan tahfizh terintegrasi secara seimbang.",
  "Pola monitoring hafalan berkala yang ketat dan dilaporkan teratur.",
  "Penanaman karakter adab salafus shalih dalam keseharian santri.",
];

export const facilityHighlights = [
  "Sarana asrama dan kelas yang bersih serta representatif",
  "Suasana lingkungan pesantren yang asri, tenang, dan kondusif",
  "Pusat administrasi dan ibadah terintegrasi dalam satu komplek",
];

export const faqCategories: FaqCategory[] = [
  {
    category: "Pendaftaran",
    icon: FaClipboardList,
    items: [
      {
        question: "Bagaimana cara melakukan pendaftaran santri baru?",
        answer:
          "Pendaftaran dapat dilakukan secara online melalui link bit.ly/PSBPPAsSalamMetroIndonesia atau dengan mengirim pesan WhatsApp ke 085609689565 (Ustadzah Hilya). Pendaftaran juga dilayani secara langsung di kantor sekretariat Pondok Pesantren As-Salam Metro.",
      },
      {
        question: "Kapan waktu pendaftaran dibuka?",
        answer:
          "Waktu pendaftaran dibuka bertahap sesuai tahun ajaran berjalan. Sebagai contoh, Gelombang Utama dibuka mulai tanggal 15 September sampai dengan 14 Desember.",
      },
      {
        question: "Apa saja syarat pendaftaran santri reguler?",
        answer:
          "Syarat pendaftaran meliputi: Fotokopi Ijazah SD (untuk pendaftar SMP) atau Fotokopi Ijazah SMP (untuk pendaftar SMA), mengisi formulir online, lulus tes membaca Al-Qur'an, melampirkan fotokopi Kartu Keluarga, serta memiliki komitmen kuat untuk menghafal Al-Qur'an dan mematuhi aturan pesantren.",
      },
      {
        question: "Apakah menerima santri pindahan?",
        answer:
          "Ya, dengan menyertakan berkas tambahan berupa fotokopi rapot dari sekolah asal serta Surat Keterangan Pindah Sekolah resmi.",
      },
    ],
  },
  {
    category: "Biaya",
    icon: FaMoneyBillWave,
    items: [
      {
        question: "Berapa rincian biaya masuk awal bagi santri reguler?",
        answer:
          "Biaya masuk awal (reguler) total adalah Rp 5.750.000 (tidak termasuk biaya bulanan pertama). Rinciannya meliputi: Infaq Pembangunan Rp 2.000.000 (dapat diangsur 3x), Infaq Perlengkapan Asrama Rp 1.700.000 (ranjang, kasur, bantal, sprei: Rp 1.400.000 + lemari: Rp 300.000), Seragam Rp 750.000, dan Kitab Rp 200.000. Ditambah Infaq Kesehatan Rp 100.000/tahun.",
      },
      {
        question: "Berapa biaya bulanan (syahriah) santri?",
        answer:
          "Biaya bulanan adalah Rp 1.000.000/bulan, yang mencakup: Makan 3x sehari (Rp 600.000), Infaq Pendidikan (Rp 250.000), dan Jasa Laundry pakaian (Rp 150.000).",
      },
      {
        question: "Apakah ada beasiswa di Pesantren As Salam Metro?",
        answer:
          "Ya, tersedia program Beasiswa Penuh bagi anak yatim dan dhu'afa yang memiliki kesungguhan serta memenuhi kualifikasi seleksi pesantren.",
      },
    ],
  },
  {
    category: "Program",
    icon: FaBookOpen,
    items: [
      {
        question: "Apa saja rutinitas harian program Tahfidz?",
        answer:
          "Kegiatan harian meliputi setoran hafalan baru (ziyadah), mengulang hafalan (muraja’ah), persiapan (isti’dad), tilawah mandiri, serta tasmi' (memperdengarkan hafalan).",
      },
      {
        question: "Apa keunggulan Program Mutqin?",
        answer:
          "Program Mutqin melatih santri memperkuat hafalan yang sudah diselesaikan agar melekat kuat melalui ujian setoran sekali duduk (dari 1 juz, 5 juz, 10 juz, 15 juz, hingga 30 juz).",
      },
      {
        question: "Apa itu Program Sanad di As Salam Metro?",
        answer:
          "Program Sanad melatih santri membaca Al-Qur'an secara talaqqi guna menyambungkan rantai sanad hafalan mereka langsung hingga Rasulullah SAW.",
      },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Wali Santri Aulia Zahra",
    role: "Wali Santri SMP Reguler As Salam Metro",
    quote:
      "Alhamdulillah, kami sangat bersyukur menitipkan putri kami di Pondok Pesantren As Salam Metro. Dalam waktu yang relatif singkat, hafalan Al-Qur'annya berkembang pesat dengan kualitas yang terjaga. Karakter kemandirian dan adab kesehariannya juga mengalami perubahan positif yang luar biasa.",
  },
  {
    name: "Alumni Santri 30 Juz",
    role: "Peserta Program Mutqin & Bersanad",
    quote:
      "Belajar di As Salam Metro memberikan pengalaman rohani yang sangat indah. Bimbingan dari ustadz dan ustadzah pemegang sanad sangat membimbing kami dalam menjaga kualitas bacaan serta hafalan. Lingkungan asrama yang tenang sangat mendukung fokus kami dalam tholabul 'ilmi.",
  },
];

export const galleryImages: GalleryImage[] = [
  { src: IMG.belajarMengajar,      alt: "Suasana belajar mengajar santri tahfizh As Salam Metro",         aspect: "4/3"  },
  { src: IMG.santriBarisDisiplin,  alt: "Santri-santri As Salam berbaris tertib dan disiplin",             aspect: "3/4"  },
  { src: IMG.kajianTadabbur,       alt: "Kegiatan kajian dan tadabbur Al-Qur'an santri As Salam",         aspect: "16/9" },
  { src: IMG.wisudaKelulusan,      alt: "Wisuda kelulusan santri tahfizh As Salam Metro",                 aspect: "4/3"  },
  { src: IMG.pembangunanFasilitas, alt: "Pembangunan dan fasilitas penunjang belajar mengajar",            aspect: "16/9" },
  { src: IMG.ekskul,               alt: "Kegiatan ekstrakurikuler kepanduan pramuka santri",               aspect: "3/4"  },
  { src: IMG.olahragaPagi,         alt: "Kegiatan olahraga pagi dan kebersamaan santri",                  aspect: "4/3"  },
  { src: IMG.profilPesantren,      alt: "Profil Pondok Pesantren As Salam Metro Indonesia",               aspect: "4/3"  },
  { src: IMG.lingkunganSarana,     alt: "Lingkungan dan sarana Pondok Pesantren As Salam Metro",          aspect: "16/9" },
];

export const historyTimeline: TimelineItem[] = [
  {
    year: "2017",
    title: "Pendirian Rumah Tahfizh",
    description: "Didirikan tanggal 25 Desember 2017 sebagai Rumah Tahfizh Al Qur'an As Salam di bawah naungan Yayasan As-Salam Metro Indonesia.",
    color: "bg-amber-500",
  },
  {
    year: "2021",
    title: "Penerimaan Santri Perdana",
    description: "Mulai menerima santri yang belajar dan menetap hingga terkumpul 23 santri pertama yang menjadi cikal bakal kepesantrenan.",
    color: "bg-primary",
  },
  {
    year: "2023",
    title: "Izin Operasional Resmi Kemenag",
    description: "Resmi terdaftar sebagai pesantren di Kementerian Agama RI dengan Nomor Statistik Pesantren (NSP) No: 510215720041.",
    color: "bg-accent-gold",
  },
  {
    year: "Sekarang",
    title: "Pengembangan Pendidikan",
    description: "Terus berkomitmen melahirkan santri reguler SMP & SMA yang hafal Al-Qur'an 30 juz, berakhlak mulia, mutqin, dan bersanad.",
    color: "bg-emerald-600",
  },
];
