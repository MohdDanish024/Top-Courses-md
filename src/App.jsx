import "./App.css";
import Navbar from "./Components/Navbar";
import Filter from "./Components/Filter";
import Cards from "./Components/Cards";
import { apiUrl, filterData } from "./data";
import { useEffect, useState } from "react";
import Spinner from "./Components/Spinner";

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl);
        const output = await response.json();
        //save data into a variable
        setCourses(output.data);
        console.log("Courses Value Updated");
        console.log(courses);
      } catch (error) {
        toast.error("Something went wrong");
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="">
        <Navbar />
      </div>

      <div className="bg-slate-700">
        <div>
          <Filter setCategory={setCategory} filterData={filterData} />
        </div>

        <div className="w-11/12 max-w-[1200px] mx-auto flex-wrap flex justify-center items-center min-h-[50vh]">
          {loading ? (
            <Spinner />
          ) : (
            <Cards courses={courses} category={category} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
