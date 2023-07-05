import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import { IFile } from "../types/types";

export const uploadImage = async (image: IFile, location: string) => {
  const storageRef = ref(storage, `${location}${image.filename}`);
  const uploadTask = await uploadBytes(storageRef, image.file);
  const downloadURL = await getDownloadURL(uploadTask.ref);
  return downloadURL;
};

export const compressImage = (
  file: File,
  size: { height: number; width: number }
) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const maxWidth = size.width;
      const maxHeight = size.height;
      let width = image.width;
      let height = image.height;
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")?.drawImage(image, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/jpeg",
        0.9
      );
    };
    image.src = URL.createObjectURL(file);
  });
};
