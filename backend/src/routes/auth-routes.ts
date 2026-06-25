import { handleUnblockUsers } from "@/controllers/users-controllers";
import { handleVerifyUser } from "@/controllers/verification-controllers";
import { handleSendVerificationEmail } from "@/controllers/verification-controllers";
import { handleRegister, handleLogin } from "@/controllers/auth-controllers";
import { authenticate } from "@/middlewares/auth";
import { createRouter } from "@/utils/create";
import { Router } from "express";

export default createRouter((router: Router) => {
  router.post("/register", handleRegister);
  router.post("/login", handleLogin);
  router.post("/logout", async (req, res) => res.sendStatus(200));
});
