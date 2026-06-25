import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Table, Form, Spinner, Alert } from "react-bootstrap";
import { useAllUsers } from "@/features/users/hooks/all-users";
import { useState } from "react";
import { formatDate } from "@/utils/date";
import type { User } from "@/types/users";

type UserStatus = "Active" | "Unverified" | "Blocked";

interface UserTableProps {
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
}

export default function UserTable({
  selectedIds,
  setSelectedIds,
}: UserTableProps) {
  const { data, isLoading, error } = useAllUsers();
  const [selectAllState, setSelectAllState] = useState(false);

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const isChecked = e.target.checked;
    setSelectedIds((items) =>
      isChecked ? [...items, id] : items.filter((item) => item !== id),
    );

    if (!isChecked) {
      setSelectAllState(false);
    } else if (data && selectedIds.length + 1 === data.length) {
      setSelectAllState(true);
    }
  };

  const handleAllCheckboxesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectAllState(true);

      const allIds = data?.map((item) => item.id) ?? [];
      setSelectedIds(allIds);
    } else {
      setSelectAllState(false);

      setSelectedIds([]);
    }
  };

  const getUserStatus = (user: User): UserStatus => {
    if (user.isBlocked) {
      return "Blocked";
    }

    return user.isVerified ? "Active" : "Unverified";
  };

  if (isLoading) {
    return <Spinner variant="dark" />;
  }

  if (error) {
    return <Alert>{error.message || "Something went wrong"}</Alert>;
  }

  return (
    <Table
      className="table-bordered m-0"
      style={{
        overflowWrap: "anywhere",
      }}
    >
      <thead>
        <tr>
          <th>
            <Form.Check
              onChange={handleAllCheckboxesChange}
              checked={selectAllState}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Last seen</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((user, index) => (
          <tr key={index} data-id={user.id}>
            <td>
              <Form.Check
                checked={selectedIds.includes(user.id)}
                onChange={(e) => handleCheckboxChange(e, user.id)}
              />
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{getUserStatus(user)}</td>
            <td>{formatDate(user.lastActivity)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
