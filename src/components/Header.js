"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import InstagramLogo from "/public/Instagram_logo.webp"
import InstagramName from "/public/Instagram_name.webp"
import { FcGoogle } from "react-icons/fc";
import { signIn ,signOut,useSession} from 'next-auth/react';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { CiImageOn } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import Modal from 'react-modal';
import { IoCreateOutline } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { app } from '@/firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { sassFalse } from 'sass';



const Header = () => {
  const [open,setOpen]=useState(false)
  const {data:session}=useSession();
  const [selectedFile,setSelectedFile] =useState(null)
  const [imageFileUrl,setImageFileUrl]=useState(null)
  const filePickerRef =useRef(null)
  const [imageFileUploading,setImageFileUploading]=useState(false)

  const addImageToPost =(e)=>{
    const file=e.target.files[0]
    if(file){
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file))
      console.log(setImageFileUrl)
    }
  }
  useEffect(()=>{
    if(selectedFile){
      uploadImageToStorage();
    }
  },[selectedFile]);

async function uploadImageToStorage(){
  setImageFileUploading(true);
  const storage= await getStorage(app);
  const fileName= new Date().getTime()+"-"+selectedFile.name;
  const storageRef=ref(storage,fileName);
  const uploadTask=uploadBytesResumable(storageRef, selectedFile);
  uploadTask.on('state_changed',(snapshot)=>{
    const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
    console.log("Upload is"+progress+"% done")
  }
  ,
  (error)=>{
    console.log(error)
    setImageFileUploading(false)
    setImageFileUrl(null)
    setSelectedFile(null)
  },()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
      setImageFileUrl(downloadURL);
      setImageFileUploading(sassFalse)
      
    })
  }
)
}
 
  return (
    <div className=' shadow-sm border-b sticky top-0 bg-white z-30 p-3'>
      <div className=" flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className=' hidden lg:inline-flex'>
          <Image  src={InstagramName} alt='instagram_name' width={96} height={96}/>
        </Link>

        <Link href="/" className='  lg:hidden'>
          <Image  src={InstagramLogo} alt='instagram_logo' width={40} height={40}/>
        </Link>
        <input type="text" placeholder='Add your worthwhile post by clicking here.' className=' bg-gray-50  rounded text-sm  w-full py-2 px-4 focus:outline-none max-w-[320px]' />
      { session ?( <div className=' flex items-center gap-3'>
      <IoCreateOutline onClick={ ()=>setOpen(true)} className=' text-blue-900 h-10 w-10 cursor-pointer hover:text-blue-950 hover:bg-blue-200 rounded-full p-2 flex items-center justify-center hover:scale-110  transition duration-300' />
        <Image src={session?.user?.image} alt={session?.user?.name} width={40} height={40} className=' rounded-full h-10 w-10 cursor-pointer' /> <RiLogoutCircleRLine onClick={signOut} className='  text-red-700 w-10 h-10 flex items-center justify-center p-2 hover:bg-red-50 cursor-pointer rounded-full' /></div>
      ): (
        <button onClick={signIn } className=' bg-[#0095F6] text-white px-2 py-2 rounded-md flex  items-center gap-2 text-sm' >Login <FcGoogle /></button>
    
      ) }
      
        </div>
        {open && (
          <Modal isOpen={open} className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] border-2 rounded-md shadow-sm " onRequestClose={() => setOpen(false)} arialHideApp={false} >
            <div className=' flex flex-col justify-center items-center h-[100%] '>
              { selectedFile ? (
                <image onClick={()=>setSelectedFile(null)} src={imageFileUrl} alt='selected file'   className={`w-full max-h-[250px] cursor-pointer h-96 4-96 object-contain rounded-md ${imageFileUploading ? "animate-pulse" : ""}` }/>
              ) : (
                <IoMdCloudUpload onClick={() => filePickerRef.current.click()} className=' text-4xl text-blue-600 cursor-pointer' />)}
            <input hidden ref={filePickerRef} type="file" accept='image/*' onChange={addImageToPost} />
            </div>
            <input type="text" maxLength={150} placeholder='Please enter you thought' className=' m-4 border-none text-center  outline-none w-full focus:ring-0 ' />
          <button disabled className='gap-2 flex items-center w-full  bg-green-600 text-white p-2 shadow-sm rounded-md justify-center hover:brightness-105  disabled:bg-green-200 disabled:cursor-not-allowed disabled:hover:brightness-100'><IoMdSend className='h-6 w-6' /> Upload Post</button>
          <IoIosClose onClick={()=> setOpen(false)}  className=' cursor-pointer absolute top-2 right-2 hover:text-red-700 text-2xl transition duration-300  hover:bg-red-100 h-10 w-10 rounded-full'/>
          </Modal>
        )
          
        }
    </div>
  )
}

export default Header