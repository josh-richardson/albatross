import './Dropzone.css'
import { useDropzone } from 'react-dropzone'
import React, { useCallback, useState } from 'react'

const Dropzone = props => {
  const onDrop = useCallback(
    acceptedFiles => {
      setText('Selected: ' + acceptedFiles.map(x => x.name).join(', '))
      props.onSelected(acceptedFiles)
    },
    [props]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const [promptText, setText] = useState("Drag 'n' drop your " + props.filename + ' here, or click to select...')

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the {props.filename} here ...</p> : <p>{promptText}</p>}
    </div>
  )
}
export default Dropzone
