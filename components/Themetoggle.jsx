"use client";
import { LuSunMedium } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";
import React from "react";


let themes = {
        lemonade: "lemonade",
        sunset: "sunset"
    };



function Themetoggle() {
    let [theme, setTheme] = React.useState(themes.lemonade);

    function toggleTheme(){
        let newTheme = theme === themes.lemonade ? themes.sunset : themes.lemonade;
        document.documentElement.setAttribute("data-theme", newTheme);
        setTheme(newTheme);
    }

    return (
        <button className="btn btn-sm btn-outline" onClick={toggleTheme}>
            {theme === "lemonade" ? (
                <IoMoonOutline className="w-4 h-4"/>
            ) : (
                <LuSunMedium className="h-4 w-4"/> 
            )}
        </button>
    );
};

export { Themetoggle };