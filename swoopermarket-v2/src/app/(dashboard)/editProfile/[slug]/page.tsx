import EditProfileForm from '@/components/EditProfile/EditProfileForm';
import { User } from '@/types/user';
import { redirect } from 'next/navigation';

async function getUser(id: string) {
  try {
    const res = await fetch(process.env.API_URL + 'api/user/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.log('Failed to fetch single user data')
      return null
    }
    return res.json()
  } catch(error) {
    console.log('Failed to fetch single user data')
    return null
  }
}

export default async function EditProfilePage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // fetch user info
  const res = await getUser(slug);
  let user: User
  if(res === null) {
    // redirect back to profile page for user
    redirect(`/profile/${slug}`)
  } else {
    user = res.user[0]
  }

  return(
    <EditProfileForm user={user}/>
  )
}



