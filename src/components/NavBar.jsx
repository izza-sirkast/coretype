import React from 'react'
import { SlCursor } from 'react-icons/sl'
import Link from 'next/link'

function NavBar() {
  return (
    <nav className='sticky flex top-0 mx-auto justify-between w-4/5 items-start pt-4'>
        <div className='flex items-start'>
            <SlCursor className='text-light-blue text-4xl mr-2 mt-2' />
            <div className='flex flex-col items-end'>
                <p className='text-xl text-white mt-1'>CoreType</p>
                <p className='text-light-blue text-xs'>Typing Test</p>
            </div>
        </div>

        <Link href={'/'} className=' bg-slate-400 bg-opacity-30 px-6 py-1 text-white rounded-3xl hover:bg-opacity-60 transition-all ease-in mb-6 mt-2' >Home</Link>
    </nav>
  )
}

export default NavBar