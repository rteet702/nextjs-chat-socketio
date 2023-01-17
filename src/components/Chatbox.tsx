import { FunctionComponent, useState } from "react";
import { Socket } from "socket.io-client";
import MessageForm from "./MessageForm";
import LoginForm from "./LoginForm";

interface IProps {
    socket: Socket | any;
}

interface IMessage {
    author: string;
    content: string;
}

const Chatbox: FunctionComponent<IProps> = ({ socket }) => {
    const [messages, setMessages] = useState<Array<IMessage>>([]);
    const [connected, setConnected] = useState(false);

    socket?.on("add_message", (message: IMessage) => {
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
            {socket.auth && socket.auth.room && (
                <div className="absolute top-0 left-0 right-0 h-[15%] bg-orange-400 flex items-center justify-center">
                    <h2 className="text-4xl">
                        You are connected to:{" "}
                        <span className="font-bold">{socket.auth.room}</span>
                    </h2>
                </div>
            )}
            <div className="absolute top-[15%] left-0 right-0 max-h-[70%] p-5 flex flex-col gap-3 overflow-y-scroll">
                {messages.map((message: IMessage, index) => {
                    return (
                        <div
                            className="bg-neutral-200 shadow-lg p-3"
                            key={index}
                        >
                            <p>
                                <span className="font-bold">
                                    {message.author}
                                </span>{" "}
                                said:{" "}
                            </p>
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
