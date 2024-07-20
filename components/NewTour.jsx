"use client"


import { Tourinfo } from "./Tourinfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateTourResponse, createNewTour, getExistingTour,generateTour } from "../utils/actions";
import toast from "react-hot-toast";

function NewTour() {

    let queryClient = useQueryClient(); 

    let { mutate, isPending, data:tour } = useMutation({ 
        mutationFn: async (query) => {
            let existingTour = await getExistingTour(query); 
            // HERE IF, TOUR EXIST IN OUR DATABASE THEN RETURN THE TOUR RESPONSE
            // ELSE, CREATE TOUR RESPONSE AS WELL STORE NEW TOUR IN OUR DATABASE.
            if(existingTour) {
                return existingTour;
            };
            let result = await generateTour(query);
            let jsonResponse = JSON.parse(result.text);
            if (jsonResponse && jsonResponse.tour) {
                await createNewTour(jsonResponse.tour);
                queryClient.invalidateQueries({queryKey:['tours']});
                return jsonResponse; 
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








// {
//     parts: [
//       {
//         text: `{
//             "tour": 
//                     {
//                 "city": "Mumbai", 
//                 "country": "India", 
//                 "title": "A Day in Vibrant Mumbai", 
//                 "description": "Experience the energy and diversity of Mumbai, India's bustling financial and cultural hub. This tour will take you through iconic landmarks, vibrant markets, and delicious street food, showcasing the city's unique charm.", 
//                 "stops": [
//                     "Start your day at the Gateway of India, a majestic arch built in 1924, marking the entrance to Mumbai harbor. Explore the nearby Taj Mahal Palace Hotel, a historic landmark known for its elegance and grandeur.", 
//                     "Wander through the bustling streets of Colaba Causeway, a popular shopping destination with a mix of traditional crafts, souvenirs, and street food. Enjoy a delicious lunch at one of the many restaurants offering local specialties.", 
//                     "Immerse yourself in the vibrant atmosphere of Dhobi Ghat, the world's largest open-air laundry. Witness the fascinating process of washing and drying clothes, a unique spectacle showcasing Mumbai's bustling life."
//                 ]
//                     }
//                 }
//                     \n`
//       }
//     ],
//     role: 'model'
//   }