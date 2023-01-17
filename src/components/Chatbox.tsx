import { FunctionComponent, useState } from "react";
import { Socket } from "socket.io-client";
import MessageForm from "./MessageForm";
import LoginForm from "./LoginForm";

interface IProps {
    socket: Socket | undefined;
}

interface IMessage {
    author: string;
    content: string;
}

const Chatbox: FunctionComponent<IProps> = ({ socket }) => {
    const [messages, setMessages] = useState<Array<IMessage>>([]);
    const [connected, setConnected] = useState(false);

    socket?.on("add_message", (message) => {
        setMessages([...messages, message]);
    });

    if (!socket) {
        return (
            <div className="bg-white w-2/3 shadow-lg h-[90vh] flex flex-col">
                Loading...
            </div>
        );
    }

    return (
        <div className="bg-white w-2/3 shadow-lg h-[90vh] flex flex-col relative">
            <div className="absolute top-[15%] left-0 right-0 h-[70%] p-5 flex flex-col gap-3">
                {messages.map((message: IMessage, index) => {
                    return (
                        <div
                            className="bg-neutral-200 shadow-lg p-3"
                            key={index}
                        >
                            <p>{message.author} said: </p>
                            <p className="ml-5">{message.content}</p>
                        </div>
                    );
                })}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-neutral-200 shadow-lg p-3">
                {connected ? (
                    <MessageForm socket={socket} />
                ) : (
                    <LoginForm socket={socket} setConnected={setConnected} />
                )}
            </div>
        </div>
    );
};

export default Chatbox;
