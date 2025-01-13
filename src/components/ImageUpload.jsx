/* eslint-disable react/prop-types */
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Upload } from 'lucide-react'

export default function ImageUpload({ setResponseData }) {
  const [images, setImages] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages(prev => [...prev, ...newImages])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'video/*': []
    },
    multiple: true
  })

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (images.length > 0) {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('files', image.file);
      });

      try {
        const response = await fetch('http://127.0.0.1:8000/process/', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data?.results && data.results.length > 0) {
          const processedResults = data.results.flatMap((result, index) => {
            if (Array.isArray(result)) {
              return result.map(item => ({
                ...item,
                image: images[index].preview
              }));
            }
            return [];
          });
          setResponseData(processedResults);
        }
      } catch (error) {
        console.error('Error:', error);
      }

      setImages([]);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
          }`}
        >
          <input {...getInputProps()} />
          {images.length === 0 && (
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-20" />
          )}
          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  {image.file.type.startsWith('image/') ? (
                    <img
                      src={image.preview}
                      alt={`Uploaded preview ${index + 1}`}
                      className="max-w-full h-auto rounded-lg"
                    />
                  ) : (
                    <video
                      src={image.preview}
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
                      removeImage(index);
                    }}
                    aria-label={`Remove file ${index + 1}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 relative z-10">
              Sleep afbeeldingen of videos, of klik om bestanden te selecteren
            </p>
          )}
        </div>
      </CardContent>
      {images.length > 0 && (
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit} aria-label="Submit images">
            Submit Images
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
//
