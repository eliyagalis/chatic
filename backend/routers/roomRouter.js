import {Router} from "express";
import { getRoomById, getRoomByParticipants, getRooms, getRoomsOfUser } from "../controllers/roomController.js";

const roomRouter = Router();

roomRouter.route('/')
    .get(getRooms)
    .post(getRoomByParticipants);
roomRouter.route('/roomById/:roomId')
    .get(getRoomById);
roomRouter.route('/roomByUser/:userId')
    .get(getRoomsOfUser);

export default roomRouter;