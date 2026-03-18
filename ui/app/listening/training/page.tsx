/**
 * Listening Training Page
 * Test selection for Listening Training mode.
 */

import DashboardLayout from "@/components/DashboardLayout";
import TestList from "@/components/TestList";

export default function ListeningTrainingPage() {
  return (
    <DashboardLayout pageTitle="Listening Training">
      <TestList section="Listening" mode="training" />
    </DashboardLayout>
  );
}
