import Card from "@/components/Card";
import CenteredLayout from "@/components/CenteredLayout";
import UserTable from "@/features/users/components/UserTable";
import { useState } from "react";
import UserToolbar from "@/features/users/components/UserToolbar";
import { Container } from "react-bootstrap";

export default function DashboardPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <CenteredLayout>
      <Card title="Users" maxWidth="50rem" height="30rem">
        <Container className="d-flex flex-column gap-2 h-100">
          <UserToolbar selectedIds={selectedIds} />
          <div className="flex-grow-1 overflow-auto" style={{ minHeight: 0 }}>
            <UserTable
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          </div>
        </Container>
      </Card>
    </CenteredLayout>
  );
}
