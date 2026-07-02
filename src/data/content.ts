export const profile = {
  name: "Hassan Raza",
  title: "Manual QA / SQA Engineer",
  roles: [
    "Manual QA Engineer",
    "Software Quality Analyst",
    "API Tester",
    "Bug Hunter",
    "Quality Guardian",
  ],
  summary:
    "Detail-oriented Manual QA engineer with 1+ year of experience delivering high-quality web and mobile applications. Skilled in API testing using Swagger, Postman, Insomnia, TestRail, Jira, and Asana.",
  email: "qa.hassanraza@gmail.com",
  phone: "+92 302 0533331",
  location: "Lahore, Pakistan",
  linkedin: "linkedin.com/in/hassanrazaqa",
  education: {
    degree: "Bachelor of Computer Science",
    school: "Lahore Garrison University",
  },
};

export const stats = [
  { label: "Projects Tested", value: 20, suffix: "+" },
  { label: "Bug Reports", value: 500, suffix: "+" },
  { label: "Test Cases", value: 1000, suffix: "+" },
  { label: "APIs Tested", value: 200, suffix: "+" },
];

export const experience = [
  {
    company: "FoliumAI",
    role: "Junior SQA Engineer",
    duration: "Feb 2025 — Present",
    current: true,
    projects: ["Foster Ferret", "WZRD Pro", "SeedFunds", "ShareMundo"],
    responsibilities: [
      "Functional Testing",
      "Regression Testing",
      "Integration Testing",
      "API Testing",
      "Documentation",
      "Jira",
      "User Flows",
    ],
  },
  {
    company: "Kreatorz.co",
    role: "QA Engineer",
    duration: "Sep 2024 — Jan 2025",
    current: false,
    projects: ["Ride Share App", "Attendance Management System", "Ryvato iOS"],
    responsibilities: [
      "Manual Testing",
      "Cross Browser Testing",
      "Bug Reporting",
      "Exploratory Testing",
    ],
  },
];

export const skillGroups = [
  {
    title: "Core Testing",
    skills: ["Manual Testing", "Functional Testing", "Regression Testing", "Integration Testing", "System Testing", "Exploratory Testing"],
  },
  {
    title: "API & Tools",
    skills: ["API Testing", "Postman", "Swagger", "Insomnia", "TestRail"],
  },
  {
    title: "Process & Reporting",
    skills: ["Jira", "Asana", "Bug Reporting", "Documentation", "Requirement Analysis", "Root Cause Analysis", "Release Validation"],
  },
  {
    title: "Coverage",
    skills: ["UI Testing", "Cross Browser Testing", "Responsive Testing"],
  },
];

export const tools = [
  { name: "Postman", color: "#FF6C37" },
  { name: "Swagger", color: "#85EA2D" },
  { name: "Insomnia", color: "#4000BF" },
  { name: "Jira", color: "#0052CC" },
  { name: "Asana", color: "#F06A6A" },
  { name: "TestRail", color: "#5C4EE5" },
];

export type Project = {
  name: string;
  tag: string;
  overview: string;
  responsibilities: string[];
  testingTypes: string[];
  tools: string[];
  challenges: string;
  impact: string;
  color: string;
};

