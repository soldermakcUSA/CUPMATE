import type { ReactNode } from "react";
import { AppSidebar, type SidebarSection } from "@/components/AppSidebar";
import { translations } from "@/lib/i18n";

type SeoShellProps = {
  children: ReactNode;
  activeSection?: SidebarSection;
};

export function SeoShell({ children, activeSection = "dashboard" }: SeoShellProps) {
  return (
    <div className="app-shell seo-shell">
      <AppSidebar t={translations.en} activeSection={activeSection} />
      <div className="seo-shell-main">{children}</div>
    </div>
  );
}
