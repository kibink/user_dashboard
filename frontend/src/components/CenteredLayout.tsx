export default function CenteredLayout({ children }) {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column vh-100 wh-100 bg-light">
      {children}
    </div>
  );
}
