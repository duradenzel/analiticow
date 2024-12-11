import ImageUpload from "./ImageUpload";
import TopNav from "./Navigation/TopNav";
import Searchbar from "./Searchbar";
import WelcomeCard from "./WelcomeCard";

const HomePage = () => {
  return (
    <div className="dark:bg-slate-800 min-h-screen flex flex-col">
      <TopNav />
      <main className="flex flex-1 flex-col items-center justify-center text-center gap-8">
        <div className="border w-full p-8 m-auto flex justify-center">
          <WelcomeCard/>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold dark:text-white mb-4">
            Zoek een koe op levensnummer
          </h4>
          <Searchbar />
        </div>

        <div>
        <h5 className="text-lg font-semibold dark:text-white mb-4">
            Of upload een afbeelding
          </h5>
          <ImageUpload />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
