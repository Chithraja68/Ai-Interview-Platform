// Role-specific question pools. These power the app's offline mode so it
// works fully out of the box. See src/services/aiService.js for how to
// swap these out for live, Claude-generated questions via a backend.

export const QUESTION_BANK = {
  swe: [
    "Walk me through a system you designed or significantly modified. What trade-offs did you make?",
    "Tell me about the most difficult bug you've tracked down. How did you isolate it?",
    "How do you decide when code needs a test versus when it's safe to ship without one?",
    "Describe a time you pushed back on a technical decision. What happened?",
    "How would you explain a complex technical concept to a non-technical stakeholder?",
    "Tell me about a time a quick fix turned into a much bigger problem.",
  ],
  pm: [
    "Walk me through how you prioritized a roadmap when every stakeholder thought their feature was P0.",
    "Tell me about a launch that didn't go the way you expected. What did you do next?",
    "How do you decide what *not* to build?",
    "Describe a time data and your gut disagreed. Which did you trust, and why?",
    "How do you handle an engineering team that thinks a deadline is unrealistic?",
    "Tell me about a feature you killed after it shipped. What told you it wasn't working?",
  ],
  ds: [
    "Walk me through a model you built end-to-end — from problem framing to the metric that mattered.",
    "Tell me about a time your analysis contradicted what the business wanted to hear.",
    "How do you decide a model is 'good enough' to ship?",
    "Describe a dataset that gave you trouble. What was wrong with it, and how did you handle it?",
    "How would you explain overfitting to someone outside data science?",
    "Tell me about a time a stakeholder misread your results. How did you correct course?",
  ],
  ux: [
    "Walk me through a design you shipped that you'd do differently today.",
    "Tell me about a time user research changed your direction mid-project.",
    "How do you handle a stakeholder who wants to skip research and 'just ship it'?",
    "Describe how you balance accessibility with a tight deadline.",
    "Walk me through how you'd critique a design you didn't make.",
    "Tell me about a time you had to say no to a feature request, design-wise.",
  ],
  mkt: [
    "Walk me through a campaign you ran end-to-end. What was the result, and what would you change?",
    "Tell me about a time messaging you believed in didn't perform. What did you do?",
    "How do you decide which channel deserves the next dollar of budget?",
    "Describe how you've used data to kill a campaign you personally liked.",
    "How do you keep brand voice consistent across a growing team?",
    "Tell me about a time you had to defend a creative choice with numbers.",
  ],
};

// Generic behavioral questions used to round out every session.
// {role} is replaced with the selected role's label at runtime.
export const GENERIC_QUESTIONS = [
  "Tell me about a {role} project you're especially proud of, and the impact it had.",
  "Describe a time you disagreed with a teammate or manager. How did you handle it?",
  "Walk me through how you'd approach a {role} problem you've never seen before.",
  "Tell me about a time you had to learn something quickly under pressure.",
  "Where do you want to be in three years, and why does this role get you there?",
  "Tell me about a mistake you made in a {role} role and what you changed afterward.",
];
