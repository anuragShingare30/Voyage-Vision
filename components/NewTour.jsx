"use client"


import {Tourinfo} from "./Tourinfo";
import { useMutation, useQueryClient} from '@tanstack/react-query';
import toast from "react-hot-toast";
import {getExistingTour, generateTourResponse, createNewTour} from "../utils/actions";
import prisma from "../utils/db";


function NewTour() {

    let {mutate, isPending, data:tour} = useMutation({
        mutationFn: async (destination)=>{
            let newTour = await generateTourResponse(destination);
            console.log(data);
            if(newTour){
                return newTour;
            }
            
            toast.error("An error occured!!");
            console.log(error);
            
            
        },
        
    });


    function handleSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.currentTarget);   
        let destination = Object.fromEntries(formData.entries());
        console.log(destination);
        mutate(destination);
        
    };
   
    if(isPending){
        return (
            <div className="loading loading-dots loading-lg"></div>
        );  
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className="text-4xl">Select Your Destination</h1>
                <div className="join mt-8 p-4 mb-8 w-full">
                    <input 
                        className="input input-bordered join-item w-full" 
                        placeholder="Enter City" 
                        name="city"
                        required
                    />
                    <input 
                        className="input input-bordered join-item w-full" 
                        placeholder="Enter Country" 
                        name="country"
                        required
                    />
                    <button 
                        className="btn btn-success join-item rounded-r-full w-28"
                        type="submit"
                        disabled={isPending}
                    >
                    {isPending ? "Please Wait..." : "Search"}
                    </button>
                </div>
            </form>
            
            <div className="mt-5">
                {tour ? <Tourinfo tour={tour}></Tourinfo> : <h1 className="text-3xl">Tour Info Page</h1>}
            </div>
        </div>
    );
}

export { NewTour };