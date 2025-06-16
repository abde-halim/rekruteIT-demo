import { uploadImageToCloudinary } from "./uploadImageToCloudinary";

export const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    toast.error("Please select an image file");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    toast.error("Image size must be less than 5MB");
    return;
  }

  // setUploadingImage(true);

  try {
    const imageUrl = await uploadImageToCloudinary(file);
    setForm((prevForm) => ({
      ...prevForm,
      image: imageUrl,
    }));
    await dispatch(
      updateCandidate({
        id: candidateId,
        candidateData: { ...form, image: imageUrl },
      })
    );

    toast.success("Profile image updated successfully!");
  } catch (error) {
    console.error("Image upload error:", error);
    toast.error("Failed to upload image. Please try again.");
  } finally {
    // setUploadingImage(false);
  }
};
