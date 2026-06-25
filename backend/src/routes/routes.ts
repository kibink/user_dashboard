import type { Router } from "express";
import { createRouter } from "@/utils/create";
import authRoutes from "@/routes/auth-routes";
import usersRoutes from "@/routes/users-routes";
import verificationRoutes from "./verification-routes";

export default createRouter((router: Router) => {
  router.use('/auth', authRoutes);
  router.use('/users', usersRoutes);
  router.use('/verification', verificationRoutes);
});
