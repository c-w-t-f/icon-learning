import { programCategoryMap } from "../programs";
import type { Course } from "./schema";

const courseModules = import.meta.glob("./*.json", {
  eager: true,
  import: "default",
}) as Record<string, Course>;

export const courses = Object.values(courseModules).sort((a, b) =>
  a.title.localeCompare(b.title, "en", { sensitivity: "base" })
);

export const coursesByCategory = courses.reduce<Record<string, Course[]>>((groups, course) => {
  groups[course.categorySlug] ??= [];
  groups[course.categorySlug].push(course);
  return groups;
}, {});

export function courseUrl(course: Course) {
  return `/programs/${course.categorySlug}/${course.slug}`;
}

export function courseSearchText(course: Course) {
  return [
    course.title,
    course.subtitle,
    course.categorySlug,
    programCategoryMap.get(course.categorySlug)?.title,
    course.whyThisMatters,
    ...course.builtFor,
    ...course.walkAwayWith,
    ...course.modules.map((module) => module.title),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}
