// Service definitions drive both the service landing pages and the
// service × city local pages. `slug` is the prefix used in flat URLs like
// `/furniture-removal` and `/furniture-removal-vancouver`.

export type Service = {
  slug: string; // URL prefix, matches sitemap
  name: string; // display name
  blurb: string; // one-line description
  items: string[]; // what this covers (for content + schema)
};

// The 9 services that each get 22 city pages (198 total).
export const SERVICES: Service[] = [
  { slug: "furniture-removal", name: "Furniture Removal", blurb: "Couches, mattresses, tables, and bulky furniture hauled away same or next day.", items: ["Sofas & sectionals", "Mattresses & box springs", "Tables & desks", "Dressers & cabinets"] },
  { slug: "appliance-removal", name: "Appliance Removal", blurb: "Old fridges, washers, dryers, and stoves removed and recycled responsibly.", items: ["Refrigerators & freezers", "Washers & dryers", "Stoves & ovens", "Dishwashers"] },
  { slug: "electronics-recycling", name: "Electronics & Scrap Metal Recycling", blurb: "E-waste and scrap metal collected and diverted from the landfill.", items: ["TVs & monitors", "Computers & printers", "Cables & small electronics", "Scrap metal"] },
  { slug: "renovation-debris", name: "Renovation Debris & Construction Waste", blurb: "Drywall, wood, flooring, and reno debris cleared from your site.", items: ["Drywall & lumber", "Flooring & tile", "Fixtures & cabinetry", "General construction waste"] },
  { slug: "yard-waste", name: "Yard Waste & Garden Removal", blurb: "Branches, soil, sod, and green waste removed and composted.", items: ["Branches & brush", "Soil & sod", "Leaves & clippings", "Old fencing & planters"] },
  { slug: "garage-cleanout", name: "Garage & Basement Cleanout", blurb: "Full garage and basement clearouts, sorted and hauled in one visit.", items: ["Boxes & clutter", "Old tools & equipment", "Storage overflow", "Mixed junk"] },
  { slug: "estate-downsizing", name: "Estate & Downsizing", blurb: "Compassionate, full-property clearouts for estates and downsizing moves.", items: ["Whole-home clearouts", "Donation sorting", "Furniture & belongings", "Discreet, respectful service"] },
  { slug: "commercial-cleanout", name: "Commercial Cleanout & Office Waste", blurb: "Office furniture, fixtures, and commercial junk removed with minimal disruption.", items: ["Office furniture", "Retail fixtures", "Warehouse clearouts", "Ongoing commercial pickup"] },
  { slug: "demolition-removal", name: "Demolition & Structural Removal", blurb: "Interior demo and structural teardown with full debris haul-away.", items: ["Interior demolition", "Deck & shed teardown", "Concrete & structural", "Full debris removal"] },
];

// The 4 top-level service detail pages under /services/*.
export const SERVICE_DETAILS: Service[] = [
  { slug: "residential-junk-removal", name: "Residential Junk Removal", blurb: "Fast, friendly junk removal for homes across Greater Vancouver.", items: ["Single items to full homes", "Same/next-day service", "We do the lifting", "Eco-friendly disposal"] },
  { slug: "commercial-waste-management", name: "Commercial Waste Management", blurb: "Reliable waste removal for offices, retail, and job sites.", items: ["Scheduled or on-call", "Office & retail", "Construction sites", "Invoiced billing"] },
  { slug: "demolition-services", name: "Demolition Services", blurb: "Licensed interior demolition and structural removal.", items: ["Interior demo", "Structural teardown", "Debris haul-away", "Permitted work"] },
  { slug: "recycling-donation-services", name: "Recycling & Donation Services", blurb: "We divert everything we can to recycling and local charities.", items: ["Charity donation", "Metal & e-waste recycling", "Green waste composting", "Landfill diversion reporting"] },
];

// Static informational pages (custom content).
export const INFO_PAGES = ["what-we-remove", "faq", "why-junk-free", "cities", "contact"] as const;
