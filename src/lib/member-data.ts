// Mock data for the prototype. Replace with real API calls once the backend exists.

export const member = {
  firstName: "Emily",
  lastName: "Carter",
  id: "SAC-204817",
  email: "emily.carter@example.com",
  plan: "Monthly Membership",
  monthlyFee: 9.99,
  status: "Active",
  memberSince: "14 Mar 2025",
};

export const practice = {
  name: "Riverside Dental Care",
  address: ["42 High Street", "Kingston upon Thames", "KT1 1LQ"],
  phone: "020 7946 0321",
};

export const practiceMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${practice.name}, ${practice.address.join(", ")}`,
)}`;

export type PaymentStatus = "Paid" | "Refunded" | "Cashback";

export type Payment = {
  id: string;
  date: string;
  description: string;
  method: string;
  amount: number;
  status: PaymentStatus;
  // Average private fee for the same treatment (smileaccessclub.co.uk/pricing), used for the "Without smileaccessclub" total.
  privateFee?: number;
};

export const payments: Payment[] = [
  { id: "p10", date: "14 Oct 2026", description: "Monthly membership", method: "Visa •• 4821", amount: 9.99, status: "Paid" },
  { id: "p9", date: "02 Oct 2026", description: "Referral cashback", method: "Account credit", amount: -10, status: "Cashback" },
  { id: "p8", date: "14 Sep 2026", description: "Monthly membership", method: "Visa •• 4821", amount: 9.99, status: "Paid" },
  { id: "p7", date: "28 Aug 2026", description: "Filling (member price)", method: "Visa •• 4821", amount: 80, status: "Paid", privateFee: 150 },
  { id: "p6", date: "14 Aug 2026", description: "Monthly membership", method: "Visa •• 4821", amount: 9.99, status: "Paid" },
  { id: "p5", date: "19 Jul 2026", description: "Hygiene appointment", method: "Visa •• 4821", amount: 50, status: "Paid", privateFee: 70 },
  { id: "p4", date: "14 Jul 2026", description: "Monthly membership", method: "Visa •• 4821", amount: 9.99, status: "Paid" },
  { id: "p3", date: "03 Jul 2026", description: "Referral cashback", method: "Account credit", amount: -10, status: "Cashback" },
  { id: "p2", date: "14 Jun 2026", description: "Monthly membership", method: "Visa •• 4821", amount: 9.99, status: "Paid" },
  { id: "p1", date: "06 Jun 2026", description: "Check-up incl. X-rays", method: "Visa •• 4821", amount: 30, status: "Paid", privateFee: 80 },
];

export const referral = {
  code: "EMILY10",
  link: "https://www.smileaccessclub.co.uk/join?ref=EMILY10",
  rewardPerReferral: 10,
  joined: 2,
};

export const videos = [
  { id: "ccdWikClrFM", title: "How to brush your teeth correctly", channel: "Dr. Derik, RDH" },
  { id: "PDFHQKVIJpo", title: "How to properly floss your teeth", channel: "Teeth Talk Girl" },
  { id: "JryVlJTX9ok", title: "Understanding gum disease", channel: "Colgate UK" },
];

export const formatGBP = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
