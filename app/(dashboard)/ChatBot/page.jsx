import React from "react";
import {ChatApp} from "../../../components/ChatApp";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

async function ChatBot() {
    await new Promise((resolve) => { setTimeout(resolve, 1000) });

    // THIS WILL CREATE NEW QUERY CLIENT.
    const queryClient = new QueryClient();
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ChatApp></ChatApp>
        </HydrationBoundary>
    );
};

export default ChatBot;  