import { use, useEffect, useState, useRef } from "react";
import "./displayImage.css";
import { ProgressBar } from "../ProgressBar/progressbar.jsx";
export function DisplayImage({
  imageArray,
  currentIndex,
  setReference,
  setShow,
}) {
  const [currentSteps, setCurrentSteps] = useState(() =>
    Array(imageArray.length).fill(0),
  );
  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const refValue = useRef(currentIndex);
  useEffect(() => {
    setCurrentSteps(Array(imageArray.length).fill(0));
  }, [imageArray.length]);

  useEffect(() => {
    let oldref = refValue.current;
    setCurrentSteps((prev) => {
      let newSteps = [...prev];
      newSteps[oldref] = 0;
      return newSteps;
    });
    refValue.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSteps((prev) => {
        const newSteps = [...prev];
        const index = refValue.current;
        if (newSteps[index] > 100) {
          newSteps[index] = 0;
        }
        newSteps[index] = newSteps[index] + 3.33;

        return newSteps;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    if (
      currentSteps[refValue.current] > 100 &&
      currentIndex < imageArray.length
    ) {
      setReference((index) => {
        if (index < imageArray.length - 1) {
          return index + 1;
        }
        setShow(false);
        return 0;
      });
    }
  }, [currentSteps]);

  function handleTouchStart(e) {
    touchStart.current = e.targetTouches[0].clientX;
  }

  function handleTouchMove(e) {
    touchEnd.current = e.targetTouches[0].clientX;
  }

  function handleTouchEnd() {
    const distance = touchStart.current - touchEnd.current;

    if (distance > 50) {
        if(currentIndex > 0) {
        console.log('works');
          setReference((prev) => prev - 1); 
      }
    
    }
    if (distance < -50) {
     if (currentIndex < imageArray.length - 1) {
        setReference((prev) => prev + 1);
      }
    }
  }
  console.log(currentIndex);

  return (
    <div className="imageContainer"   onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
      <div className="progressbarContainer">
        {imageArray.map((src, index) => {
          return (
            <>
              <ProgressBar
                progress={currentSteps[index]}
                imageArray={imageArray}
              />
            </>
          );
        })}
      </div>
      <div
        className="story"
      
      >
        <button className="close" onClick={() => setShow(false)}>
          <span>&#10005;</span>
        </button>
        <button
          className="back"
          onClick={() => {
            setReference((prev) => prev - 1);
          }}
          disabled={currentIndex === 0}
        >
          <span>&larr;</span>
        </button>
        <img
          src={imageArray[currentIndex]}
          alt="base64Image"
          key={currentIndex}
          className="storyImg"
        />
        <button
          className="forward"
          onClick={() => {
            setReference((prev) => prev + 1);
          }}
          disabled={currentIndex === imageArray.length - 1}
        >
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
