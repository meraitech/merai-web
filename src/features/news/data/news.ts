export interface NewsPost {
  slug: string;
  image: string;
}

export const newsPosts: NewsPost[] = [
  {
    slug: "ship-mvp-in-weeks",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    slug: "why-nextjs",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
  },
  {
    slug: "design-systems-that-scale",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
];

export function getNewsSlugs(): string[] {
  return newsPosts.map((post) => post.slug);
}

export function getNewsPost(slug: string): NewsPost | undefined {
  return newsPosts.find((post) => post.slug === slug);
}
