// Blog posts, slugs exactly as in the sitemap. Titles derived from slugs;
// bodies are filled by the agent (content table) or the default template.
export type Post = { slug: string; title: string };

export const POSTS: Post[] = [
  { slug: "complete-guide-junk-removal-vancouver", title: "The Complete Guide to Junk Removal in Vancouver" },
  { slug: "how-to-prepare-your-home-for-junk-removal", title: "How to Prepare Your Home for Junk Removal" },
  { slug: "benefits-of-eco-friendly-junk-removal", title: "The Benefits of Eco-Friendly Junk Removal" },
  { slug: "junk-removal-survey-2024", title: "Junk Removal Survey 2024" },
  { slug: "mattress-removal-service", title: "Mattress Removal Service in Greater Vancouver" },
  { slug: "cheap-junk-removal-affordable-solutions", title: "Cheap Junk Removal: Affordable Solutions" },
  { slug: "vancouver-rubbish-removal", title: "Vancouver Rubbish Removal" },
  { slug: "burnaby-junk-removal", title: "Burnaby Junk Removal" },
  { slug: "furniture-disposal-vancouver", title: "Furniture Disposal in Vancouver" },
  { slug: "north-vancouver-junk-removal", title: "North Vancouver Junk Removal" },
  { slug: "junk-removal-burnaby", title: "Junk Removal in Burnaby" },
  { slug: "vancouver-bc-junk-removal", title: "Vancouver BC Junk Removal" },
  { slug: "large-item-pickup-vancouver", title: "Large Item Pickup in Vancouver" },
  { slug: "waste-removal-vancouver", title: "Waste Removal in Vancouver" },
  { slug: "vancouver-appliance-disposal", title: "Vancouver Appliance Disposal" },
  { slug: "vancouver-junk-disposal", title: "Vancouver Junk Disposal" },
];
