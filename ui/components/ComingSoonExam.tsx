/**
 * ComingSoonExam Component
 *
 * Placeholder for individual exam pages.
 */

import DashboardLayout from "@/components/DashboardLayout";
import ComingSoon from "@/components/ComingSoon";

interface ComingSoonExamProps {
  section: string;
  mode: "training" | "exam";
  testNumber: number;
  examNumber: number;
}

export default function ComingSoonExam({ section, mode, testNumber, examNumber }: ComingSoonExamProps) {
  const pageTitle = `Cambridge ${testNumber} - Exam ${examNumber}`;
  const comingSoonName = `${section.charAt(0).toUpperCase() + section.slice(1)} Cambridge ${testNumber} Exam ${examNumber}`;
  
  return (
    <DashboardLayout pageTitle={pageTitle}>
      <ComingSoon pageName={comingSoonName} />
    </DashboardLayout>
  );
}
