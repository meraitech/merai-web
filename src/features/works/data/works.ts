export interface WorkImage {
  url: string;
  caption?: string;
}

export interface Work {
  slug: string;
  title: string;
  year: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  stack?: string[];
  overview?: string;
  images?: WorkImage[];
  challenge?: string;
  solution?: string[];
  summary?: string;
}

export const works: Work[] = [
  {
    slug: "soho-artist",
    title: "Rizky Febian — Artist Portfolio",
    year: "2026",
    tags: ["Web App"],
    image: "/img/works/rizkyfebian.webp",
    liveUrl: "https://soho-artist.vercel.app/",
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Vercel"],
    overview:
      "A premium editorial artist profile for Indonesian singer-songwriter Rizky Febian — hero, biography, discography, featured release, videos, events, and gallery composed as one cinematic page. Warm off-white canvas, oversized serif display type, and generous whitespace keep the artist as the hero.",
    images: [
      {
        url: "https://img-highend.okezone.com/library/2023/11/06/master_rizky_febian_2_xyou9FGQUA.jpg",
        caption: "Hero — editorial portrait",
      },
      {
        url: "https://i.scdn.co/image/ab6761610000e5eb68288223723b5d7e6b0abbfe",
        caption: "Featured release — Jangan Buang Aku (2026)",
      },
      {
        url: "https://musiclive.id/wp-content/uploads/2024/09/Rizky-Febian-2.jpg",
        caption: "Live — 2024",
      },
      {
        url: "https://asset.kompas.com/crops/ZWS3ARfxs0u5zRfR661Yms_1j2E=/0x57:1024x739/1200x800/data/photo/2020/09/08/5f57660e002eb.jpg",
        caption: "Press — 2020",
      },
    ],
    challenge:
      "The artist's presence was scattered across streaming profiles, YouTube results, and press photos with no single premium home. A generic template would flatten the identity — the site needed to feel like a record-label presentation and digital magazine, not a dashboard.",
    solution: [
      "Editorial hero with oversized RIZKY FEBIAN display type, category label, quote, and full-height photography.",
      "Discography as an editorial collection: featured track plus a minimal 01–04 release list with artwork, year, type, and duration.",
      "Featured-release spread for Jangan Buang Aku with artwork, story, and listen/watch actions.",
      "Cinematic 16:9 video section, minimal event timeline, and asymmetric image-first gallery with subtle 1.03 hover scale.",
    ],
    summary:
      "One-page artist world that is interactive but never app-like: photography carries identity, serif type carries personality, whitespace carries confidence. Built with Next.js, React, Tailwind CSS, and Framer Motion, deployed on Vercel.",
  },
  {
    slug: "icma-indonesia",
    title: "ICMA Indonesia — CMA Certification Platform",
    year: "2026",
    tags: ["Web App"],
    image: "/img/works/icma.webp",
    liveUrl: "https://soho-icma.vercel.app/",
    stack: ["Next.js", "React", "Tailwind CSS", "Three.js", "Vercel"],
    overview:
      "The digital home of the ICMA Indonesia branch — education programs (CMA, CGBA), CFO Award, membership, events, and announcements in one credible, mobile-first experience, backed by a global Asia-Pacific network.",
    images: [
      {
        url: "/img/works/icma.webp",
        caption: "Hero — Become a CMA",
      },
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
        caption: "Branch Annual General Meeting 2026",
      },
      {
        url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
        caption: "CMA Batch 19 intensive program",
      },
      {
        url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
        caption: "CFO Award 2026 — nominations open",
      },
    ],
    challenge:
      "Program info, awards, membership, and events lived in scattered announcements with no single credible home. Finance professionals needed a clear route — from first visit to intake, CPD, and event seat — that works first and foremost on the phone.",
    solution: [
      "Program catalog for CMA and CGBA pathways with eligibility, recognition, and how-to-start flows.",
      "Awards spotlight for the CFO Award with nomination entry points.",
      "Announcements and events feed (branch news, intensives, webinars) with a unified archive.",
      "Membership framing plus a mobile-first 'My CMA' companion concept — intakes, CPD hours, and event seats in hand.",
    ],
    summary:
      "A branch platform that reads as an institution, not a brochure: global network proof, member activity, and every next step one tap away. Built with Next.js, React, Tailwind CSS, and Three.js, deployed on Vercel.",
  },
  {
    slug: "wiatour",
    title: "Wiatour — Tour & Travel Booking",
    year: "2026",
    tags: ["Web App"],
    image:
      "/img/works/wiatour.webp",
    liveUrl: "https://www.wiatour.com/",
    stack: ["Next.js", "Payload CMS", "MongoDB", "Tailwind CSS", "GSAP"],
    overview:
      "Booking experience for a tour & travel operator — ready-made packages, custom tours, private and open trips, plus flight and hotel ticketing, closed with WhatsApp deep-link CTAs and a wall of customer testimonials.",
    images: [
      {
        url: "https://www.wiatour.com/assets/web/home/about.webp",
        caption: "About — the team you trust",
      },
      {
        url: "https://www.wiatour.com/assets/web/home/layanan-1.webp",
        caption: "Ready-to-go tour packages",
      },
      {
        url: "https://www.wiatour.com/assets/web/home/layanan-2.webp",
        caption: "Custom tours by request",
      },
      {
        url: "https://www.wiatour.com/assets/web/home/layanan-3.webp",
        caption: "Premium private trips",
      },
    ],
    challenge:
      "Customers chose packages over chat with no clear picture of itineraries, durations, or prices — and trust had to be earned trip after trip. The business needed a browsable catalog with transparent packages plus social proof, editable by the team without touching code.",
    solution: [
      "Tour catalog with detail pages — duration, destinations, and thumbnails per package.",
      "Service categories: ready packages, custom tours, private and open trips, flight and hotel ticketing.",
      "WhatsApp deep-link CTAs carrying prefilled messages so every enquiry arrives with context.",
      "Testimonial wall spanning families, schools, corporates, and institutions.",
      "Payload CMS on MongoDB so the team publishes and edits tours themselves.",
    ],
    summary:
      "A catalog that sells before the first chat: transparent packages, one-tap WhatsApp handoff, and proof on every scroll. Built with Next.js, Payload CMS, MongoDB, Tailwind CSS, and GSAP.",
  },
  {
    slug: "orphic-gavel",
    title: "Orphic Gavel — Holding Company Profile",
    year: "2026",
    tags: ["Web App"],
    image: "/img/works/orphic.webp",
    liveUrl: "https://www.orphicgavel.com/",
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Vercel"],
    overview:
      "Company profile for Indonesian holding company PT Orphic Gavel Corp — official products and early-stage investments presented with an interactive globe, portfolio grid, and a clear contact path for founders.",
    images: [
      {
        url: "https://www.orphicgavel.com/img/portfolio/official-products/merai-bg.jpg",
        caption: "Official product — Merai",
      },
      {
        url: "https://www.orphicgavel.com/img/portfolio/official-products/merai-logo-horizontal.webp",
        caption: "Product identity",
      },
      {
        url: "https://www.orphicgavel.com/orphic/logo/logo.png",
        caption: "Brand mark",
      },
    ],
    challenge:
      "A holding company must communicate two things at once — products it operates and founders it backs — without reading like a generic corporate template. Founders needed to understand the thesis and reach out in one visit.",
    solution: [
      "Hero positioning the holding thesis in one line — products plus early-stage investments.",
      "Portfolio grid separating official products from venture bets.",
      "Interactive globe underscoring an Indonesia-rooted, outward-looking posture.",
      "About and contact pages giving founders and partners a direct path in.",
    ],
    summary:
      "A profile that behaves like an investor memo: thesis first, proof second, contact always near. Built with Next.js, React, Tailwind CSS, and Framer Motion, deployed on Vercel.",
  },
  {
    slug: "merai-construction",
    title: "Merai Construction — Dealership & Commercial",
    year: "2025",
    tags: ["Web App"],
    image:
      "/img/works/construction.webp",
    liveUrl: "https://web-construction-seven.vercel.app/",
    stack: ["Next.js", "React", "Tailwind CSS", "Drizzle", "GSAP"],
    overview:
      "Company profile for a construction firm specializing in automotive dealerships — 250+ delivered — with a database-backed project catalog, testimonial wall, and manufacturer-grade credibility, wrapped in a cinematic GSAP experience.",
    images: [
      {
        url: "https://web-construction-seven.vercel.app/images/contents/about1.jpg",
        caption: "On site — precision work",
      },
      {
        url: "https://web-construction-seven.vercel.app/images/contents/about2.jpg",
        caption: "Delivered to brand standard",
      },
      {
        url: "https://9i8v7fu2u1.ufs.sh/f/WryWTQIekOgw9NWNPt1yRbKMV2JkFTLd4qiSlhgAa3XNzCrt",
        caption: "Trans-Sumatra Highway Section 4",
      },
      {
        url: "https://9i8v7fu2u1.ufs.sh/f/WryWTQIekOgwexWQY6qS1bfFsalRcgTAB9Y7DmdV2C4jPHqw",
        caption: "Grand Mall Surabaya renovation",
      },
    ],
    challenge:
      "Dealership construction is won on compliance and track record — brand standards, approvals, safety — which a static brochure can't prove. The firm needed a browsable project portfolio its own team could manage, plus proof a manufacturer would trust.",
    solution: [
      "Project catalog backed by Drizzle and Neon with seeded admin content — new builds, renovations, expansions.",
      "Credibility band: 250+ dealerships, manufacturer coordination, and approval-stage management.",
      "Testimonial wall from developers, retail groups, and public-works directors.",
      "Cinematic GSAP motion with Lenis smooth scroll; contact block with phone, email, and office.",
    ],
    summary:
      "Proof-first company profile: every claim paired with a delivered project. Built with Next.js, React, Tailwind CSS, Drizzle, and GSAP, deployed on Vercel.",
  },
];

export function getWorkSlugs(): string[] {
  return works.map((w) => w.slug);
}

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}
