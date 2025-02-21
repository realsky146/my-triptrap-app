import React, { useState } from 'react';

const profile = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // ทำการส่งข้อมูลที่กรอกมา
    console.log('Username:', username);
    console.log('Bio:', bio);
  };

  return (
    <div className="profile">
      <h1>Create Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          placeholder="Write a bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default profile
