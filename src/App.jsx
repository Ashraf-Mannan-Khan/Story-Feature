import { useEffect, useRef, useState } from "react";
import "./App.css";
import { DisplayImage } from "./component/Display_Image/displayImage";
function App() {
const [imageArray, setImageArray] = useState(() => {
  const stored = localStorage.getItem("images");
  return stored ? JSON.parse(stored) : [];
});

  const [reference, setReference] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const InputRefValue = useRef(null);
  function onSelect(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const base64Image = event.target.result;
      setImageArray(prev => {
        const updated = [...prev , base64Image];
         localStorage.setItem("images", JSON.stringify(updated));
        return updated;
      })
    };

    reader.onerror = () => {
      console.error("Error Happened");
    };
    reader.readAsDataURL(file);
  }

  function handleButtonClick() {
    InputRefValue.current.click();
  }

  return (
    <>
      <div className="container">
        <input
          type="file"
          id="file"
          name="file"
          onChange={onSelect}
          ref={InputRefValue}
          style={{ display: "none" }}
          aria-hidden="true"
          multiple
        />
        <button className="plus" onClick={handleButtonClick}>+</button>
        <button className="plus" onClick={() => {
          setImageArray([]);
          localStorage.clear();
        }}>-</button>
        {imageArray.map((src, index) => (
          <img
            src={src}
            alt="base64Image"
            key={`i-${index}`}
            onClick={() => {
              setReference(index);
              setShowImage(true);
            }}
            height="60px"
            width="60px"
            className="containerImage"
          />
        ))}
      </div>
     {showImage &&  <DisplayImage
        showImage={showImage}
        imageArray={imageArray}
        currentIndex={reference}
        setReference={setReference}
        setShow={setShowImage}
      />}
    </>
  );
}

export default App;
