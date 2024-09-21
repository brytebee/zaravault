"use client";

import React, { useState } from "react";
import { createProduct } from "@/actions";
import { Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/form-button";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { MdOutlineClose } from "react-icons/md";

interface ProdCreateProps {
  catName: string;
}

export default function ProductCreateForm({ catName }: ProdCreateProps) {
  const [formState, action] = useFormState(
    createProduct.bind(null, catName),
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    await action(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-xl p-8">
        <div className="text-center mb-8">
          <ShoppingBag className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Create Product
          </h1>
          <p className="mt-2 text-gray-600">
            Add a new product to the {catName} category
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {formState.data?.message && (
            <div
              className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
              role="alert"
            >
              <p>{formState.data.message}</p>
            </div>
          )}
          <Input
            name="slug"
            label="Product Name"
            type="text"
            labelPlacement="outside"
            placeholder="e.g., leather-handbag"
            isInvalid={!!formState.errors?.slug}
            errorMessage={formState.errors?.slug?.join(", ")}
            required
            className="w-full"
          />
          <Textarea
            name="description"
            label="Product Description"
            labelPlacement="outside"
            placeholder="Briefly describe the product..."
            isInvalid={!!formState.errors?.description}
            errorMessage={formState.errors?.description?.join(", ")}
            required
            className="w-full"
          />

          {/* Add quantity and price fields here */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="quantity"
              label="Quantity"
              type="number"
              labelPlacement="outside"
              placeholder="200"
              isInvalid={!!formState.errors?.quantity}
              errorMessage={formState.errors?.quantity?.join(", ")}
              required
            />
            <Input
              name="price"
              label="Price ($)"
              type="number"
              labelPlacement="outside"
              placeholder="20.50"
              isInvalid={!!formState.errors?.price}
              errorMessage={formState.errors?.price?.join(", ")}
              required
            />
          </div>

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

          <FormButton
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg font-semibold transition duration-300 hover:from-purple-600 hover:to-indigo-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Product"}
          </FormButton>
        </form>
      </div>
    </div>
  );
}
