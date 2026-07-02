import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BackgroundFX from "./components/BackgroundFX";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Tools from "./components/Tools";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import ProcessFlow from "./components/ProcessFlow";
import BugHunt from "./components/BugHunt";
import ApiTesting from "./components/ApiTesting";
import Stats from "./components/Stats";
import WhyHireMe from "./components/WhyHireMe";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BugReporterModal from "./components/BugReporterModal";
import type { BugInfo } from "./components/BugReporterModal";
import CelebrationModal from "./components/CelebrationModal";
import DevToolsPanel from "./components/DevToolsPanel";

export type UserReportedBug = {
  id: string;
  title: string;
  steps: string[];
  expected: string;
  actual: string;
  priority: string;
  severity: string;
  status: string;
  reporter: string;
};

type NetworkLog = {
  method: string;
  url: string;
  status: number;
  time: string;
  latency: string;
};

export default function App() {
  const [qaMode, setQaMode] = useState(false);
  const [reportedBugs, setReportedBugs] = useState<string[]>([]);
  const [activeReportBug, setActiveReportBug] = useState<BugInfo | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [userBugs, setUserBugs] = useState<UserReportedBug[]>([]);
  const [networkLogs, setNetworkLogs] = useState<NetworkLog[]>([]);
  const [showDevTools, setShowDevTools] = useState(true);

  const handleReportBug = (bug: BugInfo) => {
    // Only allow reporting if QA mode is on and bug hasn't been reported yet
    if (!reportedBugs.includes(bug.id)) {
      setActiveReportBug(bug);
    }
  };

  const handleModalSubmit = (reporterName: string) => {
    if (!activeReportBug) return;
    
    const newBugId = activeReportBug.id;
    const updatedReported = [...reportedBugs, newBugId];
    
    // Add to user reported bugs list
    const newUserBug: UserReportedBug = {
      id: activeReportBug.id,
      title: activeReportBug.title,
      steps: activeReportBug.steps,
      expected: activeReportBug.expected,
      actual: activeReportBug.actual,
      priority: activeReportBug.priority,
      severity: activeReportBug.severity,
      status: `Resolved (Reported by ${reporterName})`,
      reporter: reporterName,
    };

    setUserBugs((prev) => [newUserBug, ...prev]);
    setReportedBugs(updatedReported);
    setActiveReportBug(null);

    // If all 4 bugs are found, show celebration
    if (updatedReported.length === 4) {
      setTimeout(() => {
        setShowCelebration(true);
      }, 800);
    }
  };

  const handleAddNetworkLog = (log: NetworkLog) => {
    setNetworkLogs((prev) => [log, ...prev]);
  };

  const handleLocateBug = (bugId: string) => {
    const sectionMap: Record<string, string> = {
      "BUG-INT-01": "hero",
      "BUG-INT-02": "about",
      "BUG-INT-03": "why",
      "BUG-INT-04": "api",
    };
    const sectionId = sectionMap[bugId];
    if (!sectionId) return;

    const element = document.getElementById(sectionId);
    if (element) {
      // Scroll to center of page
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      // Add a red visual flashing highlight effect in real time!
      element.classList.add("flash-target-bug");
      setTimeout(() => {
        element.classList.remove("flash-target-bug");
      }, 2500);
    }
  };

  return (
    <>
      <BackgroundFX />
      <CustomCursor />
      <Navbar qaMode={qaMode} setQaMode={setQaMode} reportedCount={reportedBugs.length} />
      <main className={qaMode && showDevTools ? "pb-64" : ""}>
        <Hero qaMode={qaMode} reportedBugs={reportedBugs} onReportBug={handleReportBug} />
        <About qaMode={qaMode} reportedBugs={reportedBugs} onReportBug={handleReportBug} />
        <Stats />
        <Skills />
        <Tools />
        <Experience />
        <Projects />
        <ProcessFlow />
        <BugHunt userBugs={userBugs} />
        <ApiTesting 
          qaMode={qaMode} 
          reportedBugs={reportedBugs} 
          onReportBug={handleReportBug} 
          onAddNetworkLog={handleAddNetworkLog}
        />
        <WhyHireMe qaMode={qaMode} reportedBugs={reportedBugs} onReportBug={handleReportBug} />
        <Testimonials />
        <Contact />
      </main>
      <Footer />

      {/* SQA DevTools Bottom Console */}
      <AnimatePresence>
        {qaMode && showDevTools && (
          <DevToolsPanel
            reportedBugs={reportedBugs}
            networkLogs={networkLogs}
            onLocateBug={handleLocateBug}
            onClose={() => setShowDevTools(false)}
          />
        )}
      </AnimatePresence>

      {/* Modals Portal */}
      <AnimatePresence>
        {activeReportBug && (
          <BugReporterModal
            bug={activeReportBug}
            onClose={() => setActiveReportBug(null)}
            onSubmit={handleModalSubmit}
          />
        )}
        {showCelebration && (
          <CelebrationModal onClose={() => setShowCelebration(false)} />
        )}
      </AnimatePresence>
    </>
  );
}


