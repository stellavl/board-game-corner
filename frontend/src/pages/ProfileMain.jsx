import React from 'react';
import { useLocation } from 'react-router-dom';
import users from '../data/users';

const ProfileMain = () => {
    const location = useLocation();
    const { userId } = location.state || {};
    const user = users.find(user => user.id === userId);

    return (
        <>
            {user ? (
            <p>Welcome, {user.firstName} {user.lastName}!</p>
          ) : (
            <p>User not found</p>
          )}
        </>
    );
};

export default ProfileMain;