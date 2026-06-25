import { handleVerifyUser } from "@/controllers/verification-controllers";
import { handleSendVerificationEmail } from "@/controllers/verification-controllers";
import { authenticate } from "@/middlewares/auth";
import { createRouter } from "@/utils/create";
import { Router } from "express";

export default createRouter((router: Router) => {
  router.post("/verify", authenticate(), handleVerifyUser);
  router.post("/email", authenticate(), handleSendVerificationEmail);
});
