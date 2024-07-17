import React from 'react'
import prisma from '../utils/db';
// import { getCityImages, getCityName } from '../utils/actions';



const CityImages = async ({ cityId }) => {

    let city = await getCityName(cityId);
    console.log(city.city);
    // let result  = await getCityImages(city);
    // let images = result.data;


    return (
        <div>
            <div className='tour-Image'>
                <div className="carousel carousel-center bg-base-100 rounded-box max-w-md space-x-4 p-4">
                    {/* {
                        images.map((image,index) => {
                            return (
                                <div className="carousel-item" key={index}>
                                    <img
                                        src={`${image.url}`}
                                        className="rounded-box"
                                        width="250px"
                                    />
                                </div>
                            );
                        })
                    } */}


                </div>
            </div>
        </div>
    )
}

export { CityImages };
