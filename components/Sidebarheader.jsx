import { Themetoggle } from "./Themetoggle";
import { RiOpenaiFill } from "react-icons/ri";

function Sidebarheader() {

    return (
        <div className="flex flex-row items-center gap-6">
            <RiOpenaiFill className="h-10 w-10"/> 
            <h1 className="text-2xl font-extrabold relative right-4">VoyageVision</h1>
            <Themetoggle></Themetoggle>
        </div>
    );
};

export { Sidebarheader };