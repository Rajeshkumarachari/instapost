"use client"
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import InstagramLogo from "/public/Instagram_logo.webp"
import InstagramName from "/public/Instagram_name.webp"
import { FcGoogle } from "react-icons/fc";
import { signIn ,signOut,useSession} from 'next-auth/react';
import { RiLogoutCircleRLine } from "react-icons/ri";



const Header = () => {

  const {data:session}=useSession();
  console.log(session)

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
      { session ?( <div className=' flex items-center gap-3'>
        <Image src={session?.user?.image} alt={session?.user?.name} width={40} height={40} className=' rounded-full h-10 w-10 cursor-pointer' /> <RiLogoutCircleRLine onClick={signOut} className='  text-red-700 w-6 h-6 hover:bg-red-50 cursor-pointer rounded-full' /></div>
      ): (
        <button onClick={signIn } className=' bg-[#0095F6] text-white px-2 py-2 rounded-md flex  items-center gap-2 text-sm' >Login <FcGoogle /></button>
    
      ) }
      
        </div>
    </div>
  )
}

export default Header