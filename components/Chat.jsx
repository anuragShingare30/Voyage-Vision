"use client"

import React, { useState } from "react";
import { generateChatResponse } from "../utils/actions";
import { useMutation } from '@tanstack/react-query';
import toast from "react-hot-toast";



function Chat() {

    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    // WITH THE HELP OF 'useMutation' REACT HOOKS WE CAN SIMPLY USE THE SERVER COMPONENTS INSIDE AN CLIENT COMPONENETS.
    // AS WE ALL KNOW THAT WE CANNOT USE CLIENT COMPONENTS INSIDE AN SERVER COMPONENETS.
    const { mutate: mutateFunc, isPending, data } = useMutation({
        mutationFn: async (query) => {
            generateChatResponse([...messages, query])
        },
        onSuccess: (data) => {
            if (!data) {
                toast.error("Error Occurred...");
                return;
            }
            else{
                toast.success("Answered!!!");
            }
            setMessages((prev) => [...prev, data]);
        },
        onError: () => {
            toast.error("Error Occurred...");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = { role: 'user', content: text };
        mutateFunc(query);
        setMessages((prev) => [...prev, query]);
        setText("");
        console.log(messages);
    };
    
    const handleInput = (e) => {
        setText(e.target.value);
    };

    return (
        <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
            <div>
                <h1 className="text-3xl">Messages</h1>
                {
                    messages.map(({role,content},index, error)=>{

                        let avatar = role == 'user' ? '👨🏽' : '🤖';
                        let bcg = role === 'user' ? "bg-base-200 shadow-lg" : "bg-base-100 shadow-lg";
                        return (
                            <div key={index} className={`flex flex-row items-center gap-5 mt-6 leading-loose border-b border-base-300 ${bcg}`}>
                                <p className="text-xl m-3">{avatar}</p> 
                                <p className={` text-xl m-3`}>{content ? content : "You are out of tokens! Please top-up the account!!"}</p>
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
};

export { Chat };