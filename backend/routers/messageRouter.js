import { Router } from "express";
import { createMessage, getMessagesByRoomId } from "../controllers/messageController.js";

const messageRouter = Router();
messageRouter.route('/:roomId')
        .get(getMessagesByRoomId)
        .post(createMessage);

export default messageRouter;