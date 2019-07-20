import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./Dropzone.css";

const Dropzone = (props) => {
  const onDrop = useCallback(acceptedFiles => {
    props.onSelected(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the {props.filename} here ...</p> :
          <p>Drag 'n' drop your {props.filename} here, or click to select...</p>
      }

    </div>
  );
};
export default Dropzone;
