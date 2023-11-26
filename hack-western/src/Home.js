// Home.js
import React from 'react';

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-center text-5xl font-heading">
        Welcome to <br />
      </h1>
      <div className="relative mt-4">
        <img
          src="123.gif"
          alt="Level up logo"
          className="w-full h-auto"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl font-impact text-white">
        </h1>
      </div>
    </main>
  );
}
