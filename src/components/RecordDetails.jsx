import { Card, CardContent, CardFooter } from "@/components/ui/card";

// eslint-disable-next-line react/prop-types
function RecordDetails({ record, image }) {
  if (!record) {
    return <p>No record data available.</p>;
  }

  return (
    <Card className="w-full max-w-md mx-auto my-4">
        <img src={image} alt="" />
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Record Details</h2>
        <ul className="space-y-2">
          {Object.entries(record).map(([key, value]) => (
            <li key={key} className="flex justify-between border-b pb-2">
              <p className="font-medium  dark:text-white capitalize">{key}:</p>
              <p className=" dark:text-white">{value ?? "N/A"}</p>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-4 text-center">
        <p className="text-gray-500">End of Record</p>
      </CardFooter>
    </Card>
  );
}

export default RecordDetails;
