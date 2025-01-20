"use client";
import { useAuth } from '@/hooks/useAuth';
import React from 'react'

const page = () => {
      const { userDetails } = useAuth(); // Access user details from context
    
  return (
    <>
    
    {userDetails ? (
        <div>
          <h2>Welcome, {userDetails.name}</h2>
          <p>Email: {userDetails.email}</p>
            <p>Username: {userDetails.username}</p>
            <p>First Name: {userDetails.firstName}</p>
            <p>Last Name: {userDetails.lastName}</p>
            <p>Profile Picture: <img src={userDetails.profilePicture ?? ''} alt="Profile" /></p>
            <p>Bio: {userDetails.bio}</p>
            <p>Birthday: {userDetails.birthday}</p>
            <p>Gender: {userDetails.gender}</p>
            <p>External ID: {userDetails.externalId}</p>
            <p>Client IP: {userDetails.clientIp}</p>
            <p>User Agent: {userDetails.userAgent}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}</>
  )
}

export default page