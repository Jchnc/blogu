import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "akar-icons";

export default function ImageInput() {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".webp"]
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs = files.map(file => (
    <div key={file.name} className="inline">
      <div className="flex items-center gap-2 flex-col">
        <Image
          className="rounded-xl object-cover"
          src={file.preview}
          alt={`Image ${file.name} Preview`}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          width={960}
          height={300}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  });

  return (
    <section className="text-txt-secondary text-center flex flex-col-reverse justify-center gap-3">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="rounded-xl p-2 cursor-pointer border-bg-borders border-[1px]">
          {files.length >= 1 ? (
            <p className="ml-2 flex items-center gap-3">
              <ImageIcon size={16} />
              {files[0]?.name}
            </p>
          ) : (
            <p className="ml-2 flex items-center gap-3">
              <ImageIcon size={16} />
              <strong>Choose a file</strong> or drag it here.
            </p>
          )}
        </div>
      </div>
      <aside>{thumbs}</aside>
    </section>
  );
}
