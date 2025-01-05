import {Router} from "express";
import { createRoom, getRoomById, getRoomByParticipants, getRooms, getRoomsOfUser } from "../controllers/roomController.js";

const roomRouter = Router();

roomRouter.route('/')
    .get(getRooms)
    .post(getRoomByParticipants);
roomRouter.route('/:userId')
    .get(getRoomsOfUser);

export default roomRouter;