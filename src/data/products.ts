export type Roast = "Light" | "Medium" | "Dark";
export type Category = "All" | "Light" | "Medium" | "Dark" | "Blend";

export interface Product {
  id: string;
  name: string;
  origin: string;
  region: string;
  process: string;
  roast: Roast;
  kind: "Single Origin" | "Blend";
  price: number;
  weight: string;
  score: number | null;
  altitude: string;
  varietal: string;
  notes: string[];
  description: string;
  image: string;
  accent: string;
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "sunpath",
    name: "Sunpath",
    origin: "Ethiopia",
    region: "Yirgacheffe · Gedeb",
    process: "Washed",
    roast: "Light",
    kind: "Single Origin",
    price: 19.5,
    weight: "250 g",
    score: 89.5,
    altitude: "1,950 – 2,200 masl",
    varietal: "Ethiopian heirloom",
    notes: ["Jasmine", "Bergamot", "Apricot jam"],
    description:
      "A washed heirloom lot from the Gedeb highlands that opens like a bouquet — jasmine and bergamot up front, then a long, silky finish of apricot jam. Our brightest cup of the season, and the one we argue over at the cupping table.",
    image: "https://image.qwenlm.ai/generated-images/221661ba-75cc-4d4e-af66-353d89c72f30/_result.png",
    accent: "#e8a860",
    badge: "Roaster's pick",
  },
  {
    id: "rio-rojo",
    name: "Río Rojo",
    origin: "Colombia",
    region: "Huila · San Agustín",
    process: "Washed",
    roast: "Medium",
    kind: "Single Origin",
    price: 17.5,
    weight: "250 g",
    score: 88.2,
    altitude: "1,600 – 1,800 masl",
    varietal: "Caturra & Castillo",
    notes: ["Caramel", "Red apple", "Panela"],
    description:
      "Grown by the Trujillo family on volcanic slopes above the Magdalena river. Sweet and round — a caramel body, red-apple acidity, and a lingering raw-cane finish. The kind of coffee you brew twice in a row.",
    image: "https://image.qwenlm.ai/generated-images/42156d90-f201-4017-bba4-2770a186dc5b/_result.png",
    accent: "#cf6b44",
  },
  {
    id: "blackcurrant-hill",
    name: "Blackcurrant Hill",
    origin: "Kenya",
    region: "Nyeri AA · Aberdares",
    process: "Washed · double-fermented",
    roast: "Light",
    kind: "Single Origin",
    price: 21.0,
    weight: "250 g",
    score: 90.1,
    altitude: "1,750 – 1,900 masl",
    varietal: "SL28 · SL34",
    notes: ["Blackcurrant", "Grapefruit", "Demerara"],
    description:
      "A double-fermented AA outturn from a single washing station on the slopes of the Aberdares. Electric, juicy acidity — blackcurrant and pink grapefruit riding on demerara sweetness. Buy two bags; you'll thank yourself.",
    image: "https://image.qwenlm.ai/generated-images/83e467de-31ed-4d2b-81cd-7105ca079b03/_result.png",
    accent: "#c8a24e",
    badge: "90+ lot",
  },
  {
    id: "terra-firma",
    name: "Terra Firma",
    origin: "Brazil",
    region: "Cerrado · Patrocínio",
    process: "Natural",
    roast: "Dark",
    kind: "Single Origin",
    price: 15.5,
    weight: "250 g",
    score: 85.8,
    altitude: "1,100 – 1,250 masl",
    varietal: "Mundo Novo",
    notes: ["Cocoa", "Hazelnut", "Molasses"],
    description:
      "A natural-dried lot roasted low and slow into our darkest single origin. Heavy body with zero bitterness — cocoa nib, toasted hazelnut, and a molasses sweetness built to stand up to milk.",
    image: "https://image.qwenlm.ai/generated-images/3e466fca-5d3f-4eb7-a90d-1f3707badd22/_result.png",
    accent: "#d98e4a",
  },
  {
    id: "volcan",
    name: "Volcán",
    origin: "Guatemala",
    region: "Antigua Valley",
    process: "Washed",
    roast: "Medium",
    kind: "Single Origin",
    price: 18.0,
    weight: "250 g",
    score: 87.6,
    altitude: "1,550 – 1,700 masl",
    varietal: "Bourbon",
    notes: ["Toffee", "Orange zest", "Soft smoke"],
    description:
      "From a smallholder cooperative in the shadow of Volcán de Fuego. Classic Antigua depth — buttery toffee, a flicker of orange zest, and the faint woodsmoke that volcanic-soil Bourbons seem to carry in their bones.",
    image: "https://image.qwenlm.ai/generated-images/cae0d20f-bc6e-422e-9753-680d06570874/_result.png",
    accent: "#96a678",
  },
  {
    id: "night-shift",
    name: "Night Shift",
    origin: "House blend",
    region: "Brazil + Ethiopia",
    process: "Natural + washed",
    roast: "Dark",
    kind: "Blend",
    price: 16.5,
    weight: "250 g",
    score: null,
    altitude: "Two origins, one recipe",
    varietal: "Seasonal",
    notes: ["Dark chocolate", "Fig", "Malted barley"],
    description:
      "Our after-dark espresso: natural Brazil for chocolate and body, washed Ethiopia for fig sweetness and lift. Tuned to cut through milk and still sing in a cortado — the bag that never leaves the hopper.",
    image: "https://image.qwenlm.ai/generated-images/e4924f9a-4f57-45d7-81d2-4b6a05497f64/_result.png",
    accent: "#8b93b8",
    badge: "Espresso",
  },
];

export const CATEGORIES: Category[] = ["All", "Light", "Medium", "Dark", "Blend"];

export const GRINDS = ["Whole bean", "Filter", "Espresso"] as const;
export type Grind = (typeof GRINDS)[number];

export const FREE_SHIPPING_AT = 40;
export const SHIPPING_FEE = 6.5;

export const fmt = (n: number) => `$${n.toFixed(2)}`;
