"use server";
import getCollection, { URL_COLLECTION } from "@/db";
import { UrlProps } from "@/type";


export default async function createNewUrl(original: string, alias: string): Promise<UrlProps>{
    const p = {
        original: original, 
        alias: alias

    }

    try { 
        new URL(original)
    } catch {
        throw new Error("URL Structure is Invalid.") 
    }

    try {
        const response = await fetch(original, {
            method: 'HEAD', 
            redirect: 'follow',
        });

        if (!response.ok) {
            throw new Error("URL is unreachable and returns a error.")
        }
    } catch {
        throw new Error("Something went wrong fetching URL.")
    }

    const collection = await getCollection(URL_COLLECTION);
    const foundAlias = await collection.findOne({alias}); 
    if (foundAlias) {
        throw new Error("Alias URL already taken.")
    }

    const res = await collection.insertOne({... p})
    if (!res.acknowledged) {
        throw new Error("DB insert failed.")
    }

    return p
}