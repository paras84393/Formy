import { formTemplates } from "@/data/formSuggestions";

export const getFormSuggestion = (title: string) => {
  const lower = title.toLowerCase();

  return formTemplates.find((item) =>
    item.keywords.some((keyword) => lower.includes(keyword))
  );
};