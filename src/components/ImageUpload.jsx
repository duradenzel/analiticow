import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Upload } from 'lucide-react'


// eslint-disable-next-line react/prop-types
export default function ImageUpload({setResponseData}) {
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    const acceptedFile = acceptedFiles[0]
    setFile(acceptedFile)

    const reader = new FileReader()
    reader.onload = (event) => {
      setImage(event.target.result)
    }
    reader.readAsDataURL(acceptedFile)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'video/*': []
    },
    multiple: false
  })

  const removeImage = () => {
    setImage(null)
    setFile(null)
  }


  const handleSubmit = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      fetch('http://127.0.0.1:8000/process/', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.results && data.results.length > 0) {
            console.log(data)
            const closestRecord = data.results.reduce((min, curr) =>
              curr.distance < min.distance ? curr : min
            );
            const recordData = JSON.parse(closestRecord.record);
            
            const recordWithImage = { ...recordData[0], image: image }; 
            setResponseData(recordWithImage);
          }
        })
        .catch((error) => console.error('Error:', error));
  
      setImage(null);
      setFile(null);
    }
  };
  

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
            }`}
          >
            <input {...getInputProps()} />
            {!image && (
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-20" />
            )}
            {image ? (
              <div className="relative">
                {file.type.startsWith('image/') ? (
                  <img
                    src={image}
                    alt="Uploaded preview"
                    className="max-w-full h-auto rounded-lg"
                  />
                ) : (
                  <video
                    src={image}
                    controls
                    className="max-w-full h-auto rounded-lg"
                  />
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <p className="text-gray-500 relative z-10">
                Sleep een afbeelding of video, of klik om een bestand te selecteren
              </p>
            )}
          </div>
        </CardContent>
        {image && (
          <CardFooter className="flex justify-end">
            <Button onClick={handleSubmit} aria-label="Submit image">
              Submit Image
            </Button>
          </CardFooter>
        )}
      </Card>

    
    </>
  )
}
