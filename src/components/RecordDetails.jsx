/* eslint-disable react/prop-types */
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

function RecordDetails({ record }) {
  if (!record) {
    return <p className="text-center my-4">No record data available.</p>;
  }

  const { Landcode, Levensnummer, Haarkleur, Geslacht, image, ...additionalDetails } = record;

  return (
    <Card className="w-full max-w-sm mx-auto shadow-md border rounded-lg bg-whitemt-3">
      <CardContent className="p-6 flex flex-col space-y-4">
        <h2 className="text-2xl font-bold text-left">
          {Landcode} {Levensnummer || "N/A"}
        </h2>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span className="font-medium ">Land</span>
                <span className="font-semibold capitalize">
                  {Landcode ?? "N/A"}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium ">Geslacht</span>
                <span className="font-semibold ">
                  {Geslacht ?? "N/A"}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium ">Haarkleur</span>
                <span className="font-semibold ">
                  {Haarkleur ?? "N/A"}
                </span>
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
                No image uploaded
              </div>
            )}
          </div>
        </div>

        {Object.keys(additionalDetails).length > 0 && (
          <Accordion type="single" collapsible className="w-full mt-4">
            <AccordionItem value="additionalDetails">
              <AccordionTrigger className="text-sm font-semibold">More Details</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {Object.entries(additionalDetails).map(([key, value]) => (
                    <li key={key} className="flex justify-between text-sm">
                      <span className="capitalize ">{key}</span>
                      <span className="font-medium ">
                        {value ?? "N/A"}
                      </span>
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
}

export default RecordDetails;
