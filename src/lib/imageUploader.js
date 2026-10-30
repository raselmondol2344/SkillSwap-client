export const imageUploader = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  console.log("ImgBB Response:", data);

  if (!res.ok) {
    throw new Error(data.error?.message || "Image upload failed");
  }

  return data.data;
};