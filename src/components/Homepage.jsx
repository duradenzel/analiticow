import { useState } from 'react';
import ImageUpload from "./ImageUpload";
import TopNav from "./Navigation/TopNav";
import Searchbar from "./Searchbar";
import RecordDetails from './RecordDetails';

const HomePage = () => {
  const [responseData, setResponseData] = useState(null);
  console.log(responseData)
  return (
    <div className="dark:bg-slate-800 min-h-screen flex flex-col">
      <TopNav />
      <main className="flex flex-1 flex-col items-center justify-center text-center gap-8">
        <div>
          <h4 className="text-xl font-semibold dark:text-white mb-4">
            Zoek een koe op levensnummer
          </h4>
          <Searchbar setResponseData={setResponseData} />
        </div>

        <div>
          <h5 className="text-lg font-semibold dark:text-white mb-4">
            Of upload een afbeelding
          </h5>
          <ImageUpload setResponseData={setResponseData} />
        </div>
      </main>

      {/* Render RecordDetails only once in the parent */}
      {responseData && <RecordDetails records={responseData} />}
    </div>
  );
};

export default HomePage;
