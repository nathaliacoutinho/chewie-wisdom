import React, { useRef, useState } from "react";
import Search from "./components/Search";
import GifItem from "./components/GifItem";
import Header from "./components/Header";

const App = () => {
  const inputRef = useRef();
  const [randomGif, setRandomGif] = useState("");
  const handleSubmit = async () => {
    try {
      const result = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=chewbacca&api_key=${
          process.env.REACT_APP_GIPHY_API_KEY
        }&limit=${Math.round(Math.random() * 10)}`
      ).then(res => res.json());
      const gif = result.data[Math.floor(Math.random() * result.data.length)];
      setRandomGif(gif.images.downsized.url);

      // Focus back onto the input field when submitting the form!
      // https://reactjs.org/docs/hooks-reference.html#useimperativehandle
      inputRef.current.submitted();
    } catch (e) {
      console.warn("Warning, fetching failed", e);
    }
  };

  return (
    <div className="app">
      <Header />
      <Search ref={inputRef} onSubmit={handleSubmit} />
      <GifItem gif={randomGif} />
    </div>
  );
};

export default App;
