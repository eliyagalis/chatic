import {Router} from "express";
import { createRoom, getRoomById, getRooms } from "../controllers/roomController.js";

const roomRouter = Router();

roomRouter.route('/').get(getRooms).post(createRoom);
roomRouter.route('/:roomId').get(getRoomById);

export default roomRouter;