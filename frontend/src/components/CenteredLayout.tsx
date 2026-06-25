import type { ReactNode } from "react";

interface CenteredLayoutProps {
  children: ReactNode;
}

export default function CenteredLayout({ children }: CenteredLayoutProps) {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column vh-100 bg-light">
      {children}
    </div>
  );
}
