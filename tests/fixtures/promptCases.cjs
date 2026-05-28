const coreRegressionCases = require("./coreRegressionCases.cjs");
const candidateExpansionCases = require("./candidateExpansionCases.cjs");

const DOMAIN_PACK_BY_DOMAIN = {
  marketing_strategy: "gtm_marketing",
  product_planning: "product_pm",
  writing_email: "sales_bd",
  personal_prioritization: "internal_ops",
  research: "founder_strategy",
  generic: "generic"
};

const DOMAIN_PACK_BY_ARTIFACT = {
  job_posting: "hr_recruiting",
  meeting_agenda: "internal_ops",
  question_set: "content_education",
  presentation_outline: "content_education",
  curriculum: "content_education",
  manual_or_playbook: "customer_support",
  onboarding_doc: "internal_ops",
  content_plan: "content_education",
  blog_outline: "content_education",
  survey_questions: "content_education",
  retrospective_questions: "internal_ops",
  handoff_doc: "internal_ops",
  complaint_reply: "customer_support",
  proposal_outline: "sales_bd",
  generic_document: "generic",
  generic_outline: "generic"
};

const DOMAIN_PACK_BY_NAME_PATTERN = [
  [/marketing|campaign|conversion/i, "gtm_marketing"],
  [/prd|feature/i, "product_pm"],
  [/investor|proposal/i, "sales_bd"],
  [/price increase|complaint|cs response|manual/i, "customer_support"],
  [/job posting|hiring|recruit/i, "hr_recruiting"],
  [/interview|presentation|lecture|curriculum|youtube|blog|survey/i, "content_education"],
  [/meeting|priority|prioritization|handoff|onboarding|retrospective/i, "internal_ops"],
  [/competitor|market|trend|research/i, "founder_strategy"]
];

function inferDomainPack(caseItem) {
  if (caseItem.domainPack) {
    return caseItem.domainPack;
  }

  if (caseItem.expectedArtifactType) {
    const artifactTypes = Array.isArray(caseItem.expectedArtifactType)
      ? caseItem.expectedArtifactType
      : [caseItem.expectedArtifactType];
    for (const artifactType of artifactTypes) {
      if (DOMAIN_PACK_BY_ARTIFACT[artifactType]) {
        return DOMAIN_PACK_BY_ARTIFACT[artifactType];
      }
    }
  }

  for (const [pattern, domainPack] of DOMAIN_PACK_BY_NAME_PATTERN) {
    if (pattern.test(caseItem.name || "")) {
      return domainPack;
    }
  }

  return DOMAIN_PACK_BY_DOMAIN[caseItem.expectedDomain] || "generic";
}

function inferClarificationMode(caseItem, shouldShowClarify) {
  if (caseItem.clarificationMode) {
    return caseItem.clarificationMode;
  }

  if (shouldShowClarify === false) {
    return "suppress";
  }

  if (caseItem.notes && String(caseItem.notes).includes("free text")) {
    return "needs_free_text";
  }

  return "multiple_choice";
}

function normalizeCase(caseItem, caseSource) {
  const expectedShouldShowClarify = caseItem.expectedShouldShowClarify ?? caseItem.shouldShowClarify;

  return {
    domainPack: inferDomainPack(caseItem),
    clarificationMode: inferClarificationMode(caseItem, expectedShouldShowClarify),
    expectedShouldShowClarify,
    caseSource,
    notes: caseItem.notes || "",
    ...caseItem,
    shouldShowClarify: expectedShouldShowClarify,
    expectedShouldShowClarify
  };
}

const core = coreRegressionCases.map((caseItem) => normalizeCase(caseItem, "core"));
const candidates = candidateExpansionCases.map((caseItem) => normalizeCase(caseItem, "candidate"));

const promptCases = process.env.INCLUDE_CANDIDATES === "1" ? core.concat(candidates) : core;

module.exports = promptCases;
module.exports.coreRegressionCases = core;
module.exports.candidateExpansionCases = candidates;
