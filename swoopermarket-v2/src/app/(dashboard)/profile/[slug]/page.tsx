import ProfileListings from "@/components/ProfilePage/ProfileListings";
import ProfileHeader from '@/components/ProfilePage/ProfileHeader';
import RequireLogin from "@/components/ProfilePage/RequireLogin";

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
    return (
      <RequireLogin />
    )
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
            <ProfileHeader />
            <ProfileListings listings={user_listings}/>
        </>
    );
};