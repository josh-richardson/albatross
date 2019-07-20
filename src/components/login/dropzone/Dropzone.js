import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./Dropzone.css";

const Dropzone = (props) => {
  const onDrop = useCallback(acceptedFiles => {
    props.performLogin(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the keyfile here ...</p> :
          <p>Drag 'n' drop your keyfile here, or click to select it...</p>
      }

    </div>
  );
};
export default Dropzone;
