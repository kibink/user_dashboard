import { Button, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaBroom, FaLock, FaTrash, FaUnlock } from "react-icons/fa6";
import { useDeleteUsers } from "@/features/users/hooks/delete-users";
import { useBlockUsers } from "@/features/users/hooks/block-users";
import { useUnblockUsers } from "@/features/users/hooks/unblock-users";

export default function UserToolbar({ selectedIds }) {
  const { mutate: blockUsers } = useBlockUsers();
  const { mutate: unblockUsers } = useUnblockUsers();
  const { mutate: deleteUsers } = useDeleteUsers();

  const handleBlock = (e) => {
    e.preventDefault();
    blockUsers({ ids: selectedIds });
  };

  const handleUnblock = (e) => {
    e.preventDefault();
    unblockUsers({ ids: selectedIds });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteUsers({ ids: selectedIds });
  };

  const handleDeleteUnverified = (e) => {
    e.preventDefault();
    deleteUsers({ ids: selectedIds, isVerified: false });
  };

  const isDisabled = selectedIds.length == 0;

  const renderTooltip = (tip) => <Tooltip>{tip}</Tooltip>;

  return (
    <Container className="d-flex gap-1 p-0">
      <OverlayTrigger overlay={renderTooltip("Block selected users")}>
        <Button
          className="pt-0"
          variant="dark"
          disabled={isDisabled}
          size="sm"
          onClick={handleBlock}
        >
          <FaLock />
        </Button>
      </OverlayTrigger>
      <OverlayTrigger overlay={renderTooltip("Unblock selected users")}>
        <Button
          className="pt-0"
          disabled={isDisabled}
          size="sm"
          onClick={handleUnblock}
        >
          <FaUnlock />
        </Button>
      </OverlayTrigger>
      <OverlayTrigger overlay={renderTooltip("Delete selected users")}>
        <Button
          className="pt-0"
          variant="danger"
          disabled={isDisabled}
          size="sm"
          onClick={handleDelete}
        >
          <FaTrash />
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        overlay={renderTooltip("Delete unverified selected users")}
      >
        <Button
          className="pt-0"
          variant="danger"
          disabled={isDisabled}
          size="sm"
          onClick={handleDeleteUnverified}
        >
          <FaBroom />
        </Button>
      </OverlayTrigger>
    </Container>
  );
}
