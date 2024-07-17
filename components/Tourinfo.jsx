
async function Tourinfo({ tour }) {

    let data = tour;
    console.log(data);
    console.log(data.stops);

    

    return (
        <div className="flex flex-col items-start gap-5">

            

            <h1 className='text-4xl font-semibold'>{data.city},{data.country}</h1>
            <p className='leading-10 mb-1 text-3xl'>{data.title}</p>
            <p className=' mb-2 text-xl'>{data.description}</p>
            {
                data.stops.map((stop, index) => {
                    return (
                        <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border">
                            <div className="collapse-title text-xl font-medium">{stop.locationName ? stop.locationName : `Stop ${index + 1}`}</div>
                            <div className="collapse-content">
                                <p>{stop.activityDetails ? stop.activityDetails : stop}</p>
                            </div>
                        </div>
                    );
                })
            }
        </div>

    );
}

export { Tourinfo };



// {
//     tour: {
//       city: 'London',
//       country: 'England',
//       title: 'Family Adventure Day Tour through Historic Landmarks & Interactive Experiences.',
//       description: 'Explore famous historical sites while keeping kids engaged throughout an unforgettable journey across central London. A perfect blend between learning history and having fun!',
//   stops: [
//     "Stop 1 - Buckingham Palace (Short Paragraph): Kick start our adventure by visiting Her Majesty’s residence which also doubles up as the administrative headquarters of Britain’s monarchy since 1837. Don't miss out on catching changing guard ceremony if timed right.",
//     "Stop 2 – Natural History Museum(Short Paragraph): Dive into natural science exploration inside Europe's most biologically diverse building filled with specimens spanning over millions years including dinosaur skeletons sure to ignite curiosity amongst young minds.",
//     'Stop 3 - Covent Garden Market Area( Short Paragraph) : End the adventurous trail amid bustling street performers who add life to public spaces along picturesque piazzas making memories last long after we leave!'
//   ]
//     }
//   }