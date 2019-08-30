import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./Dropzone.css";

const Dropzone = props => {
  const onDrop = useCallback(acceptedFiles => {
    setText("Selected: " + acceptedFiles.map(x => x.name).join(", "));
    props.onSelected(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [promptText, setText] = useState(
    "Drag 'n' drop your " + props.filename + " here, or click to select..."
  );

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the {props.filename} here ...</p>
      ) : (
        <p>{promptText}</p>
      )}
    </div>
  );
};
export default Dropzone;
