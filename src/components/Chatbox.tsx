import { FunctionComponent, useState } from "react";
import { Socket } from "socket.io-client";
import MessageForm from "./MessageForm";
import LoginForm from "./LoginForm";

interface IProps {
    socket: Socket | undefined;
}

const Chatbox: FunctionComponent<IProps> = ({ socket }) => {
    const [messages, setMessages] = useState();
    const [connected, setConnected] = useState(false);

    if (!socket) {
        return (
            <div className="bg-white w-2/3 shadow-lg h-[90vh] flex flex-col">
                Loading...
            </div>
        );
    }

    return (
        <div className="bg-white w-2/3 shadow-lg h-[90vh] flex flex-col relative">
            {/* {connected && (
                <div className="absolute top-0 left-0 right-0 h-[15%] bg-neutral-200 flex items-center justify-center">
                    <h1 className="text-4xl">
                        Room: {room ? room : "Global"}!
                    </h1>
                </div>
            )} */}
            <div className="absolute top-[15%] left-0 right-0 h-[70%]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-neutral-200 shadow-lg p-3">
                {connected ? (
                    <MessageForm />
                ) : (
                    <LoginForm socket={socket} setConnected={setConnected} />
                )}
            </div>
        </div>
    );
};

export default Chatbox;
