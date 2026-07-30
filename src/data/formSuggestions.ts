export const formTemplates = [
  {
    keywords: ["feedback", "review", "rating"],
    description: "Help us improve by sharing your feedback.",
    fields: [
      { type: "rating", label: "Rating" },
      { type: "textarea", label: "Feedback" },
      { type: "email", label: "Email" },
      { type: "text", label: "Name" },
    ],
  },

  {
    keywords: ["contact", "support"],
    description: "Get in touch with us.",
    fields: [
      { type: "text", label: "Name" },
      { type: "email", label: "Email" },
      { type: "phone", label: "Phone" },
      { type: "textarea", label: "Message" },
    ],
  },

  {
    keywords: ["job", "career", "application"],
    description: "Apply by filling out your details.",
    fields: [
      { type: "text", label: "Full Name" },
      { type: "email", label: "Email" },
      { type: "phone", label: "Phone" },
      { type: "file", label: "Resume" },
    ],
  },
];