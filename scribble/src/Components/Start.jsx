import React,{useEffect,useState} from 'react';
import Avatar from './Avatar';
import avatar_1 from "../Icons/Avatar_1.png"
import avatar_2 from "../Icons/Avatar_2.png"
import avatar_3 from "../Icons/Avatar_3.png"
import avatar_4 from "../Icons/Avatar_4.png"
import avatar_5 from "../Icons/Avatar_5.png"
import avatar_6 from "../Icons/Avatar_6.png"
const imagesArray = [
    avatar_1,
    avatar_2,
    avatar_3,
    avatar_4,
    avatar_5,
    avatar_6
];

const Start = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
    <h1>Scribble ioo</h1>
<div className=' flex flex-col justify-center items-center shadow-sm shadow-gray-900'>
    <input className="text-center w-full" type='text' placeholder='Enter your name'/>
      <Avatar images={imagesArray} />
      <button className='p-3 bg-purple-600 m-2 rounded-sm'>Play</button>
      <button className='p-3 bg-purple-600 m-2 rounded-sm'>Create private room </button>
      </div>
    </div>
  );
};

export default Start;
