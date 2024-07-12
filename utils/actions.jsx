"use server";

// THIS IS THE BASIC SETUP TO USE OPEN AI API. PROVIDING API KEY.
import OpenAI from "openai";
import prisma from "./db";
import axios from "axios";

let openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


// async function generateChatResponse(chatMessages) {
//     try {
//         let response = await openai.chat.completions.create({
//             messages: [
//                 ...chatMessages,
//             ],
//             model: "gpt-3.5-turbo",
//             temperature: 0,
//         });
//         console.log(response);
//         // Ensure the response is a plain object
//         return {
//             role: response.choices[0].message.role,
//             content: response.choices[0].message.content
//         };
//     } catch (error) {
//         return { error: error.message };
//     }
// };

// ---------------------------------------------------

// THIS IS THE FUNCTION REQUIRED TO ASK QUESTION TO AI AND GET RESPONSE.
async function getChatResponse(text) {
    try {
        const options = {
            method: 'POST',
            url: 'https://chatgpt-42.p.rapidapi.com/chatgpt',
            headers: {
                'x-rapidapi-key': '87b8df551amsh57ed1ac56ba1c0dp18c0a1jsne005c9326516',
                'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                messages: [
                    { role: "user", content: text },
                ],
                web_access: false
            }
        };
        const response = await axios.request(options);
        console.log(response.data);
        return response.data
    }
    catch (error) {
        console.error(error);
    }
}

// ----------------------------------------------------------------






async function getExistingTour({ city, country }) {

};





// THIS IS THE FUNCTION REQUIRED TO RETURN RESPONSE OF OUR TOUR BY INPUT CITY AND COUNTRY.

// 7 API CALLS
async function generateTourResponse({ city, country }) {

    let query = ` Find a ${city} in this ${country}.
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
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null },with no additional characters.`;


    try {
        const options = {
            method: 'POST',
            url: 'https://chatgpt-42.p.rapidapi.com/matag2',
            headers: {
                'x-rapidapi-key': '8d6e9a79f8msha0e5ad28b2c517bp1d9c70jsn4f90ddabc039',
                'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                messages: [
                    {
                        role: 'user',
                        content: query
                    }
                ],
                web_access: false
            }
        };
        const response = await axios.request(options);
        const result = response.data.result;

        // Extracting the JSON part from the response
        const jsonResponseMatch = result.match(/```json\n({.*?})\n```/s);
        const jsonResponse = jsonResponseMatch ? JSON.parse(jsonResponseMatch[1]) : { tour: null };

        console.log(jsonResponse);
        return jsonResponse;
    }
    catch (error) {
        console.error(error);
    }
};


// --------------------------------------------------------------


async function createNewTour(tour) {

};






export { getExistingTour, generateTourResponse, createNewTour, getChatResponse };
