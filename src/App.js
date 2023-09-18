import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';

function App() {
  // Define state variables using useState hook
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isRotated, setIsRotated] = useState(false);
  const [iconSize, setIconSize] = useState(350);
  const [inactiveTime, setInactiveTime] = useState(0);
  const [isMouseMoving, setIsMouseMoving] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isRotationEnabled, setIsRotationEnabled] = useState(true);
  const [isSizeAdjustmentEnabled, setIsSizeAdjustmentEnabled] = useState(true);
  const [isTimeDisplayEnabled, setIsTimeDisplayEnabled] = useState(true);

  // 1st task: Rotate the icon when the component mounts
  useEffect(() => {
    // Start the initial rotation from 0 to 360 degrees when the component mounts
    setIsRotated(360);
  }, []);

  // Function to toggle icon rotation
  const startRotation = () => {
    if (!isRotationEnabled) {
      return;
    }

    if (rotationDegree === 0 && isRotated === 360) {
      setRotationDegree(360);
      setIsRotated(0);
    } else {
      setRotationDegree(0);
      setIsRotated(360);
    }
  };

  // 2nd task: Adjust icon size based on cursor's position
  useEffect(() => {
    const handleMouseMoveVertical = (e) => {
      if (!isSizeAdjustmentEnabled) {
        return;
      }
  
      const newSize = 350 + e.clientX / 4; // Adjust size based on cursor's position
      setIconSize(newSize);
    };
  
    window.addEventListener('mousemove', handleMouseMoveVertical);
  
    // Cleanup the event listener when isSizeAdjustmentEnabled changes
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveVertical);
    };
  }, [isSizeAdjustmentEnabled]);
  
  // 3rd task: Track mouse activity and inactivity time
  useEffect(() => {
    let timer;

    const handleMouseActivity = () => {
      setIsMouseMoving(true);
      clearTimeout(timer);

      timer = setTimeout(() => {
        setIsMouseMoving(false);
      }, 1000); // Set to inactive after 1 second of no mouse movement
    };

    window.addEventListener('mousemove', handleMouseActivity);
    window.addEventListener('mouseenter', handleMouseActivity);

    // Cleanup the event listeners when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseActivity);
      window.removeEventListener('mouseenter', handleMouseActivity);
    };
  }, []);

  // Increment inactiveTime when there is no mouse movement
  useEffect(() => {
    let interval;

    if (!isMouseMoving) {
      interval = setInterval(() => {
        setInactiveTime((prevInactiveTime) => prevInactiveTime + 1);
      }, 1000); // Increment inactive time every second
    } else {
      clearInterval(interval);
    }

    // Cleanup the interval when the component unmounts or when isMouseMoving changes
    return () => {
      clearInterval(interval);
    };
  }, [isMouseMoving]);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Render the component
  return (
    <div className="App">
      {/* Hamburger icon to toggle the sidebar */}
      <div className="Hamburger" onClick={() => setShowSidebar(!showSidebar)}>
        <div className="HamburgerLine"></div>
        <div className="HamburgerLine"></div>
        <div className="HamburgerLine"></div>
      </div>

      <header className="App-header">
        {/* Render the sidebar if showSidebar is true */}
        {showSidebar && (
          <Sidebar
            isRotationEnabled={isRotationEnabled}
            toggleRotation={() => setIsRotationEnabled(!isRotationEnabled)}
            isSizeAdjustmentEnabled={isSizeAdjustmentEnabled}
            toggleSizeAdjustment={() => setIsSizeAdjustmentEnabled(!isSizeAdjustmentEnabled)}
            isTimeDisplayEnabled={isTimeDisplayEnabled}
            toggleTimeDisplay={() => setIsTimeDisplayEnabled(!isTimeDisplayEnabled)}
            closeSidebar={toggleSidebar} // Passing the closeSidebar function
          />
        )}

        {/* Clickable div to toggle icon rotation */}
        <div onClick={startRotation}>
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{
              transform: `rotate(${rotationDegree}deg)`,
              transition: 'transform 2s ease-in-out',
              width: `${iconSize}px`,
              height: `${iconSize}px`,
            }}
          />
        </div>
        {/* Display inactive time if isTimeDisplayEnabled is false */}
        {!isTimeDisplayEnabled && (
          <p>Mouse inactive time: {inactiveTime} seconds</p>
        )}
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* Dynamic CSS animation for logo rotation */}
      <style>
        {`
          @keyframes App-logo-spin {
            from {
              transform: rotate(${rotationDegree}deg);
            }
            to {
              transform: rotate(${isRotated}deg);
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;
