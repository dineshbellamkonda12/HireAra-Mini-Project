import React from 'react';
import './Sidebar.css'; // Importing the CSS styles for the Sidebar component

function Sidebar(props) {
  return (
    // The main container for the Sidebar with conditional class 'open'
    <div className={`Sidebar ${props.isOpen ? 'open' : ''}`}>
      {/* Header of the Sidebar */}
      <div className="SidebarHeader">
        <h2>Sidebar</h2>
        {/* Button to close the Sidebar, triggers the 'closeSidebar' function */}
        <button onClick={props.closeSidebar} className="CloseButton">
          X
        </button>
      </div>
      {/* Container for various options in the Sidebar */}
      <div className="Options">
        {/* Option for disabling/enabling icon rotation */}
        <label className="Option">
          <div className="Checkbox">
            <input
              type="checkbox"
              checked={props.isRotationEnabled} // Checkbox state controlled by 'isRotationEnabled' prop
              onChange={props.toggleRotation} // Triggered when the checkbox changes
            />
            <span className="Checkmark"></span>
          </div>
          <span className="OptionLabel">Disable Rotating the Icon when you click on react icon</span>
        </label>
        {/* Option for disabling/enabling icon size adjustment */}
        <label className="Option">
          <div className="Checkbox">
            <input
              type="checkbox"
              checked={props.isSizeAdjustmentEnabled} // Checkbox state controlled by 'isSizeAdjustmentEnabled' prop
              onChange={props.toggleSizeAdjustment} // Triggered when the checkbox changes
            />
            <span className="Checkmark"></span>
          </div>
          <span className="OptionLabel">Disable Adjusting Icon Size with cursor position</span>
        </label>
        {/* Option for showing/hiding mouse inactive time */}
        <label className="Option">
          <div className="Checkbox">
            <input
              type="checkbox"
              checked={props.isTimeDisplayEnabled} // Checkbox state controlled by 'isTimeDisplayEnabled' prop
              onChange={props.toggleTimeDisplay} // Triggered when the checkbox changes
            />
            <span className="Checkmark"></span>
          </div>
          <span className="OptionLabel">Show/Hide Mouse Inactive Time</span>
        </label>
      </div>
    </div>
  );
}

export default Sidebar;
