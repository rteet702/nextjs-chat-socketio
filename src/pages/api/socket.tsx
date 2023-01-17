import { Server } from "socket.io";
import { Socket } from "socket.io-client";

export default function SocketHandler(request: any, response: any) {
    if (response.socket?.server.io) {
        console.log("Already set up...");
        response.end();
        return;
    }

    const io = new Server(response.socket.server);
    response.socket.server.io = io;

    io.on("connection", (socket) => {
        console.log("Connection established with socket: " + socket.id);
    });

    return response;
}
