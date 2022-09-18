import type { NextPage } from 'next'
import { Transition } from "@headlessui/react";
import React from "react";
import Image from 'next/image'
import InviteModal from '../components/inviteModal';


const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex p-4 border-b border-green-600 align-center md:p-6">
        <h1 className='text-xl font-black text-green-900 md:text-3xl'>Broccoli & Co.</h1>
      </header>

      <main className="flex flex-col justify-center flex-1 p-8 text-center text-green-900 align-center">
        <Transition
          appear={true}
          show={true}
          enter="transition-opacity duration-1500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <h1 className="text-2xl font-black text-green-900 md:text-6xl">A better way to enjoy every day.</h1>
        </Transition>

        <p className='mt-6 text-sm text-green-900 md:text-xl md:mt-8'>Be the first to know when we launch.</p>

        <div className='inline-flex justify-center h-12 my-6 md:my-8 md:h-24'>
          <Image src="/chillBroccoli.png" alt="Broccoli relaxing" width={100} height={100} className="object-contain"/>
        </div>

        <InviteModal/>
      </main>

      <footer className="flex flex-col p-4 text-center border-t border-green-600 md:p-6">
        <p className='text-xs text-green-900 md:text-base'>
          Made with 
          <span className="inline-flex h-4 mx-1">
              <Image src="/heart.svg" alt="Heart" width={20} height={20} className="object-contain" />
          </span>
          in Melbourne
        </p>
        <p className='text-xs italic text-green-900 md:text-base'>
          @ 2018 Broccoli & Co. All rights reserved. 
        </p>
      </footer>
    </div>
  )
}

export default Home