"use client";

import React from 'react'
import { getAllTours } from '../utils/actions';
import { useQuery } from '@tanstack/react-query';
import { TourList } from "./TourList"

const TourPage = () => {

  let [search, setSearch] = React.useState('');
  let { data, isPending } = useQuery({
    queryKey: ['tours', search],
    // This is an arrow function that returns the result of calling getAllTours()
    queryFn: () => 
      getAllTours(search), 
  }); 

  

  return (
    <div>
      <form> 
        <div className='join mt-4 mb-16 w-full'>
          <input 
            type="text" 
            placeholder="Enter city or country..." 
            className="input input-bordered w-full max-w-xs join-item" 
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
          />
          <button 
            type='button' 
            className='btn join-item btn-primary'
            disabled={isPending}
            onClick={()=>{setSearch('')}}
          >
            {isPending ? "Please wait..." : "Search"}
          </button>
          
        </div>
      </form>
      {
        isPending ? <span className="loading loading-dots loading-lg"></span> : <TourList data={data}></TourList>
      }
    </div>
  )
}

export { TourPage };
