import {Router} from "express";
import { getUsers, login, signup, getUserById, verifyLogin} from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/").get(getUsers);
userRouter.route('/signup').post(signup);
userRouter.route('/login').post(login);
userRouter.route('/verifyToken').post(verifyLogin);
userRouter.route('/:userId').get(getUserById);

export default userRouter;