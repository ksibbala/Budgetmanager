import React, { useState, useEffect } from "react";

const FAB = ({ onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 1 second when user hovers on FAB
    const handleMouseEnter = () => setShowTooltip(true);
    const handleMouseLeave = () => setShowTooltip(false);

    const fabButton = document.getElementById("fabButton");
    fabButton.addEventListener("mouseenter", handleMouseEnter);
    fabButton.addEventListener("mouseleave", handleMouseLeave);

    // Clean up the event listeners on component unmount
    return () => {
      fabButton.removeEventListener("mouseenter", handleMouseEnter);
      fabButton.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div>
      {/* FAB Button */}
      <button
        id="fabButton"
        onClick={onClick}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-5 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none transition-all transform hover:scale-105"
      >
        <span className="text-3xl">+</span>
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="fixed bottom-16 right-12 bg-black text-white text-sm p-2 rounded-lg shadow-md">
          Click to add a new transaction
        </div>
      )}
    </div>
  );
};

export default FAB;