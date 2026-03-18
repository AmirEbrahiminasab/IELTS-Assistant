/**
 * Speaking Training Page
 * Test selection for Speaking Training mode.
 */

import DashboardLayout from "@/components/DashboardLayout";
import TestList from "@/components/TestList";

export default function SpeakingTrainingPage() {
  return (
    <DashboardLayout pageTitle="Speaking Training">
      <TestList section="Speaking" mode="training" />
    </DashboardLayout>
  );
}
