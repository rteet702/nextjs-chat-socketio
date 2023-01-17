import { FormEvent, FunctionComponent, useState } from "react";
import { Socket } from "socket.io-client";

interface IProps {
    socket: Socket | undefined;
}

const MessageForm: FunctionComponent<IProps> = ({ socket }) => {
    const [content, setContent] = useState("");

    const submitMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!socket) {
            return;
        }

        socket.emit("new_message", { content: content });
        setContent("");
    };

    return (
        <form className="flex gap-3 h-full" onSubmit={submitMessage}>
            <textarea
                className="flex-[5] resize-none focus:outline-none p-3"
                placeholder="Enter your message here..."
                value={content}
                onChange={(event) => {
                    setContent(event.target.value);
                }}
            ></textarea>
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg hover:from-orange-400 hover:to-yellow-400 flex-1">
                Send
            </button>
        </form>
    );
};

export default MessageForm;
