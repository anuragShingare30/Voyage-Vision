"use server";

// THIS IS THE BASIC SETUP TO USE OPEN AI API. PROVIDING API KEY.
import OpenAI from "openai";
import prisma from "./db";

let openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


// THIS IS THE FUNCTION REQUIRED TO ASK QUESTION TO AI AND GET RESPONSE IN JS OBJECT.
async function generateChatResponse(chatMessages) {
    try {
        let response = await openai.chat.completions.create({
            messages: [
                ...chatMessages,
            ],
            model: "gpt-3.5-turbo",
            temperature: 0,
        });
        console.log(response);
        // Ensure the response is a plain object
        return {
            role: response.choices[0].message.role,
            content: response.choices[0].message.content
        };
    } catch (error) {
        return { error: error.message };
    }
};

// ---------------------------------------------------

async function getExistingTour({ city, country }) {
    try {
        let result = await prisma.tour.findUnique({
            where:{
                city_country:{
                    city,
                    country
                }
            },
        });
        return result;
    }
    catch (error) {
        throw new Error("An error occured")
    };
};



// THIS IS THE FUNCTION REQUIRED TO RETURN RESPONSE OF OUR TOUR BY INPUT CITY AND COUNTRY.

async function generateTourResponse({ city, country }) {

    let query = `Find a ${city} in this ${country}.
If ${city} in this ${country} exists, create a list of things families can do in this ${city},${country}. 
Once you have a list, create a one-day tour. Response should be in the following JSON format: 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "description of the city and tour",
    "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
  }
}
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null }, with no additional characters.`;



    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a user guide!!!" },
                { role: "user", content: query },
            ],
            temperature: 1,
            // max_tokens: 256,
            // top_p: 1,
            // frequency_penalty: 0,
            // presence_penalty: 0,
        });
        let result = JSON.parse(response.choices[0].content);
        console.log(result);
        if (!result) {
            console.log(error);
            return error;
        }
        else {
            return result;
        };
    }
    catch (error) {
        console.log(error);
        return null;
    }

};

// --------------------------------------------------------------

async function createNewTour(tour) {
    try{
        return await prisma.tour.create({
            data:{
                tour,
            }
        });
    }
    catch(error){
        throw new Error("An error occured");
    }
};



export { generateChatResponse, getExistingTour, generateTourResponse, createNewTour };
