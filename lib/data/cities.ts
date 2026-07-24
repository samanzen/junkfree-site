// The 22 service areas, in sitemap order. slug must match the live URLs exactly.
export type City = { slug: string; name: string };

export const CITIES: City[] = [
  { slug: "vancouver", name: "Vancouver" },
  { slug: "burnaby", name: "Burnaby" },
  { slug: "richmond", name: "Richmond" },
  { slug: "surrey", name: "Surrey" },
  { slug: "coquitlam", name: "Coquitlam" },
  { slug: "north-vancouver", name: "North Vancouver" },
  { slug: "west-vancouver", name: "West Vancouver" },
  { slug: "new-westminster", name: "New Westminster" },
  { slug: "langley", name: "Langley" },
  { slug: "maple-ridge", name: "Maple Ridge" },
  { slug: "port-moody", name: "Port Moody" },
  { slug: "port-coquitlam", name: "Port Coquitlam" },
  { slug: "abbotsford", name: "Abbotsford" },
  { slug: "delta", name: "Delta" },
  { slug: "ladner", name: "Ladner" },
  { slug: "pitt-meadows", name: "Pitt Meadows" },
  { slug: "white-rock", name: "White Rock" },
  { slug: "downtown-vancouver", name: "Downtown Vancouver" },
  { slug: "east-vancouver", name: "East Vancouver" },
  { slug: "west-side-vancouver", name: "West Side Vancouver" },
  { slug: "mission", name: "Mission" },
  { slug: "fraser-valley", name: "Fraser Valley" },
];
