import React from "react";

async function TourPage(){
    await new Promise((resolve)=>{setTimeout(resolve,1000)});

    return (
        <div>
            <h1 className="text-2xl">Tour Page</h1>
        </div>
    );
};

export default TourPage; 