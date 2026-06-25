import { createHandler } from "@/utils/create";
import {
  changeUsersBlockStateSchema,
  deleteUsersSchema,
  getUserSchema,
} from "@/schema/user";
import {
  deleteUsers,
  getAllUsers,
  getUserById,
  blockUsers,
  unblockUsers,
} from "@/services/user-services";
import { BackendError } from "@/middlewares/errors";

export const handleGetUser = createHandler(async (req, res) => {
  const id = req.params.id as string;
  const user = await getUserById(id);

  if (!user) {
    throw new BackendError("USER_NOT_FOUND");
  }

  res.status(200).json(user);
});

export const handleGetMe = createHandler(async (req, res) => {
  const { id } = res.locals.user;
  const user = await getUserById(id);

  res.status(200).json(user);
});

export const handleGetAllUsers = createHandler(async (req, res) => {
  const allUsers = await getAllUsers();
  res.status(200).json(allUsers);
});

export const handleDeleteUsers = createHandler(
  deleteUsersSchema,
  async (req, res) => {
    const { ids, isVerified } = req.body;
    const deletedIds = await deleteUsers(ids, isVerified);
    res.status(200).json({
      selfDeleted: deletedIds.includes(res.locals.user.id),
    });
  },
);

export const handleBlockUsers = createHandler(
  changeUsersBlockStateSchema,
  async (req, res) => {
    const { ids } = req.body;
    await blockUsers(ids);
    res.status(200).json({
      selfBlocked: ids.includes(res.locals.user.id),
    });
  },
);

export const handleUnblockUsers = createHandler(
  changeUsersBlockStateSchema,
  async (req, res) => {
    const { ids } = req.body;
    await unblockUsers(ids);
    res.sendStatus(200);
  },
);
