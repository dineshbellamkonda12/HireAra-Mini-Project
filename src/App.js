import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isRotated, setIsRotated] = useState(false);

  useEffect(() => {
    // Start the initial rotation from 0 to 360 degrees when the component mounts
    setIsRotated(360);
  }, []);

  const startRotation = () => {
    if(rotationDegree === 0 && isRotated === 360) {
      setRotationDegree(360);
      setIsRotated(0);
    }
    else {
      setRotationDegree(0);
      setIsRotated(360);	
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div onClick={startRotation}>
          <img 
            src={logo} 
            className="App-logo" 
            alt="logo" 
            style={{
              transform: `rotate(${rotationDegree}deg)`,
              transition: 'transform 2s ease-in-out', // Add a transition for smooth animation
            }}/>
        </div>
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
