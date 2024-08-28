import React from "react";
import { Sidebarheader } from "./Sidebarheader";
import { Navlink } from "./Navlink";
import { Navprofile } from "./Navprofile";


function Sidebar(){

    return (
        <div className="flex flex-col gap-16 ">
            <Sidebarheader></Sidebarheader>
            <Navlink></Navlink>
            <Navprofile></Navprofile>
        </div>
    );
};

export  {Sidebar}; 