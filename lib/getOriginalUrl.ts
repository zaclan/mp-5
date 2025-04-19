"use server"
import getCollection, {URL_COLLECTION} from "@/db"

export default async function getOriginalUrl(alias: string,): Promise<string|null> {
    
    const collection = await getCollection(URL_COLLECTION);
    const data = await collection.findOne({alias}); 
    /*console.log(data)*/

    if (data === null) {
        return null;
    }

    return data.original;
}