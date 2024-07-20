import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

async function Navprofile(){

    let user = await currentUser();
    // console.log(user.fullName);

    return (
        <div className="px-4 flex items-center gap-2 relative top-32">
             {/* After SignOut we will redirect to ' redirectUrl '  */}
            <UserButton afterSwitchSessionUrl="/"></UserButton>
            <div> 
                <p className="text-base relative top-0">{user.fullName}</p> 
                <p className="text-base-content relative bottom-0">{user.emailAddresses[0].emailAddress}</p>
                
            </div>
            
        </div>
    );
};

export {Navprofile};