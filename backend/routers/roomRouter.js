import {Router} from "express";
import { createRoom, getRoomById, getRoomByParticipants, getRooms } from "../controllers/roomController.js";

const roomRouter = Router();

roomRouter.route('/')
    .get(getRooms)
    .post(getRoomByParticipants);
roomRouter.route('/:roomId')
    .get(getRoomById);

export default roomRouter;