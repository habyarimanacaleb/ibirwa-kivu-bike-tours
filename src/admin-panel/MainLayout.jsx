import React,{useState} from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

export default function MainLayout({ children }) {
   const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const childrenWithProps = React.isValidElement(children) && typeof children.type !== 'string'
    ? React.cloneElement(children, { searchTerm })
    : children;
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden sm:flex-row flex-col">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <TopNav searchTerm={searchTerm} handleSearch={handleSearch} />
        <main className="p-6 mt-22 flex-1 overflow-y-auto">
          {childrenWithProps}
        </main>
      </div>
    </div>
  );
}
