import React from "react";
import { useAuth } from "../../../context/AuthProvider";
import { Edit, Mail, MapPin, PhoneCall, User } from "react-feather";
import { Link } from "react-router-dom";

const ProfilePreview = () => {
  const { userProfile, setUserProfile } = useAuth();

  return (
    <div className="bg-white rounded w-11/12 lg:w-1/2 xl:w-1/3 md:w-3/4 sm:w-4/5 shadow-md flex flex-col gap-5 py-6 mx-auto mt-6">
      <div className="w-full flex justify-between items-center px-8">
        <h1 className="text-xl text-gray-600 font-medium">Profile Settings</h1>
        <Link to="edit">
          <Edit className="text-gray-400 cursor-pointer" />
        </Link>
      </div>
      <div className="flex flex-col items-center w-full bg-white rounded p-4">
        <div className="w-36 h-36 overflow-hidden flex items-center justify-center border-[6px] rounded-full">
          <img
            className="w-full"
            src={userProfile?.profilePicture}
            alt={userProfile?.name}
          />
        </div>
        <div className="p-6">
          <h2 className="text-lg flex last:mb-0 mb-6 last:border-b-0 border-b border-gray-300 p-2 pb-3 gap-4 text-gray-500">
            <User /> {userProfile?.name}
          </h2>
          <h2 className="text-lg flex last:mb-0 mb-6 last:border-b-0 border-b border-gray-300 p-2 pb-3 gap-4 text-gray-500">
            <Mail /> {userProfile?.contact?.email}
          </h2>
          <h2 className="text-lg flex last:mb-0 mb-6 last:border-b-0 border-b border-gray-300 p-2 pb-3 gap-4 text-gray-500">
            <PhoneCall /> {userProfile?.contact?.contactNumber}
          </h2>
          <h2 className="text-lg flex last:mb-0 mb-6 last:border-b-0 border-b border-gray-300 p-2 pb-3 gap-4 text-gray-500">
            <MapPin />
            {userProfile?.address}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
