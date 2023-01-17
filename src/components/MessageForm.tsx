import { FunctionComponent } from "react";

const MessageForm: FunctionComponent = () => {
    return (
        <form
            className="flex gap-3 h-full"
            onSubmit={(e) => e.preventDefault()}
        >
            <textarea
                className="flex-[5] resize-none focus:outline-none p-3"
                placeholder="Enter your message here..."
            ></textarea>
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg hover:from-orange-400 hover:to-yellow-400 flex-1">
                Send
            </button>
        </form>
    );
};

export default MessageForm;
