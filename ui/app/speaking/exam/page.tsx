/**
 * Speaking Exam Page
 * Test selection for Speaking Exam mode.
 */

import DashboardLayout from "@/components/DashboardLayout";
import TestList from "@/components/TestList";

export default function SpeakingExamPage() {
  return (
    <DashboardLayout pageTitle="Speaking Exam">
      <TestList section="Speaking" mode="exam" />
    </DashboardLayout>
  );
}
