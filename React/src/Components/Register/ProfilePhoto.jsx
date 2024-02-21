import React, { useState } from "react";

const ProfilePhoto = ({ file }) => {
  const [preview, setPreview] = useState(null);
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }
  return (
    <img
      className="profile_photo_display"
      src={
        file ? preview : "src/icons/customer_man_user_account_profile_icon.svg"
      }
      alt="up"
    />
  );
};

export default ProfilePhoto;
