/**
 * Writing Exam Page
 * Test selection for Writing Exam mode.
 */

import DashboardLayout from "@/components/DashboardLayout";
import TestList from "@/components/TestList";

export default function WritingExamPage() {
  return (
    <DashboardLayout pageTitle="Writing Exam">
      <TestList section="Writing" mode="exam" />
    </DashboardLayout>
  );
}
