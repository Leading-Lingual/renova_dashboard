"use client";

import { useCallback } from "react";
import { FileRejection } from "react-dropzone";
import UploadIcon from "@iconify-react/basil/cloud-upload-outline";
import FileSwap from "@iconify-react/material-symbols/replace-image-outline";
import Image from "next/image";
import FileDropZone from "./FiledropZone";
import { Button } from "./ui/button";
import { formatFileSize } from "@/lib/utils";

type ImageUploadProps = {
  value: File[];
  onChange: (files: File[]) => void;
  error?: boolean;
  multiple?: boolean;
  maxImages?: number;
  disabled?: boolean;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ImageUpload = ({
  value,
  onChange,
  error,
  multiple,
  maxImages = 3,
  disabled,
}: ImageUploadProps) => {
  const handleDrop = useCallback(
    (acceptedFiles: File[], _fileRejections: FileRejection[]) => {
      const remainingSlots = maxImages - value.length;

      if (remainingSlots <= 0) return;

      const newFiles = acceptedFiles
        .filter((file) => file.size <= MAX_FILE_SIZE)
        .slice(0, remainingSlots);

      onChange([...value, ...newFiles]);
    },
    [value, onChange, maxImages],
  );

  const removeImage = (index: number) => {
    onChange(value.filter((_, fileIndex) => fileIndex !== index));
  };

  const replaceImage = (index: number) => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/png,image/jpeg";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];

      if (!file || file.size > MAX_FILE_SIZE) return;

      const updatedFiles = [...value];
      updatedFiles[index] = file;

      onChange(updatedFiles);
    };

    input.click();
  };
  return (
    <FileDropZone
      onDrop={multiple ? handleDrop : onChange}
      multiple={multiple}
      maxFiles={maxImages}
      disabled={disabled}
      accept={{
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
      }}
      containerClassName={`rounded-[8px]  ${value.length > 0 ? "bg-black-50/38 border-none" : "border-2 border-dashed"} p-3 ${
        error ? "border-red-600" : ""
      }`}
    >
      {({ open, isDragActive }) => (
        <div
          onClick={value.length !== 0 ? undefined : open}
          className={`flex ${value.length < 0 ? "cursor-pointer" : "cursor-default"} flex-col items-center justify-center gap-2 md:gap-3`}
        >
          {value.length > 0 ? (
            <>
              <p className="text-m-bold text-start w-full">
                Image{value.length > 1 && "s"}
              </p>
              {value.map((file, index) => (
                <div
                  key={`${file.name}${index}`}
                  className="flex w-full justify-between items-center text-black-500"
                >
                  <div className="flex gap-4 min-w-0">
                    <div className="shrink-0 w-10 h-10 md:w-26.5 md:h-18 rounded-[8px] overflow-hidden">
                      <Image
                        width={106}
                        height={72}
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <p className="text-s font-bold md:text-m-bold truncate">{file.name}</p>
                      <p className="text-s">{formatFileSize(file.size)}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center shrink-0">
                    <FileSwap
                      onClick={() => replaceImage(index)}
                      className="size-6 cursor-pointer"
                    />

                    <Button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="rounded-full  px-2 py-1 text-2s-medium! font-normal! md:text-xs cursor-pointer"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <UploadIcon className="text-black-700 w-6 h-6 md:w-[51.16px] md:h-[32.76px]" />
              <p className="text-center font-medium hidden md:flex">
                {isDragActive
                  ? "Drop your images here"
                  : "Drag and drop your waste material images here"}
              </p>
              <p className="text-s font-medium flex md:hidden">
                Click and upload your waste material image here
              </p>

              <p className="hidden md:flex">or</p>

              <div className="flex flex-col gap-2 items-center justify-center">
                <Button
                  type="button"
                  className="h-12! w-full max-w-64.75 rounded-full bg-black-400 hover:bg-black-300 hidden md:flex"
                >
                  Select Image
                </Button>
                <p className="text-black-500 text-2s-medium font-normal md:text-sm text-center">
                  Accepted formats: PNG, JPEG, JPG, PNG (Max 5MB)
                </p>
                {maxImages && multiple && (
                  <p className="text-black-500 text-sm">
                    Select a max of {maxImages} files
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </FileDropZone>
  );
};

export default ImageUpload;
