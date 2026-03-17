/**
 * Listening Exam Page
 *
 * Test selection for Listening Exam mode.
 */

import DashboardLayout from "@/components/DashboardLayout";
import TestList from "@/components/TestList";

export default function ListeningExamPage() {
  return (
    <DashboardLayout pageTitle="Listening Exam">
      <TestList section="Listening" mode="exam" />
    </DashboardLayout>
  );
}
