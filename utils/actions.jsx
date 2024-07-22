"use server";

// THIS IS THE BASIC SETUP TO USE OPEN AI API. PROVIDING API KEY.
import OpenAI from "openai";
import prisma from "./db";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";



// ---------------------------------------------------

// THIS IS THE FUNCTION REQUIRED TO ASK QUESTION TO AI AND GET RESPONSE.
async function chatResponse(prompt) {
    // Access your API key as an environment variable
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    try {
        // Choose a model that's appropriate for your use case.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: prompt,
                        }
                    ],
                }
            ],
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.1,
            },
        });
        // console.log(result.response.text());
        console.log(result.response.candidates[0].content.parts[0].text);
        return (result.response.candidates[0]);
    }
    catch (error) {
        console.log(error);
    }
};

// ----------------------------------------------------------------




// THIS IS THE FUNCTION REQUIRED TO RETURN RESPONSE OF OUR TOUR BY INPUT CITY AND COUNTRY.

async function generateTour({ city, country }) {
    // Access your API key as an environment variable
    const genAI = new GoogleGenerativeAI(process.env.OPENAPI_KEY);
    try {
        // Using `responseMimeType` requires one of the Gemini 1.5 Pro or 1.5 Flash models
        let model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            // Set the `responseMimeType` to output JSON
            generationConfig: { responseMimeType: "application/json" }
        });

        let prompt = ` Find a ${city} in this ${country}.
    If ${city} in this ${country} exists, create a list of things families can do in this ${city},${country}. 
    Once you have a list, create a one-day tour. Response should be in the following JSON format: 
    {
      tour: {
        "city": ${city}, 
        "country": "${country}",
        "title": "title of the tour",
        "description": "description of the city and tour",
        "stops": ["stop name", "stop name","stop name"],
      };
    }
    If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null },with no additional characters.`

        let result = await model.generateContent(prompt);
        // let data = JSON.parse(result.response.candidates[0].content.parts[0]);
        let data = result.response.candidates[0].content.parts[0]
        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error);
    }
}


// --------------------------------------------------------------


// THIS FUNCTION WILL RETURN THE TOUR RESPONSE, IF THE TOUR EXIST.
async function getExistingTour({ city, country }) {
    try {
        return await prisma.tour.findUnique({
            where: {
                city_country: {
                    city,
                    country
                }

            }
        });
    }
    catch (error) {
        console.log(error);
        // throw new Error("failed to fetch data");
    };

};


// THIS FUNCTION WILL CREATE NEW TOUR ,IF THE TOUR DOES NOT EXIST IN OUR DATABASE.
async function createNewTour(tour) {
    try {
        // Validate input
        if (!tour.city || !tour.country || !tour.title || !tour.description || !tour.stops) {
            throw new Error("Invalid tour data");
        }

        // Create the new tour
        const newTour = await prisma.tour.create({
            data: {
                city: tour.city,
                country: tour.country,
                title: tour.title,
                description: tour.description,
                stops: tour.stops,
            }
        });

        return newTour;
    } catch (error) {
        console.error('Error creating new tour:', error);
        throw new Error("Failed to create new tour");
    }
};


// THIS FUNCTION IS USED IN SEARCH FUNCTIONALITY. TO SEARCH ANY SPECIFIC CITY OR COUNTRY BASED ON USER INPUT.
async function getAllTours(searchTerm) {
    if (!searchTerm) {
        let tours = await prisma.tour.findMany({
            orderBy: {
                city: 'asc',
            }
        });
        return tours;
    }

    let tours = await prisma.tour.findMany({
        where: {
            OR: [
                {
                    city: {
                        contains: searchTerm
                    },
                },
                {
                    country: {
                        contains: searchTerm
                    },
                },
            ]
        },
        orderBy: {
            city: 'asc'
        }
    });
    return tours;
}

async function getTour(id) {
    try {
        return await prisma.tour.findUnique({
            where: {
                id,
            }
        });

    }
    catch (error) {
        console.log(error);
    }
};


async function getCityImages(city) {
    try {
        const options = {
            method: 'GET',
            url: 'https://real-time-image-search.p.rapidapi.com/search',
            params: {
                query: `${city}`,
                size: 'any',
                color: 'any',
                type: 'any',
                time: 'any',
                usage_rights: 'any',
                file_type: 'any',
                aspect_ratio: 'any',
                safe_search: 'off',
                region: 'us'
            },
            // headers: {
            //     'x-rapidapi-key': '8d6e9a79f8msha0e5ad28b2c517bp1d9c70jsn4f90ddabc039',
            //     'x-rapidapi-host': 'real-time-image-search.p.rapidapi.com'
            // }
            headers: {
                'x-rapidapi-key': 'ca247490e0msh82af7d8aa5d332bp1e61b0jsn03bb3d3e856a',
                'x-rapidapi-host': 'real-time-image-search.p.rapidapi.com'
            }
        };
        const response = await axios.request(options);
        return (response.data);
    }
    catch (error) {
        console.error(error);
    }
}






export { chatResponse, generateTour, getExistingTour, createNewTour, getAllTours, getTour, getCityImages  };















// {
//     id: 'xCUDg3d3SV34jM',
//     title: 'London Travel Guide by Rick Steves',
//     url: 'https://d3dqioy2sca31t.cloudfront.net/Projects/cms/production/000/033/202/slideshow/67b79a5c6e0962cd4509791d56d196da/slide-england-london-st-paul-cathedral.jpg',
//     width: 666,
//     height: 320,
//     size: '68KB',
//     background_color: 'rgb(203,232,248)',
//     thumbnail_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2R66g-1AI4u-ESIBbhrg9Pli2Y24hgUNnejw9YKUsV5KAbU2v&s',
//     thumbnail_width: 324,
//     thumbnail_height: 155,
//     source: 'Rick Steves Europe',
//     source_url: 'https://www.ricksteves.com/europe/england/london',
//     source_domain: 'www.ricksteves.com',
//     copyright: 'dominic az bonuccelli photography',
//     creative: 'Dominic Arizona Bonuccelli'
//   },