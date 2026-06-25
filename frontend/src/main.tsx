import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.scss";
import App from "@/app/App.tsx";
import { BrowserRouter } from "react-router";
import "bootstrap/dist/css/bootstrap.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/app/query-client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
