import React from "react";
import { UserProfile } from "@clerk/nextjs";

async function ProfilePage(){
    await new Promise((resolve)=>{setTimeout(resolve,1000)});

    return (
        <div className="flex flex-row items-center justify-center m-auto">
            <UserProfile routing="virtual"></UserProfile>
        </div>
    );
};

export default ProfilePage; 