import {Router} from "express";
import { getUsers, login, signup, getUserById, verifyToken} from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/").get(getUsers);
userRouter.route('/signup').post(signup);
userRouter.route('/login').post(login);
userRouter.route('/verifyToken').post(verifyToken);
userRouter.route('/:userId').get(getUserById);

export default userRouter;