/**
 * Listening Page
 * 
 * Placeholder page for the Listening section of IELTS Assistant.
 * This page will eventually contain listening exercises and practice tests.
 * 
 * Structure:
 * - Uses DashboardLayout for consistent navigation
 * - Uses ComingSoon component as a placeholder
 */

import DashboardLayout from "@/components/DashboardLayout";
import ComingSoon from "@/components/ComingSoon";

export default function ListeningPage() {
  return (
    <DashboardLayout pageTitle="Listening">
      {/* 
        ComingSoon component displays a placeholder message
        Pass the page name to customize the message
      */}
      <ComingSoon pageName="Listening" />
    </DashboardLayout>
  );
}
