import React, { FC, ReactNode } from "react";
import { useDropzone, FileRejection, Accept } from "react-dropzone";

type FileDropZoneProps = {
  onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
  maxFiles?: number;
  containerClassName?: string;
  accept?: Accept;
  children?: (props: { open: () => void; isDragActive: boolean }) => ReactNode;
  multiple?: boolean;
  disabled?:boolean
};

const FileDropZone: FC<FileDropZoneProps> = ({
  onDrop,
  maxFiles = 5,
  accept,
  containerClassName = "bg-grey-100 rounded-lg py-4 px-6",
  children,
  multiple = true,
  disabled
}) => {
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    noClick: true,
    noKeyboard: true,
    multiple,
    disabled
  });

  return (
    <div
      className={`${containerClassName} border w-full cursor-pointer`}
      {...getRootProps()}
    >
      <input className="relative! hidden w-full h-full" {...getInputProps()} />
      {children ? (
        children({ open, isDragActive })
      ) : (
        <div
          onClick={open}
          className="flex flex-col justify-center items-center gap-3"
        >
          <p className="text-center">
            Click to upload or drag and drop <br /> File (max. 5 MB)
          </p>
        </div>
      )}
    </div>
  );
};

export default FileDropZone;
