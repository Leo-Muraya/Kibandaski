import React from 'react';
import { Link } from 'react-router-dom';

const Profile = ({ user }) => {
  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-details">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <Link to="/home">Go to Homepage</Link>
    </div>
  );
};

export default Profile;
