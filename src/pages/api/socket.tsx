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
    });

    response.end();
    return;
}
