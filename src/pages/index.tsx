import Head from "next/head";
import { Inter } from "@next/font/google";
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import Chatbox from "@/components/Chatbox";

const inter = Inter({ subsets: ["latin"] });

let socket;

export default function Home() {
    const [stateSocket, setStateSocket] = useState<Socket>();

    useEffect(() => {
        socketInitialization();
    }, []);

    const socketInitialization = async () => {
        await fetch("/api/socket");

        socket = io({ autoConnect: false });

        setStateSocket(socket);

        socket.on("connect", () => {
            console.log("Connected!");
        });
    };

    return (
        <>
            <Head>
                <title>NextChat - Live Chat</title>
                <meta
                    name="description"
                    content="A quick and dirty realtime chat app created by Robert Teets."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon-32x32.png" />
            </Head>
            <main
                className={`${inter.className} h-screen flex items-center justify-center`}
            >
                <Chatbox socket={stateSocket} />
            </main>
        </>
    );
}
