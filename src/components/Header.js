import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import InstagramLogo from "/public/Instagram_logo.webp"
import InstagramName from "/public/Instagram_name.webp"
import { FcGoogle } from "react-icons/fc";


const Header = () => {
  return (
    <div className=' shadow-sm border-b sticky top-0 bg-white z-30 p-3'>
      <div className=" flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className=' hidden lg:inline-flex'>
          <Image  src={InstagramName} alt='instagram_name' width={96} height={96}/>
        </Link>

        <Link href="/" className='  lg:hidden'>
          <Image  src={InstagramLogo} alt='instagram_logo' width={40} height={40}/>
        </Link>
        <input type="text" placeholder='Add valuable post' className=' bg-gray-50  rounded text-sm  w-full py-2 px-4 focus:outline-none max-w-[320px]' />
      <button className=' bg-[#0095F6] text-white px-2 py-2 rounded-md flex  items-center gap-2 text-sm' >Login <FcGoogle /></button>
      </div>
    </div>
  )
}

export default Header