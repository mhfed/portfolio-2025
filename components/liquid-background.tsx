import React from 'react'

export function LiquidBackground() {
  return (
    <div className='fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#FAFAFA]'>
      {/* Liquid Blobs */}
      <div className='absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-zinc-300/40 mix-blend-multiply filter blur-[100px] animate-blob' />
      <div className='absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-slate-300/40 mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000' />
      <div className='absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-gray-300/40 mix-blend-multiply filter blur-[120px] animate-blob animation-delay-4000' />
      
      {/* Frost Overlay */}
      <div className='absolute inset-0 bg-white/30 backdrop-blur-[80px]' />
    </div>
  )
}
