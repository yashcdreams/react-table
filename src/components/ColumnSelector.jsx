import { useState, useRef, useEffect } from "react";

const ColumnSelector = ({ allColumns, hiddenColumns, onHiddenColumnsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckboxChange = (accessor) => {
    if (hiddenColumns.includes(accessor)) {
      onHiddenColumnsChange(hiddenColumns.filter((col) => col !== accessor));
    } else {
      onHiddenColumnsChange([...hiddenColumns, accessor]);
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-white border rounded shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Select Columns
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 border rounded shadow bg-white w-fit">
          <div className="p-2">
            <p className="font-bold mb-2">Toggle Columns</p>
            <div className="max-h-64 overflow-y-auto">
              {allColumns.map((col) => (
                <div key={col.accessor} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={!hiddenColumns.includes(col.accessor)}
                    onChange={() => handleCheckboxChange(col.accessor)}
                    disabled={col.pinned === "left" || col.pinned === "right"}
                  />
                  <label>{col.Header}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnSelector;
