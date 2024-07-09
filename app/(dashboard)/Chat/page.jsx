import React from "react";
import { Chat } from "../../../components/Chat"

import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

async function ChatPage() {
    await new Promise((resolve) => { setTimeout(resolve, 1000) });

    // THIS WILL CREATE NEW QUERY CLIENT.
    const queryClient = new QueryClient();
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {/* CONTENT/COMPONENTS SHOULD BE WRAP BETWEEN THIS BOUNDARY. */}
            <Chat />
        </HydrationBoundary>
    );
};

export default ChatPage; 