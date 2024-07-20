"use client";
import React from "react";
import {TourPage} from "../../../components/TourPage"; 
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import { getAllTours } from "../../../utils/actions";


function Tour() {
    // await new Promise((resolve) => { setTimeout(resolve, 1000) });
    

    // THIS WILL CREATE NEW QUERY CLIENT. 
    const queryClient = new QueryClient();
    // The 'preFetchQuery' IS IMPORTANT IN 'usequery'. THOUGH WE ARE FETCHING THE DATA IN 'TourPage' COMPONENT.
    queryClient.prefetchQuery({
        queryKey:['tours', ''],
        queryFn: ()=>  getAllTours(),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {/* CONTENT/COMPONENTS SHOULD BE WRAP BETWEEN THIS BOUNDARY. */}
           <TourPage></TourPage>
        </HydrationBoundary>
    );
};

export default Tour; 