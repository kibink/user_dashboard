import { Table, Form, Spinner, Alert } from "react-bootstrap";
import { useAllUsers } from "@/features/users/hooks/all-users";
import { useState } from "react";
import { formatDate } from "@/utils/date";

type UserStatus = "Active" | "Unverified" | "Blocked";

export default function UserTable({ selectedIds, setSelectedIds }) {
  const { data, isLoading, error } = useAllUsers();
  const [selectAllState, setSelectAllState] = useState(false);

  const handleCheckboxChange = (e, id) => {
    const isChecked = e.target.checked;
    setSelectedIds((items) =>
      isChecked ? [...items, id] : items.filter((item) => item !== id),
    );

    if (!isChecked) {
      setSelectAllState(false);
    } else if (selectedIds.length + 1 == data.length) {
      setSelectAllState(true);
    }
  };

  const handleAllCheckboxesChange = (e) => {
    if (e.target.checked) {
      setSelectAllState(true);

      const allIds = data.map((item) => item.id);
      setSelectedIds(allIds);
    } else {
      setSelectAllState(false);

      setSelectedIds([]);
    }
  };

  const getUserStatus = (user): UserStatus => {
    if (user.isBlocked) {
      return "Blocked";
    } else {
      return user.isVerified ? "Active" : "Unverified";
    }
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
