import type { ReactNode } from "react";
import { Card as BsCard } from "react-bootstrap";

interface CardProps {
  children: ReactNode;
  center?: boolean;
  title?: string;
  maxWidth?: string | number;
  height?: string | number;
}

export default function Card({
  children,
  center = false,
  title,
  maxWidth,
  height,
}: CardProps) {
  const titleComponent = title ? (
    <BsCard.Title className="text-center mb-4">{title}</BsCard.Title>
  ) : null;

  return (
    <BsCard
      style={{
        maxWidth,
        width: maxWidth ? "100%" : undefined,
        height,
      }}
    >
      <BsCard.Body
        className={center ? "d-flex flex-column" : undefined}
        style={{
          overflow: "auto",
        }}
      >
        {titleComponent}
        <div
          className={
            center
              ? "flex-grow-1 d-flex justify-content-center align-items-center"
              : undefined
          }
        >
          {children}
        </div>
      </BsCard.Body>
    </BsCard>
  );
}
