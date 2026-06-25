import {
  handleBlockUsers,
  handleDeleteUsers as handleDeleteUsers,
  handleGetAllUsers,
  handleGetMe,
  handleGetUser,
  handleUnblockUsers,
} from "@/controllers/users-controllers";
import { authenticate } from "@/middlewares/auth";
import { createRouter } from "@/utils/create";
import { Router } from "express";

export default createRouter((router: Router) => {
  router.get("/", authenticate(), handleGetAllUsers);
  router.get("/me", authenticate(), handleGetMe);
  router.post("/delete", authenticate(), handleDeleteUsers);
  router.post("/block", authenticate(), handleBlockUsers);
  router.post("/unblock", authenticate(), handleUnblockUsers);
  router.get("/:id", authenticate(), handleGetUser);
});
