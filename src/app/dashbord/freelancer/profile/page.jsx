
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { imageUploader } from "@/lib/imageUploader";
import Image from "next/image";

export default function ClientProfile() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex min-h-[250px] items-center justify-center text-slate-500">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-5 text-center text-red-500">
        Please login to view your profile.
      </div>
    );
  }

  return (
    <ProfileContent key={user.id} user={user} refetch={refetch} />
  );
}

function ProfileContent({ user, refetch }) {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user.image || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Image preview cleanup
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Select image
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size must be less than 5MB.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  };

  // Save profile
  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      setMessage("Name cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      let imageUrl = user.image || "";

      if (image) {
        const uploadedImage = await imageUploader(image);
        imageUrl = uploadedImage.url;
      }

      const updateData = {
        name: name.trim(),
      };

      if (image) {
        updateData.image = imageUrl;
      }

      const { error } = await authClient.updateUser(updateData);

      if (error) {
        throw new Error(error.message || "Profile update failed");
      }

      await refetch();

      setImage(null);
      setPreview(imageUrl);
      setEditMode(false);
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setName(user.name || "");
    setPreview(user.image || "");
    setImage(null);
    setEditMode(false);
    setMessage("");
  };

  return (
    <div className="bg-slate-50 p-3 sm:p-4 lg:p-5">

      {/* Page Header */}
      <div className="mb-3">
        <h2 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
          My Profile
        </h2>
      </div>

      {/* Profile Card */}
      <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        {/* Cover */}
        <div className="relative h-24 overflow-hidden bg-gradient-to-r from-slate-800 via-blue-900 to-blue-700 sm:h-28">
          <div className="absolute -right-5 -top-20 h-52 w-52 rounded-full border-[25px] border-white/10" />
          <div className="absolute right-32 top-8 h-24 w-24 rounded-full border-[15px] border-white/10" />
        </div>

        <div className="px-4 pb-5 sm:px-6 md:px-7">

          {/* Profile Header */}
          <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-end sm:justify-between">

            {/* Profile Image */}
            <div className="-mt-11 flex min-w-0 items-end gap-3 sm:-mt-12">
              <div className="relative shrink-0">
                <Image
                  src={preview || "https://placehold.co/150x150?text=User"}
                  alt="Profile"
                  width={112}
                  height={112}
                  unoptimized
                  className="h-24 w-24 rounded-xl border-4 border-white bg-slate-100 object-cover shadow-md sm:h-28 sm:w-28"
                />

                {editMode && (
                  <label className="absolute -bottom-1 -right-1 cursor-pointer rounded-md border-2 border-white bg-blue-600 px-2.5 py-1.5 text-xs font-semibold text-white shadow hover:bg-blue-700">
                    Change
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="min-w-0 pb-1">
                <h3 className="truncate text-base font-bold text-slate-800 sm:text-lg">
                  {user.name || "User"}
                </h3>

                <p className="mt-1 break-all text-xs text-slate-500 sm:text-sm">
                  {user.email}
                </p>

                <span className="mt-1.5 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold capitalize text-blue-700">
                  {user.role || "Client"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {!editMode ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(true);
                    setMessage("");
                  }}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mt-3 rounded-lg border px-3 py-2 text-sm ${
                message.includes("successfully")
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          {/* Personal Information */}
          <div className="pt-4">
            <h3 className="mb-3 text-base font-bold text-slate-800">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              {/* Full Name */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-600">
                  Full Name
                </label>

                {editMode ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                ) : (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800">
                    {user.name || "Not available"}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-600">
                  Email Address
                </label>

                <div className="break-all rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800">
                  {user.email || "Not available"}
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-600">
                  Account Type
                </label>

                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm capitalize text-slate-800">
                  {user.role || "Client"}
                </div>
              </div>

              {/* Email Verification */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-600">
                  Email Verification
                </label>

                <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
                  <span
                    className={`inline-flex items-center gap-2 text-sm font-medium ${
                      user.emailVerified ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        user.emailVerified ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    {user.emailVerified ? "Verified" : "Not Verified"}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
