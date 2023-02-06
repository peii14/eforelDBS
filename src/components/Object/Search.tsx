import Button from "./Button";
import { AiOutlineSearch } from "react-icons/ai";
interface SearchProps {
  query: string;
  setQuery: React.SetStateAction<string>;
}

const Search = () => {
  return (
    <>
      <div className="flex items-center space-x-5">
        <input type="text" placeholder="Search..." />
        {/* <button className="bg-primary hover:bg-primary-500 text-xl px-3 py-1 rounded-xl text-white duration-200">
          <AiOutlineSearch />
        </button> */}
      </div>
    </>
  );
};

export default Search;
