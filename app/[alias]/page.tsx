import getCollection, { URL_COLLECTION } from '@/db';
import getOriginalUrl from '@/lib/getOriginalUrl';
import { redirect } from 'next/navigation';

export default async function RedirectPage({ params }: {params: Promise<{alias: string}>}) {
  const {alias} = await params;
  console.log(alias); 

  const url = await getOriginalUrl(alias); 
    if (!url) {
        return redirect("/");
    }
    return redirect(url);

}