export const projects: Project[] = [
  {
    name: "Foster Ferret",
    tag: "Pet Fostering Platform",
    overview:
      "A platform connecting foster homes with pets in need, covering listings, applications, and messaging between fosters and shelters.",
    responsibilities: ["Wrote and executed test cases", "Validated user flows end-to-end", "Logged and tracked defects in Jira"],
    testingTypes: ["Functional", "Regression", "API", "Cross-Browser"],
    tools: ["Postman", "Jira", "TestRail"],
    challenges: "Coordinating regression cycles across rapid weekly feature releases without disrupting active foster matches.",
    impact: "Reduced post-release defect leakage and helped stabilize the matching workflow ahead of public launch.",
    color: "from-indigo-500/30 to-cyan-400/20",
  },
  {
    name: "SeedFunds",
    tag: "Investment & Funding Platform",
    overview:
      "A fintech-adjacent platform for startups to raise funds, requiring rigorous validation of forms, calculations, and compliance flows.",
    responsibilities: ["API contract testing", "Data validation testing", "Edge case and boundary testing"],
    testingTypes: ["API", "Functional", "Integration", "Exploratory"],
    tools: ["Swagger", "Postman", "Jira"],
    challenges: "Verifying complex financial calculations and multi-step onboarding forms with strict validation rules.",
    impact: "Caught critical calculation discrepancies pre-release, preventing inaccurate fund reporting.",
    color: "from-emerald-500/25 to-indigo-400/20",
  },
  {
    name: "WZRD Pro",
    tag: "SaaS Productivity Tool",
    overview:
      "A subscription-based SaaS product requiring continuous regression testing across new feature drops and UI iterations.",
    responsibilities: ["Maintained regression suite", "Smoke tested releases", "Documented bugs with reproducible steps"],
    testingTypes: ["Regression", "UI", "Responsive", "Smoke"],
    tools: ["Jira", "Asana", "TestRail"],
    challenges: "Keeping regression coverage current as the UI evolved rapidly sprint over sprint.",
    impact: "Maintained release confidence with near-zero rollback incidents over multiple sprint cycles.",
    color: "from-cyan-500/25 to-emerald-400/20",
  },
  {
    name: "Ride Share App",
    tag: "Mobile Ride-Hailing App",
    overview:
      "A ride-hailing mobile application covering rider and driver flows, live tracking, and in-app payments.",
    responsibilities: ["Mobile functional testing", "Cross-device testing", "Bug triage with developers"],
    testingTypes: ["Functional", "Cross-Browser", "Exploratory"],
    tools: ["Jira", "Postman"],
    challenges: "Reproducing intermittent location-tracking bugs across varying device and network conditions.",
    impact: "Identified key edge cases in trip-state transitions before public rollout.",
    color: "from-indigo-500/25 to-violet-400/20",
  },
  {
    name: "Attendance Management System",
    tag: "Enterprise Web App",
    overview:
      "An internal HR tool for tracking employee attendance, leave requests, and shift schedules.",
    responsibilities: ["Requirement analysis", "Test case design", "Functional and regression testing"],
    testingTypes: ["Functional", "Regression", "Integration"],
    tools: ["Jira", "TestRail"],
    challenges: "Validating overlapping shift and leave logic against ambiguous business rules.",
    impact: "Clarified and documented edge-case rules, reducing back-and-forth between QA and stakeholders.",
    color: "from-cyan-500/20 to-indigo-400/25",
  },
  {
    name: "Ryvato iOS",
    tag: "iOS Mobile Application",
    overview:
      "A native iOS application requiring device-specific UI validation and exploratory testing across iOS versions.",
    responsibilities: ["iOS UI testing", "Exploratory testing", "Bug documentation with screen recordings"],
    testingTypes: ["UI", "Exploratory", "Responsive"],
    tools: ["Jira", "Asana"],
    challenges: "Covering UI consistency across multiple iPhone screen sizes and iOS versions.",
    impact: "Improved UI consistency reports that fed directly into the design QA checklist.",
    color: "from-emerald-500/20 to-cyan-400/25",
  },
];

export const testingProcess = [
  { title: "Requirement Analysis", desc: "Breaking down specs to uncover gaps before a single test case is written." },
  { title: "Test Planning", desc: "Defining scope, strategy, and priority across functional and edge-case coverage." },
  { title: "Test Case Creation", desc: "Writing clear, repeatable test cases mapped to acceptance criteria." },
  { title: "Execution", desc: "Running manual test cycles across browsers, devices, and environments." },
  { title: "Bug Reporting", desc: "Logging precise, reproducible defects with severity and priority in Jira." },
  { title: "Regression Testing", desc: "Re-validating fixed areas to ensure nothing else broke." },
  { title: "Release Validation", desc: "Final sign-off pass before features ship to production." },
];

