import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <div>
                <img className='rounded-t-full rounded-b-full w-11 ' src={user.picture} alt={user.name}/>
                {/* <h2>{user.name}</h2>
                <p>{user.mail}</p> */}
            </div>

        )
    )
}

export default Profile