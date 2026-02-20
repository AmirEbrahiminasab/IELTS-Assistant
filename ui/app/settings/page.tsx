/**
 * Settings Page
 * 
 * Application settings and preferences page.
 * Will allow users to customize their IELTS Assistant experience.
 * Currently a placeholder page.
 */

import DashboardLayout from "@/components/DashboardLayout";
import ComingSoon from "@/components/ComingSoon";

export default function SettingsPage() {
  return (
    <DashboardLayout pageTitle="Settings">
      <ComingSoon pageName="Settings" />
    </DashboardLayout>
  );
}
