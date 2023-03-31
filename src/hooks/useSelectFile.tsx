import React, { ChangeEvent, useState } from 'react';

const useSelectFile = () => {
  const [selectedFile, setSelectedFile] = useState<string>('')

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()

    const files = e.target.files?.[0]

    if (files) {
      reader.readAsDataURL(files)
    }

    reader.onload = (readerEvent) => {
      const result = readerEvent.target?.result
      if (result) {
        setSelectedFile(result as string)
      }
    }
    console.log(selectedFile)
  }

  return {
    selectedFile,
    setSelectedFile,
    onSelectFile
  }
}
export default useSelectFile;