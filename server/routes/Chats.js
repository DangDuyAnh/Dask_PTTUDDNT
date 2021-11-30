const chatController = require("../controllers/Chats");
const {asyncWrapper} = require("../utils/asyncWrapper");
const express = require("express");
const chatsRoutes = express.Router();
const auth = require("../middlewares/auth");

chatsRoutes.post(
    "/send",
    auth,
    asyncWrapper(chatController.send),
);

chatsRoutes.get(
    "/getMessages/:chatId",
    auth,
    asyncWrapper(chatController.getMessages),
);

chatsRoutes.get(
    "/getListConversation",
    auth,
    asyncWrapper(chatController.getListConversation)
)
module.exports = chatsRoutes;