import EditListingForm from '@/components/EditListing/EditListingForm';
import { ItemType } from '@/types/itemType';
import { redirect } from 'next/navigation';

async function getSingleListing(id: string) {
  try {
    const res = await fetch(process.env.API_URL + 'api/listing/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.log('Failed to fetch single item data')
      return null
    }
    return res.json()
  } catch(error) {
    console.log('Failed to fetch single item data')
    return null
  }
}

export default async function EditListingPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // fetch listing
  const res = await getSingleListing(slug);
  let listing: ItemType
  if(res === null) {
    redirect(`/singleitem/${slug}`)
  } else {
    listing = res.product[0]
  }

  return(
    <EditListingForm listing={listing}/>
  )
}