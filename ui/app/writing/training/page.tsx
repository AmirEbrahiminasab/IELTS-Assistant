/**
 * Writing Training Page
 * Test selection for Writing Training mode.
 */

import DashboardLayout from "@/components/DashboardLayout";
import TestList from "@/components/TestList";

export default function WritingTrainingPage() {
  return (
    <DashboardLayout pageTitle="Writing Training">
      <TestList section="Writing" mode="training" />
    </DashboardLayout>
  );
}
