import axios from "./util/axios.customize";
import { useState } from "react";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    const fetchHelloWorld = async () => {
      const res = await axios.get(`/v1/api`);
      console.log(">>>> check res :", res);
    };
    fetchHelloWorld();
  }, []);
  return <>Hello World From Fullstack</>;
}

export default App;
