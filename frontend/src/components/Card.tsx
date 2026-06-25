import { Card as BsCard } from "react-bootstrap";

export default function Card({
  children,
  center = null,
  title = null,
  maxWidth = null,
  height = null,
}) {
  const titleComponent = title ? (
    <BsCard.Title className="text-center mb-4">{title}</BsCard.Title>
  ) : null;

  return (
    <BsCard
      style={{
        maxWidth: maxWidth,
        width: maxWidth ? "100%" : null,
        height: height,
      }}
    >
      <BsCard.Body
        className={center ? "d-flex flex-column" : null}
        style={{
          overflow: "auto",
        }}
      >
        {titleComponent}
        <div
          className={
            center
              ? "flex-grow-1 d-flex justify-content-center align-items-center"
              : null
          }
        >
          {children}
        </div>
      </BsCard.Body>
    </BsCard>
  );
}
