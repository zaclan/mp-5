import createNewUrl from "@/lib/createNewUrl";
import { useState } from "react";

const isValidUrl = (urlString: string): boolean => {
  try { 
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false; 
  }
}; 
const BASE_URL = "https://mp-5-hazel.vercel.app/";


export default function ShortenerForm() {
    const [original, setOriginal] = useState("");
    const [alias, setAlias] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    

    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null); 
      setShortenedUrl(null); 

      if (!isValidUrl(original)) {
        setError("Invalid URL: Could not verify URL. Please try again.")
        return;
      }

      try {
        const result = await createNewUrl(original, alias); 
        setShortenedUrl(result.alias);
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.message === "Alias URL already taken.") {
            setError("The provided alias already exists. Please use a different alias.")
          } else {
            setError("An error occured while creating the new URL.")
          }
        } else {
            setError("Unkown error occured.")
        }
      }
    };

    return(
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white">
          <div className="max-w-2xl mx-auto my-5 p-6 font-sans">
              <form onSubmit={onSubmit} className="flex flex-col gap-8 text-center">
                  <div className="flex justify-center">
                      <div className="w-96">
                          <label className="text-[#333] text-lg font-bold mb-2 block">
                              Original URL
                              <input
                                  type="text"
                                  value={original}
                                  onChange={(e) => setOriginal(e.target.value)}
                                  placeholder="https://example.com/"
                                  className="p-2 mt-2 w-full border rounded-md focus:ring-2 focus:ring-sky-500"
                                  required
                              />
                          </label>
                      </div>
                  </div>

                  <div className="flex justify-center">
                      <div className="w-96">
                          <label className="text-[#333] text-lg font-bold mb-2 block">
                              Custom Alias
                              <div className="flex items-center gap-2 mt-2">
                                  <span className="whitespace-nowrap text-[#333]">{BASE_URL}</span>
                                  <input
                                      type="text"
                                      value={alias}
                                      onChange={(e) => setAlias(e.target.value)}
                                      placeholder="your-custom-alias"
                                      className="p-2 border rounded-md flex-grow max-w-64 focus:ring-2 focus:ring-sky-500"
                                      required
                                  />
                              </div>
                          </label>
                      </div>
                  </div>

                  <button
                      type="submit"
                      className="bg-sky-600 text-white px-8 py-4 text-lg font-bold rounded-lg cursor-pointer hover:bg-sky-700 transition-colors self-center"
                  >
                      Shorten URL
                  </button>
              </form>

              {error && <p className="text-black text-center font-bold mt-4">{error}</p>}
              {shortenedUrl && (
                  <div className="flex justify-center">
                      <div className="text-center mt-5 p-4 border-2 border-sky-300 rounded-lg bg-white max-w-2xl">
                          <p className="text-[#333] font-bold mb-2">Your shortened URL:</p>
                          <a
                              href={`${BASE_URL}${shortenedUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sky-600 font-medium underline hover:text-sky-700"
                          >
                              {`${BASE_URL}${shortenedUrl}`}
                          </a>
                      </div>
                  </div>
              )}
          </div>
      </div>
  );

}