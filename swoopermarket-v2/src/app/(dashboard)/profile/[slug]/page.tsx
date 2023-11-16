import ProfileListings from "@/components/ProfilePage/ProfileListings";
import ProfileHeader from '@/components/ProfilePage/ProfileHeader';
import { redirect } from 'next/navigation'

async function getUserInfo(id: string) {
  try {
    const res = await fetch(process.env.API_URL + 'api/user/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.log('Failed to fetch user listings')
      return null
    }
    return res.json()
  } catch(error) {
    console.log('Failed to fetch user listings')
    return null
  }
}

async function getUserListings(id: string) {
    try {
      const res = await fetch(process.env.API_URL + 'api/userlistings/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
      
      if (!res.ok) {
        console.log('Failed to fetch user listings')
        return null
      }
      return res.json()
    } catch(error) {
      console.log('Failed to fetch user listings')
      return null
    }
}

export default async function ProfilePage({ params }: { params: { slug: string } }) {
  const { slug } = params
  if(slug === "0") {
    redirect(`/login`);
  }

  // fetch user info
  const user_res = await getUserInfo(slug);
  let user_info;
  if (user_res === null) {
    redirect(`/login`);
  } else {
    user_info = user_res.user[0]
  }
  
  // fetch user listings
  const res = await getUserListings(slug);
  let user_listings;
  if(res === null) {
    user_listings = []
  } else {
    user_listings = res.user
  }
    
    return (
        <>
            <ProfileHeader user_info={user_info}/>
            <ProfileListings listings={user_listings} user_info={user_info}/>
        </>
    );
};
