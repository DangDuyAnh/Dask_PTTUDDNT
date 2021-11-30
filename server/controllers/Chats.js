const {
    PRIVATE_CHAT,
    GROUP_CHAT,
} = require('../constants/constants');
const ChatModel = require("../models/Chats");
const MessagesModel = require("../models/Messages");
const UserModel = require('../models/Users');
const httpStatus = require("../utils/httpStatus");
const chatController = {};
// chatController.send = async (req, res, next) => {
//     try {
//         let userId = req.userId;
//         const {
//             name,
//             chatId,
//             receivedId,
//             member,
//             type,
//             content
//         } = req.body;
//         let chatIdSend = null;
//         let chat;
//         if (type === PRIVATE_CHAT) {
//             if (chatId) {
//                 chat = await ChatModel.findById(chatId);
//                 if (chat !== null) {
//                     chatIdSend = chat._id;
//                 }
//             } else {
//                 chat = new ChatModel({
//                    type: PRIVATE_CHAT,
//                    member: [
//                        receivedId,
//                        userId
//                    ]
//                 });
//                 await chat.save();
//                 chatIdSend = chat._id;
//             }
//         } else if (type === GROUP_CHAT) {
//             if (chatId) {
//                 chat = await ChatModel.findById(chatId);
//                 if (chat !== null) {
//                     chatIdSend = chat._id;
//                 }
//             } else {
//                 chat = new ChatModel({
//                     type: GROUP_CHAT,
//                     member: member
//                 });
//                 await chat.save();
//                 chatIdSend = chat._id;
//             }
//         }
//         if (chatIdSend) {
//             if (content) {
//                 let message = new MessagesModel({
//                     chat: chatIdSend,
//                     user: userId,
//                     content: content
//                 });
//                 await message.save();
//                 let messageNew = await MessagesModel.findById(message._id).populate('chat').populate('user');
//                 return res.status(httpStatus.OK).json({
//                     data: messageNew
//                 });
//             } else {
//                 return res.status(httpStatus.OK).json({
//                     data: chat,
//                     message: 'Create chat success',
//                     response: 'CREATE_CHAT_SUCCESS'
//                 });
//             }
//         } else {
//             return res.status(httpStatus.BAD_REQUEST).json({
//                 message: 'Not chat'
//             });
//         }

//     } catch (e) {
//         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//             message: e.message
//         });
//     }
// }

chatController.send = async (req, res, next) => {
    try {
        let userId = "617f0af2549fef460c878c6e";//req.userId;
        const {
            name,
            chatId,
            receivedId,
            member,
            type,
            content
        } = req.body;
        let chatIdSend = null;
        let chat;
        if (type === PRIVATE_CHAT) {
            if (chatId) {
                chat = await ChatModel.findById(chatId);
                if (chat !== null) {
                    chatIdSend = chat._id;
                }
            } else {
                chat = new ChatModel({
                    type: PRIVATE_CHAT,
                    name: await UserModel.findById(userId).username,
                    member: [
                       receivedId,
                       userId
                    ]
                });
                await chat.save();
                chatIdSend = chat._id;
            }
        } else if (type === GROUP_CHAT) {
            if (chatId) {
                chat = await ChatModel.findById(chatId);
                if (chat !== null) {
                    chatIdSend = chat._id;
                }
            } else {
                chat = new ChatModel({
                    type: GROUP_CHAT,
                    member: member
                });
                await chat.save();
                chatIdSend = chat._id;
            }
        }
        if (chatIdSend) {
            if (content) {
                let message = new MessagesModel({
                    chat: chatIdSend,
                    user: userId,
                    content: content
                });
                await message.save();
                let messageNew = await MessagesModel.findById(message._id).populate('chat').populate('user');
                return res.status(httpStatus.OK).json({
                    data: messageNew
                });
            } else {
                return res.status(httpStatus.OK).json({
                    data: chat,
                    message: 'Create chat success',
                    response: 'CREATE_CHAT_SUCCESS'
                });
            }
        } else {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Not chat'
            });
        }

    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

chatController.getMessages = async (req, res, next) => {
    try {
        let messages = await MessagesModel.find({
            chat: req.params.chatId
        }).populate('user');
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            data: messages
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

chatController.getListConversation = async (req, res, next) => {
    try {
        let userId = req.userId;
        let conversation = await ChatModel.find({ member: userId });

        let lastMessages = [];
        lastMessages.push('2');
        let lastMessage;
        async function getLastMessages(item, index){ 
            lastMessage = await MessagesModel.findOne({chat: item._id},{}, { sort: { 'createdAt' : -1 } });
            console.log(lastMessage)
            lastMessages.push(lastMessage);
        }
        await Promise.all(conversation.map(getLastMessages));

        let returnArray = [];
        conversation.forEach((item, idx) => {
            returnArray.push({conversation: conversation[idx], lastMessage: lastMessages[idx]})
        });

        return res.status(httpStatus.OK).json({
            data: returnArray,
        });

    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

module.exports = chatController;