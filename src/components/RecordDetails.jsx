/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AlertTriangle } from 'lucide-react';

function RecordDetails({ records }) {
  const [expandedRecords, setExpandedRecords] = useState([]);

  if (!records || records.length === 0) {
    return <p className="text-center my-4">No record data available.</p>;
  }

  const confidenceThreshold = 2;

  const toggleWarning = (index) => {
    setExpandedRecords(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-6">
      {records.map((record, index) => { 
        var parsedRecord = JSON.parse(record.record);
        const image = record.image;
        parsedRecord = parsedRecord[0];
        const { Landcode, Levensnummer, Haarkleur, Geslacht, distance, ocr_text, ...additionalDetails } = parsedRecord;
        const isWarningExpanded = expandedRecords.includes(index);
  
        return (
          <Card key={index} className="w-full max-w-sm mx-auto shadow-md border rounded-lg">
            <CardContent className="p-6 flex flex-col space-y-4">
              <h2 className="text-2xl font-bold text-left">
                {Landcode} {Levensnummer || "N/A"}
              </h2>
  
              {distance > confidenceThreshold && (
                <div 
                  className={`relative overflow-hidden transition-all duration-200 ease-in-out ${
                    isWarningExpanded ? 'h-auto w-full p-4' : 'w-10 h-10 rounded-full'
                  } bg-[#FFBE56] cursor-pointer`}
                  onClick={() => toggleWarning(index)}
                >
                  <div className={`absolute inset-0 flex items-center justify-center ${
                    isWarningExpanded ? 'opacity-0' : 'opacity-100'
                  } transition-opacity duration-1000`}>
                    <AlertTriangle className="w-6 h-6" />
                    <div className="absolute inset-0 animate-ping bg-yellow-200 opacity-75"></div>
                  </div>
                  <div className={`${isWarningExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
                    <h3 className="text-lg font-semibold mb-2">Onzekere lezing</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="font-medium">Zekerheid afstand:</span>
                        <span>{distance}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Uitgelezen waarde:</span>
                        <span>{ocr_text || "N/A"}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Gekozen Levensnummer:</span>
                        <span>{Levensnummer || "N/A"}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
  
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span className="font-medium">Land</span>
                      <span className="font-semibold capitalize">{Landcode ?? "N/A"}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Geslacht</span>
                      <span className="font-semibold">{Geslacht ?? "N/A"}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Haarkleur</span>
                      <span className="font-semibold">{Haarkleur ?? "N/A"}</span>
                    </li>
                  </ul>
                </div>
  
                <div className="w-36 h-54 flex-shrink-0">
                  {image ? (
                    <img
                      src={image}
                      alt="Uploaded Image"
                      className="w-full h-full object-cover rounded-md shadow"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500 dark:text-gray-400 text-sm rounded-md">
                      Geen afbeelding beschikbaar
                    </div>
                  )}
                </div>
              </div>
  
              {Object.keys(additionalDetails).length > 0 && (
                <Accordion type="single" collapsible className="w-full mt-4">
                  <AccordionItem value="additionalDetails">
                    <AccordionTrigger className="text-sm font-semibold">Meer Details</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {Object.entries(additionalDetails).map(([key, value]) => (
                          <li key={key} className="flex justify-between text-sm">
                            <span className="capitalize">{key}</span>
                            <span className="font-medium">{value ?? "N/A"}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </CardContent>
  
            <CardFooter className="p-4 text-center text-gray-500 dark:text-gray-400 text-xs border-t">
              Scanned on: {new Date().toLocaleString()}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
  
}

export default RecordDetails;

