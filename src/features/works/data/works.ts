export interface Work {
  slug: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  image: string;
}

export const works: Work[] = [
  {
    slug: "halcyon-type-foundry",
    title: "E-Commerce Platform Redesign",
    client: "RetailCorp",
    year: "2025",
    tags: ["Web App"],
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
  },
  {
    slug: "bloom-cold-brew",
    title: "FinTech Mobile App",
    client: "PayFlow",
    year: "2025",
    tags: ["Mobile"],
    image:
      "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=800&q=80",
  },
  {
    slug: "polaris-navigation-kit",
    title: "SaaS Dashboard UI",
    client: "DataVista",
    year: "2024",
    tags: ["Web App", "Product"],
    image:
      "https://images.unsplash.com/photo-1618004652321-13a63e576b80?w=800&q=80",
  },
  {
    slug: "northwind-commerce",
    title: "Logistics Management System",
    client: "ShipPro",
    year: "2024",
    tags: ["Web App", "Mobile"],
    image:
      "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800&q=80",
  },
  {
    slug: "quanta-dashboard",
    title: "Healthcare Platform",
    client: "MediCare",
    year: "2024",
    tags: ["Product"],
    image:
      "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&q=80",
  },
  {
    slug: "drift-outerwear",
    title: "Brand Website & CMS",
    client: "UrbanStyle",
    year: "2024",
    tags: ["Web App"],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  },
  {
    slug: "orbital-summer-drop",
    title: "Event Booking App",
    client: "EventPro",
    year: "2023",
    tags: ["Mobile", "Product"],
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
  },
  {
    slug: "parsec-mobile-os",
    title: "Internal Tools Suite",
    client: "CorpWare",
    year: "2023",
    tags: ["Product"],
    image:
      "https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?w=800&q=80",
  },
];

export function getWorkSlugs(): string[] {
  return works.map((w) => w.slug);
}

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}
