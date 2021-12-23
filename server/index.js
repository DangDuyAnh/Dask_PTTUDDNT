require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const {PORT, HOST} = require("./constants/constants");
const {MONGO_URI} = require("./constants/constants");
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const MessageModel = require("./models/Messages");

// connect to mongodb
mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(res => {
    console.log("connected to mongodb");
})
    .catch(err => {
        console.log(err);
    })

// use middleware to parse body req to json
app.use(express.json());

// use middleware to enable cors
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// Assign socket object to every request
app.use(function (req, res, next) {
    req.io = io;
    next();
  });


// route middleware
app.use("/", mainRouter);
app.use('/uploads', express.static('uploads'));

app.get('/settings', function (req, res) {
    res.send('Settings Page');
});

server.listen(PORT, HOST, () => {
    console.log("server running on port: " + PORT)
})

// Socket.io chat realtime
// io.on('connection', (socket) => {
//     MessageModel.find().then(result => {
//         socket.emit('output-messages', result)
//     })
//     console.log('a user connected');
//     socket.emit('message', 'Hello world');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
//     socket.on('chatmessage', msg => {
//         const message = new MessageModel({ msg });
//         message.save().then(() => {
//             io.emit('message', msg)
//         })
//     })
// });
io.on('connection', (socket) => {
    console.log(socket.id + ': connected');
    socket.emit('id', socket.id);

    socket.on('disconnect', () => {
        console.log(socket.id + ': disconnected')
    })

    //DangDuyAnh
    socket.on('notification', function(room) {
        console.log('joining room', room);
        socket.join(room);
    });

    socket.on('chat message', data => {
        io.sockets.emit('chat message', {data: data, id: socket.id});
        console.log(data);
    })
})
