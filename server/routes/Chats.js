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
    "/getListConversations/:userId",
    auth,
    asyncWrapper(chatController.getListConversations),
);

chatsRoutes.get(
    "/deleteMessage/:messageId",
    auth,
    asyncWrapper(chatController.deleteMessage),
);

chatsRoutes.get(
    "/deleteConversation/:chatId",
    auth,
    asyncWrapper(chatController.deleteConversation),
);

module.exports = chatsRoutes;