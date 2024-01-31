import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const { user_id } = useParams();
  const [userData, setUserData] = useState({});
  const [editedUserData, setEditedUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    console.log(user_id);
    const fetchUserData = async () => {
      try {
        // Use GET request to retrieve user data
        const response = await axios.get(`http://localhost:3000/users/getuser/${user_id}`);
        console.log(response);
        setUserData(response.data.data);
        console.log(userData);
        // Initialize editedUserData with fetched data
        setEditedUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [user_id]);

  // Handle form field changes
  const handleFieldChange = (fieldName, value) => {
    setEditedUserData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const user_id = localStorage.getItem("userId");
    try {
      // Make an API call to update user data
      await axios.put(`http://localhost:3000/users/edituser/${user_id}`, editedUserData);
      setIsEditing(false);
      // Optionally, you can refetch user data after successful update
      // Fetch user data again to display the updated information
      // await fetchUserData();
    } catch (error) {
      console.error('Error updating user data:', error.message);
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden py-40">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-purple-700 uppercase">
          Profile
        </h1>

        {/* Display user data in editable form */}
        <form className="mt-6">
          <div className="mb-2">
            <label htmlFor="username" className="block text-sm font-bold text-gray-800">
              Username
            </label>
            {isEditing ? (
              <input
                type="text"
                id="username"
                value={editedUserData.username}
                onChange={(e) => handleFieldChange('username', e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            ) : (
              <div>{userData.username}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="firstname" className="block text-sm font-bold text-gray-800">
              First Name
            </label>
            {isEditing ? (
              <input
                type="text"
                id="firstname"
                value={editedUserData.firstname}
                onChange={(e) => handleFieldChange('firstname', e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            ) : (
              <span>{userData.firstname}</span>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="lastname" className="block text-sm font-bold text-gray-800">
              Last Name
            </label>
            {isEditing ? (
              <input
                type="text"
                id="lastname"
                value={editedUserData.lastname}
                onChange={(e) => handleFieldChange('lastname', e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            ) : (
              <span>{userData.lastname}</span>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-bold text-gray-800">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                id="email"
                value={editedUserData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            ) : (
              <span>{userData.email}</span>
            )}
          </div>
        </form>

        {/* Toggle between edit and save buttons */}
        <div className="mt-6">
          {isEditing ? (
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-800 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-800 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