export const bugReports = [
  {
    id: "BUG-1042",
    title: "Login button unresponsive on Safari iOS",
    priority: "High",
    severity: "Critical",
    status: "Resolved",
    steps: ["Open app on Safari iOS 17", "Enter valid credentials", "Tap 'Login'"],
    expected: "User is redirected to the dashboard.",
    actual: "Button shows loading state indefinitely, no redirect occurs.",
  },
  {
    id: "BUG-1078",
    title: "Incorrect total in fund calculation",
    priority: "Critical",
    severity: "Critical",
    status: "Resolved",
    steps: ["Create a new funding round", "Add three contributors with decimal amounts", "View total"],
    expected: "Total reflects the precise sum of all contributions.",
    actual: "Total is rounded incorrectly, off by up to $0.03 per entry.",
  },
  {
    id: "BUG-1103",
    title: "Date picker allows past dates for shift scheduling",
    priority: "Medium",
    severity: "Moderate",
    status: "In Progress",
    steps: ["Open shift scheduler", "Select a date before today", "Save shift"],
    expected: "Past dates should be disabled in the picker.",
    actual: "Past dates are selectable and saved without validation.",
  },
];

export const apiTestExample = {
  method: "POST",
  endpoint: "/api/v1/applications",
  request: `{
  "petId": "f3a9-2210",
  "fosterId": "u-8841",
  "message": "Available starting next week",
  "duration": "2 weeks"
}`,
  response: `{
  "status": "success",
  "applicationId": "app-5521",
  "createdAt": "2026-06-28T10:32:00Z",
  "pet": {
    "id": "f3a9-2210",
    "name": "Biscuit",
    "species": "Dog"
  }
}`,
  statusCode: 200,
};

export const whyHireMe = [
  { title: "Attention to Detail", desc: "Catching the edge cases others scroll past." },
  { title: "Strong Communication", desc: "Bug reports developers can act on immediately." },
  { title: "Fast Learner", desc: "Comfortable picking up new tools and domains quickly." },
  { title: "Problem Solver", desc: "Root-causing issues, not just flagging symptoms." },
  { title: "Reliable QA", desc: "Consistent coverage release after release." },
  { title: "Continuous Improvement", desc: "Always refining process and test strategy." },
];

export const testimonials = [
  {
    name: "Uzair Maqsood",
    role: "Full Stack Developer, FoliumAI",
    text: "Hassan catches the edge cases everyone else misses. Our release confidence improved noticeably after he joined.",
  },
  {
    name: "Daniyal Ahmed",
    role: "Lead Developer, Kreatorz.co",
    text: "His bug reports are some of the clearest I've worked with — reproducible, well-documented, and to the point.",
  },
  {
    name: "Hassan Ahamd",
    role: "Senior Python Developer, FoliumAI",
    text: "Hassan's testing caught a critical calculation bug before launch that could have cost us real money.",
  },
  {
    name: "Muhammad Arsalan",
    role: "Senior SQA Team Lead",
    text: "Hassan thinks like a tester and builds like an engineer — a rare combination. He consistently flags issues before they ever reach QA.",
  },
  {
    name: "Samra Habib",
    role: "Project manager",
    text: "Deadlines never suffer with Hassan on the team. He communicates blockers early and delivers reliably, sprint after sprint.",
  },
];

export const aboutPillars = [
  { title: "Attention to Detail", desc: "Nothing ships until every edge case has been considered." },
  { title: "Problem Solving", desc: "Tracing bugs back to root cause, not just symptoms." },
  { title: "Critical Thinking", desc: "Questioning assumptions in every requirement and flow." },
  { title: "Quality First", desc: "Treating quality as a feature, not an afterthought." },
];

export const timeline = [
  { year: "2024", title: "BS Computer Science", desc: "Graduated from Lahore Garrison University — Bachelor's in CS complete.", icon: "graduation", badge: "MILESTONE" },
  { year: "2024", title: "SQA Intern @ Kreatorz.co", desc: "Started SQA journey as an intern — manual testing across web and iOS platforms.", icon: "work", badge: "FIRST ROLE" },
  { year: "2025", title: "SQA Engineer @ FoliumAI", desc: "Joined FoliumAI full-time — expanded into API testing, regression cycles, and full release ownership. Currently active here.", icon: "work", badge: "CURRENT" },
  { year: "Now", title: "Leveling Up: Automation", desc: "Actively building automation skills alongside daily SQA work — exploring Playwright & Cypress to grow into SDET territory.", icon: "growth", badge: "IN PROGRESS" },
];
