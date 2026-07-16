export type MenuItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  popular?: boolean;
  available?: boolean;
  image: string;
};
export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  size: string;
  spice: string;
  sauce: string;
  notes: string;
};
export type DemoOrder = {
  id: string;
  channel: "Delivery" | "Pickup" | "Table QR";
  customer: string;
  table?: number;
  items: CartItem[];
  total: number;
  payment: "Unpaid" | "Pending" | "Paid" | "Failed" | "Refunded";
  paymentMethod?: string;
  status:
    "New" | "Confirmed" | "Preparing" | "Ready" | "Out for delivery" | "Completed" | "Cancelled";
  time: string;
  internalNote?: string;
};
export type ServiceRequest = {
  id: string;
  table: number;
  type: "Call Staff" | "Request Water" | "Request Cutlery" | "Request the Bill";
  time: string;
  status: "New" | "Acknowledged" | "Completed";
};
export const categories = [
  "Seafood Boils",
  "Crab",
  "Shrimp",
  "Lobster",
  "Mussels",
  "Combo Sets",
  "Fried Dishes",
  "Side Dishes",
  "Drinks",
  "Desserts",
];
const image = "/images/seafood-feast.png";
const row = (
  id: string,
  name: string,
  category: string,
  description: string,
  price: number,
  popular = false,
): MenuItem => ({ id, name, category, description, price, popular, available: true, image });
export const menuItems: MenuItem[] = [
  row(
    "signature",
    "The Boiling Signature",
    "Seafood Boils",
    "Lobster, snow crab, shrimp, mussels, corn and potato.",
    58,
    true,
  ),
  row(
    "cajun-pot",
    "Cajun Shrimp Pot",
    "Seafood Boils",
    "Head-on shrimp, smoky Cajun sauce, corn and potato.",
    24,
    true,
  ),
  row(
    "king-crab",
    "Garlic Butter King Crab",
    "Crab",
    "Wild-caught legs roasted in garlic butter.",
    42,
    true,
  ),
  row("snow-crab", "Snow Crab Cluster", "Crab", "Sweet crab, lemon pepper butter and herbs.", 34),
  row(
    "tiger-shrimp",
    "Blackened Tiger Prawns",
    "Shrimp",
    "Cajun rice, charred lime and herb butter.",
    20,
  ),
  row(
    "shrimp-basket",
    "Crispy Shrimp Basket",
    "Shrimp",
    "Golden shrimp, fries and smoked aioli.",
    15,
  ),
  row(
    "lobster-tail",
    "Charred Lobster Tail",
    "Lobster",
    "Herb butter, grilled lemon and sea salt.",
    28,
    true,
  ),
  row(
    "lobster-roll",
    "Butter Lobster Roll",
    "Lobster",
    "Toasted brioche, celery and lemon mayo.",
    19,
  ),
  row(
    "ocean-mussels",
    "Ocean Mussels",
    "Mussels",
    "White wine, garlic, parsley and sourdough.",
    18,
  ),
  row(
    "cajun-mussels",
    "Cajun Mussel Pot",
    "Mussels",
    "Mussels in our medium-spice Boiling Mix.",
    17,
  ),
  row(
    "family-feast",
    "Family Ocean Feast",
    "Combo Sets",
    "King crab, lobster, prawns and mussels for four.",
    89,
    true,
  ),
  row(
    "date-night",
    "Date Night Combo",
    "Combo Sets",
    "Two lobster tails, shrimp, sides and drinks.",
    55,
  ),
  row("calamari", "Crispy Calamari", "Fried Dishes", "Chili, lime and smoked pepper aioli.", 14),
  row(
    "fish-chips",
    "Cajun Fish & Chips",
    "Fried Dishes",
    "Crisp white fish, seasoned fries and tartare.",
    16,
  ),
  row("corn", "Butter Corn", "Side Dishes", "Sweet corn tossed in garlic butter.", 4),
  row("fries", "Cajun Fries", "Side Dishes", "Crispy fries with house Cajun seasoning.", 5),
  row("rice", "Garlic Rice", "Side Dishes", "Jasmine rice, roasted garlic and spring onion.", 3.5),
  row("lime-soda", "Salted Lime Soda", "Drinks", "Fresh lime, soda and a touch of sea salt.", 3.5),
  row("iced-tea", "Passionfruit Iced Tea", "Drinks", "House tea, passionfruit and citrus.", 4),
  row("cheesecake", "Mango Cheesecake", "Desserts", "Creamy cheesecake with local mango.", 7),
  row(
    "brownie",
    "Warm Chocolate Brownie",
    "Desserts",
    "Dark chocolate, vanilla ice cream and caramel.",
    7.5,
  ),
];
export const seedOrders: DemoOrder[] = Array.from({ length: 10 }, (_, i) => ({
  id: `TBS-2607${16 - i}${String(i + 1).padStart(2, "0")}`,
  channel: (i % 3 === 0 ? "Table QR" : i % 3 === 1 ? "Delivery" : "Pickup") as DemoOrder["channel"],
  customer: i % 3 === 0 ? `Table ${i + 1}` : ["Sophea", "Dara", "Maly", "Vannak"][i % 4],
  table: i % 3 === 0 ? i + 1 : undefined,
  items: [
    {
      id: "signature",
      name: "The Boiling Signature",
      price: 58,
      qty: 1,
      size: "Regular",
      spice: "Medium",
      sauce: "Boiling Mix",
      notes: "",
    },
  ],
  total: 58 + (i % 3) * 2,
  payment: i % 4 === 0 ? "Pending" : "Paid",
  status: ["New", "Preparing", "Ready", "Completed"][i % 4] as DemoOrder["status"],
  time: `${11 + i}:1${i}`,
}));
export const seedServiceRequests: ServiceRequest[] = [
  { id: "SR-1001", table: 3, type: "Request Water", time: "12:14", status: "New" },
  { id: "SR-1002", table: 8, type: "Request Cutlery", time: "12:18", status: "Acknowledged" },
  { id: "SR-1003", table: 5, type: "Request the Bill", time: "12:25", status: "New" },
];
