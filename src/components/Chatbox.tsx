import { FormEvent, FunctionComponent, useState } from "react";
import { Socket } from "socket.io-client";

interface IProps {
    socket: Socket | undefined;
}

const Chatbox: FunctionComponent<IProps> = ({ socket }) => {
    const [messages, setMessages] = useState();
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

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

        socket.auth = { name: username };
        setError("");
        setConnected(true);
        socket.connect();
    };

    if (!socket) {
        return (
            <div className="bg-white w-2/3 shadow-lg h-[90vh] flex flex-col">
                Loading...
            </div>
        );
    }

    return (
        <div className="bg-white w-2/3 shadow-lg h-[90vh] flex flex-col relative">
            <div className="absolute top-0 left-0 right-0 h-[85%]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-neutral-100 shadow-lg">
                {connected ? (
                    <div>Connected!</div>
                ) : (
                    <form
                        className="w-1/2 flex flex-col mx-auto h-full justify-center gap-1"
                        onSubmit={connectToSocket}
                    >
                        {error && <p>{error}</p>}
                        <input
                            type="text"
                            className="p-3"
                            placeholder="username..."
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button>Join the fun!</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Chatbox;
