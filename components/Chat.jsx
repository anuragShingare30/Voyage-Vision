"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {getChatResponse} from "../utils/actions"
import toast from "react-hot-toast";

// THIS IS THE LIVE CHAT APPLICATION FOR OUR APP.

// 10 API calls

function Chat() {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    const { mutate: mutateFunc, isPending } = useMutation({
        mutationFn: async (text) => await getChatResponse(text),
        onSuccess: (data) => {
            if (!data) {
                toast.error("Error Occurred...");
                return;
            }
            toast.success("Answered!!!");
            // Assuming result is the key holding the chat response
            const { result } = data; 
            setMessages((prevMessages) => [...prevMessages, { role: 'bot', content: result }]);
        },
        onError: () => {
            toast.error("Error Occurred...");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setMessages((prevMessages) => [...prevMessages, { role: 'user', content: text }]);
        mutateFunc(text);
        setText("");
        console.log(messages);
    };

    const handleInput = (e) => {
        setText(e.target.value);
    };

    return (
        <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
            <div>
                <h1 className="text-3xl relative bottom-7">Voyage Vision</h1>
                {
                    messages.map((message, index) => {

                        let avatar = message.role == 'user' ? '👨🏽' : '🤖';
                        let bcg = message.role === 'user' ? "bg-base-200 shadow-lg" : "bg-base-100 shadow-lg";
                        return (
                            <div key={index} className={`flex flex-row gap-5 mt-6 leading-loose border-b border-base-300 ${bcg}`}>
                                <p className="text-xl m-3">{avatar}</p>
                                <p className={`text-xl m-3`}>{message.content}</p>
                            </div>
                        );
                    })
                }


                <div className="m-10">
                    {isPending ? <span className="loading"></span> : null}
                </div>
            </div>
            <form className="join relative" onSubmit={handleSubmit}>
                <div className="join w-full absolute mt-4 mb-10 bottom-auto">
                    <input
                        type="text"
                        placeholder="Message VoyageVision"
                        className="input input-bordered join-item w-full"
                        name="text"
                        value={text}
                        onChange={handleInput}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary w-32 join-item rounded-lg mb-5 font-bold"
                        disabled={isPending}
                    >
                        {isPending ? "Please Wait..." : "Ask"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export {Chat};
