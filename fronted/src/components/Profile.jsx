import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [userProfile, setUserProfile] = useState({ displayName: '', email: '' });
  const [name, setName] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('UserProfile');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserProfile(parsedData);
      setName(parsedData.displayName);
    }
  }, []);

  const handleSave = async () => {
    try {
      const auth = getAuth();
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const updatedProfile = {
          displayName: name,
          email: auth.currentUser.email,
        };

        setUserProfile(updatedProfile);
        localStorage.setItem('UserProfile', JSON.stringify(updatedProfile));
        setEditMode(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <h2 className="card-title mb-4">Profile</h2>

          <div className="d-flex align-items-center mb-4">
            <div className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-3" style={{ width: '60px', height: '60px', fontSize: '24px' }}>
              {userProfile.displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              {editMode ? (
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <h5 className="mb-0">{userProfile.displayName}</h5>
              )}
              <small className="text-muted">{userProfile.email}</small>
            </div>
          </div>

          <div className="d-flex gap-2 mt-4">
            {editMode ? (
              <>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-outline-secondary" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
