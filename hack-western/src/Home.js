import React from 'react'

export default function Home() {
  return (
    <main>
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Welcome to<br/>
          <span className="text-8xl">Mocker.</span>
        </h1>
        <p>Helping students get closer to their dream internship</p>
        <div className="flex gap-5">
          <button className="bg-black text-white font-bold rounded p-3" onClick={()=> window.location.href='/ChatRoom'}>Start Now</button>
          <button className="bg-transparent p-3" onClick={() => window.location.href='/LearnMore'}>Learn More</button>
        </div>
      </div>
    </div>
  </main>
  )
}
