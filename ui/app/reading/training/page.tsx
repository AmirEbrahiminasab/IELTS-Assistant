/**
 * Reading Training Page
 *
 * Test selection for Reading Training mode.
 */

import DashboardLayout from "@/components/DashboardLayout";
import TestList from "@/components/TestList";

export default function ReadingTrainingPage() {
  return (
    <DashboardLayout pageTitle="Reading Training">
      <TestList section="Reading" mode="training" />
    </DashboardLayout>
  );
}
