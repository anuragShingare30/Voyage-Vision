import React from "react";
import { NewTour } from "../../../../components/NewTour";



import { 
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

async function NewTourPage() {
    await new Promise((resolve) => { setTimeout(resolve, 1000) });

    // THIS WILL CREATE NEW QUERY CLIENT.
    const queryClient = new QueryClient();
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {/* CONTENT/COMPONENTS SHOULD BE WRAP BETWEEN THIS BOUNDARY. */}
            <NewTour></NewTour>
        </HydrationBoundary>
    );
};

export default NewTourPage; 