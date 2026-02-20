/**
 * Speaking Page
 * 
 * Placeholder page for the Speaking section of IELTS Assistant.
 * This page will eventually contain speaking practice exercises.
 */

import DashboardLayout from "@/components/DashboardLayout";
import ComingSoon from "@/components/ComingSoon";

export default function SpeakingPage() {
  return (
    <DashboardLayout pageTitle="Speaking">
      <ComingSoon pageName="Speaking" />
    </DashboardLayout>
  );
}
