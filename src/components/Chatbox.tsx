import { FunctionComponent, useRef, useState, useEffect } from "react";
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
    const chatRef = useRef<HTMLDivElement>(null);

    socket?.on("add_message", (message: IMessage) => {
        setMessages([...messages, message]);
        autoScroll();
    });

    const autoScroll = () => {
        if (chatRef) {
            setTimeout(() => {
                const newHeight = chatRef.current?.scrollHeight;
                chatRef.current?.scroll({
                    top: newHeight,
                    behavior: "smooth",
                });
            }, 200);
        }
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
            {socket.auth && socket.auth.room && (
                <div className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg flex items-center justify-center">
                    <h2 className="text-4xl">
                        You are connected to:{" "}
                        <span className="font-bold">{socket.auth.room}</span>
                    </h2>
                </div>
            )}
            <div
                ref={chatRef}
                className="absolute top-[15%] left-0 right-0 h-[70%] p-5 flex flex-col gap-3 overflow-y-scroll"
            >
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
