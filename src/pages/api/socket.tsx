import { NextApiResponse } from "next";
import { Server } from "socket.io";

export default function SocketHandler(
    request: Request,
    response: NextApiResponse | any
) {
    if (response.socket.server.io) {
        console.log("Already set up...");
        response.end();
        return;
    }

    const io = new Server(response.socket.server);
    response.socket.server.io = io;

    io.on("connection", (socket) => {
        console.log(
            "Connection established with socket: " + socket.handshake.auth.name
        );

        socket.join(socket.handshake.auth.room);
        console.log("Connected socket to room: " + socket.handshake.auth.room);

        socket.on("new_message", (message) => {
            console.log(
                `${socket.handshake.auth.name} said: ${message.content} to room: ${socket.handshake.auth.room}`
            );

            io.to(socket.handshake.auth.room).emit("add_message", {
                content: message.content,
                author: socket.handshake.auth.name,
            });
        });
    });

    response.end();
    return;
}
