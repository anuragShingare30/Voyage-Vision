"use client"


import { Tourinfo } from "./Tourinfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateTourResponse, createNewTour, getExistingTour } from "../utils/actions";
import toast from "react-hot-toast";

function NewTour() {


    let { mutate, isPending, data:tour } = useMutation({
        mutationFn: async (query) => {
            let result = await generateTourResponse(query);
            if (result) {
                console.log(result);
                return result; 
            }
            else {
                toast.error("No matching city found...");
            }
        },
        onSuccess: (data) => {
            if (!data) {
                toast.error("No matching city found...");
            }
        },
    });


    function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let destination = Object.fromEntries(formData.entries());
        mutate(destination);
        console.log(destination);
    };

    if (isPending) {
        return <div>
            <span className="loading loading-dots loading-lg"></span>
        </div>

    }

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
            {tour ? <Tourinfo tour={tour} /> : null}
            </div>
        </div>
    );
}

export { NewTour };