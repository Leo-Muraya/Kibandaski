import React from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));  //retrieve user info from localStorage
  
  if (!user) {
    return null;  //returns nothing if the user is not logged in
  }

  return (
    <div className="profile-tab">
      <span>Welcome, {user.name}</span>
    </div>
  );
};

export default Profile;
