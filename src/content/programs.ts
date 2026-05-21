import type { CourseCategorySlug, CourseLanguage } from "./courses/schema";

export type ProgramCategory = {
  slug: CourseCategorySlug;
  title: string;
  shortTitle: string;
  summary: string;
};

export const programCategories: ProgramCategory[] = [
  {
    slug: "leadership-management-coaching",
    title: "Leadership, Management & Coaching",
    shortTitle: "Leadership",
    summary: "Build sharper supervisors, managers, and leaders through practical people-management habits.",
  },
  {
    slug: "quality-lean-food-safety",
    title: "Quality, Lean & Food Safety",
    shortTitle: "Quality",
    summary: "Strengthen systems, audits, food safety, and continuous improvement across operations.",
  },
  {
    slug: "safety-health-environment",
    title: "Safety, Health & Environment",
    shortTitle: "Safety",
    summary: "Support safer workplaces with OSH, HIRARC, waste, fire, and emergency readiness.",
  },
  {
    slug: "hr-employment-law",
    title: "HR & Employment Law",
    shortTitle: "HR",
    summary: "Help managers and HR teams handle compliance, discipline, payroll, and workplace policy.",
  },
  {
    slug: "microsoft-ai-digital-skills",
    title: "Microsoft, AI & Digital Skills",
    shortTitle: "Digital",
    summary: "Upgrade everyday productivity with Excel, Power BI, AI, and cyber awareness.",
  },
  {
    slug: "sales-marketing-customer-service",
    title: "Sales, Marketing & Customer Service",
    shortTitle: "Sales",
    summary: "Improve selling, service conversations, retail performance, and digital marketing execution.",
  },
  {
    slug: "finance-taxation",
    title: "Finance & Taxation",
    shortTitle: "Finance",
    summary: "Give non-finance teams the confidence to read numbers and make better business decisions.",
  },
  {
    slug: "supply-chain-shipping-warehousing",
    title: "Supply Chain, Shipping & Warehousing",
    shortTitle: "Supply chain",
    summary: "Sharpen the practical skills behind procurement, shipping, inventory, and warehouse control.",
  },
  {
    slug: "communication-personal-effectiveness",
    title: "Communication & Personal Effectiveness",
    shortTitle: "Communication",
    summary: "Improve the everyday habits behind clearer communication, teamwork, and personal productivity.",
  },
];

export const programCategoryMap = new Map(programCategories.map((category) => [category.slug, category]));

export const durationFilters = [
  { value: "all", label: "All durations" },
  { value: "0.5", label: "1/2 day" },
  { value: "1", label: "1 day" },
  { value: "2", label: "2 days" },
  { value: "3", label: "3 days" },
] as const;

export const languageFilters: Array<{ value: "all" | CourseLanguage; label: string }> = [
  { value: "all", label: "All languages" },
  { value: "en", label: "English" },
  { value: "ms", label: "Bahasa Malaysia" },
  { value: "en+ms", label: "English + BM" },
];

export function formatDuration(days: number) {
  if (days === 0.5) return "1/2 day";
  if (days === 1) return "1 day";
  return `${days} days`;
}

export function formatLanguage(language: CourseLanguage) {
  if (language === "ms") return "Bahasa Malaysia";
  if (language === "en+ms") return "English + BM";
  return "English";
}
