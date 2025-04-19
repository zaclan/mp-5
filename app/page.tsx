'use client';

import ShortenerForm from './components/ShortenerForm';

export default function Home() {

  return (
    <div>
      <header className="flex justify-between items-center h-20">
      <h1 className="text-4xl font-semibold p-4">CS391 URL Shortener</h1>
      </header>
      <ShortenerForm/>
    </div>
      
  );
}









