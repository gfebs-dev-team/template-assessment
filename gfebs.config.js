export default {
  type: "assessment",
  data: {
    course: {
      code: "C123", //Remove if unavailable
      title: "Course Title",
      topic: "Post Assessment",
    },
    general: {
      language: "en",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tristique augue nec pretium commodo. Cras lorem nisl, convallis ac condimentum et, elementum at sapien. Ut tincidunt porttitor placerat.",
      keywords: ["lorem", "ipsum", "dolor", "sit", "amet"],
      aggregation_level: "2",
    },
    assessment: {
      passing_score: "0.8", // CHANGE THIS FOR PRE-TEST
    },
    lifecycle: {
      version: 1.0,
      status: "final",
      contribute: {
        entity:
          "BEGIN:VCARD\n\t\tFN:GFEBS E-Learning Team\n\t\tORG: Aretum/Eagle Harbor\n\t\tEND:VCARD",
        date: "2023-01-25",
      },
    },
    technical: {
      format: ["text/html", "text/js"],
    },
    classifications: [
      {
        value: "discipline",
        description: "None",
        keyword: "none",
      },
      {
        value: "educational objective",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tristique augue nec pretium commodo. Cras lorem nisl, convallis ac condimentum et, elementum at sapien. Ut tincidunt porttitor placerat. Maecenas accumsan arcu vel magna posuere, finibus scelerisque mi dignissim. Nam elementum tortor est, et placerat lacus imperdiet et. Suspendisse malesuada metus nec turpis gravida, nec placerat nisl bibendum. Aliquam erat volutpat.",
        keyword: "lorem",
      },
      {
        value: "educational objective",
        description: "Level 01",
        keyword: "Level 01",
      },
      {
        value: "accessibility restrictions",
        description: "508 Compliant",
        keyword: "508",
      },
      {
        value: "security level",
        description: "FD1",
        keyword: "FD1",
      },
    ],
  },
};
