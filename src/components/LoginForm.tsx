import { FormEvent, FunctionComponent, useState } from "react";
import { Socket } from "socket.io-client";

interface IProps {
    socket: Socket | undefined;
    setConnected: (arg0: boolean) => void;
}

const LoginForm: FunctionComponent<IProps> = ({ socket, setConnected }) => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [room, setRoom] = useState("");

    const connectToSocket = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!socket) {
            console.log("Socket no exist.");
            return;
        }

        if (username.length < 2) {
            setError("Username must be at least 2 characters!");
            return;
        }

        socket.auth = { name: username, room: room ? room : "all_users" };
        setError("");
        setConnected(true);
        socket.connect();
    };
    return (
        <form
            className="w-1/2 flex flex-col mx-auto h-full justify-center gap-1"
            onSubmit={connectToSocket}
        >
            <div className="flex gap-3">
                <div className="flex-[5]">
                    <input
                        type="text"
                        className="p-3 shadow-lg w-full"
                        placeholder={error ? `${error}` : "username..."}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <input
                    type="text"
                    className="p-3 shadow-lg flex-1"
                    placeholder="room name..."
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                />
            </div>
            <button className="p-3 bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg hover:from-orange-400 hover:to-orange-300">
                Join the fun!
            </button>
        </form>
    );
};

export default LoginForm;
