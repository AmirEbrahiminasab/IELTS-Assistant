/**
 * Reading Exam Page
 *
 * Test selection for Reading Exam mode.
 */

import DashboardLayout from "@/components/DashboardLayout";
import TestList from "@/components/TestList";

export default function ReadingExamPage() {
  return (
    <DashboardLayout pageTitle="Reading Exam">
      <TestList section="Reading" mode="exam" />
    </DashboardLayout>
  );
}
