"use client";

import React, { useState } from "react";
import { useFormState } from "react-dom";
import { createCategory } from "@/actions";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import FormButton from "@/components/common/form-button";
import { Layers } from "lucide-react";
import Image from "next/image";
import { MdOutlineClose } from "react-icons/md";

export default function CategoryCreateForm() {
  const [formState, action] = useFormState(createCategory, {});
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_UPLOAD_PRESET as string
      );
      formData.append(
        "cloud_name",
        process.env.NEXT_PUBLIC_CLOUD_NAME as string
      );

      // Upload to Cloudinary
      const res = await fetch(
        process.env.NEXT_PUBLIC_CLOUDINARY_URL as string,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      const { secure_url, original_filename, format } = data;

      setFileName(`${original_filename?.slice(0, 10)}...${format}`);
      setUploadedFileName(secure_url);
      setImageUrl(secure_url);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFileName(null);
    setImageUrl("");
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-xl p-8">
        <div className="text-center mb-8">
          <Layers className="mx-auto h-12 w-12 text-purple-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Create Category
          </h1>
        </div>
        <form action={action}>
          <div className="space-y-6">
            <Input
              name="name"
              label="Category Name"
              type="text"
              labelPlacement="outside"
              placeholder="e.g., Electronics"
              isInvalid={!!formState.errors?.name}
              errorMessage={formState.errors?.name?.join(", ")}
              className="w-full"
            />

            <div className="flex items-center space-x-4">
              {uploadedFileName ? (
                <div className="flex items-center space-x-4">
                  <Image
                    src={uploadedFileName}
                    alt="uploaded preview"
                    width={100}
                    height={100}
                    className="rounded-lg shadow-sm"
                  />
                  <div className="text-gray-700">{fileName}</div>
                  <MdOutlineClose
                    onClick={handleRemoveFile}
                    className="cursor-pointer"
                  />
                </div>
              ) : (
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 shadow-sm"
                  onChange={handleFileChange}
                />
              )}
            </div>

            {formState.errors?._form && (
              <div className="rounded-lg border-2 border-red-500 bg-red-100 p-3 text-red-700">
                {formState.errors._form?.join(", ")}
              </div>
            )}

            <FormButton className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg font-semibold transition duration-300 hover:from-purple-600 hover:to-indigo-700">
              Create Category
            </FormButton>

            <div className="text-center mt-4">
              <Link
                href="/"
                className="text-sm text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Cancel and return to home
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
