// src/atoms/TableComponent.jsx
import { useState, useCallback } from "react";
import ColumnSelector from "../components/ColumnSelector";

const TableComponent = ({ data, initialColumns, tableId }) => {
  const defaultColumns = [
    {
      Header: "Select",
      accessor: "select",
      pinned: "left",
      width: 60,
      Cell: () => <input type="checkbox" />,
    },
    {
      Header: "S. No.",
      accessor: "serialNumber",
      pinned: "left",
      width: 60,
      Cell: (_, idx) => idx + 1,
    },
  ];

  const actionColumn = {
    Header: "Actions",
    accessor: "actions",
    pinned: "right",
    width: 80,
    Cell: () => <button className="text-blue-500 hover:underline">Edit</button>,
  };

  const [columns, setColumns] = useState([...defaultColumns, ...initialColumns, actionColumn]);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [draggedColumnIndex, setDraggedColumnIndex] = useState(null);

  // Compute pinned columns
  const pinnedColumns = {
    left: columns.filter((c) => c.pinned === "left").map((c) => c.accessor),
    right: columns.filter((c) => c.pinned === "right").map((c) => c.accessor),
  };

  // Pin management
  const handleTogglePin = useCallback((accessor) => {
    setColumns((prev) => {
      const newColumns = [...prev];
      const index = newColumns.findIndex((col) => col.accessor === accessor);
      if (index === -1) return prev;

      const column = { ...newColumns[index] };
      newColumns.splice(index, 1);

      if (column.pinned === "left") {
        column.pinned = undefined;
        const leftPinnedCount = newColumns.filter((col) => col.pinned === "left").length;
        newColumns.splice(leftPinnedCount, 0, column);
      } else {
        column.pinned = "left";
        const leftPinnedCount = newColumns.filter((col) => col.pinned === "left").length;
        newColumns.splice(leftPinnedCount, 0, column);
      }

      return newColumns;
    });
  }, []);

  // Drag and drop handlers
  const handleDragStart = (index) => {
    if (columns[index].pinned) return;
    setDraggedColumnIndex(index);
  };

  const handleDragOver = (index) => {
    if (draggedColumnIndex === null || draggedColumnIndex === index || columns[index].pinned) return;
    setColumns((prev) => {
      const newColumns = [...prev];
      const [draggedColumn] = newColumns.splice(draggedColumnIndex, 1);
      newColumns.splice(index, 0, draggedColumn);
      setDraggedColumnIndex(index);
      return newColumns;
    });
  };

  const handleDragEnd = () => {
    setDraggedColumnIndex(null);
  };

  // Helper functions to check column state
  const isPinnedLeft = (colId) => pinnedColumns.left.includes(colId);
  const isPinnedRight = (colId) => pinnedColumns.right.includes(colId);
  const isHidden = (colId) => hiddenColumns.includes(colId);

  // Default width (in px) for pinned columns if not provided on the column definition
  const defaultPinnedWidth = 80;

  // Compute offsets for left pinned columns
  const leftPinnedOffsets = {};
  let currentLeftOffset = 0;
  columns.forEach((col) => {
    if (col.pinned === "left") {
      leftPinnedOffsets[col.accessor] = currentLeftOffset;
      currentLeftOffset += col.width || defaultPinnedWidth;
    }
  });

  // Compute offsets for right pinned columns (iterate in reverse order)
  const rightPinnedOffsets = {};
  let currentRightOffset = 0;
  [...columns].reverse().forEach((col) => {
    if (col.pinned === "right") {
      rightPinnedOffsets[col.accessor] = currentRightOffset;
      currentRightOffset += col.width || defaultPinnedWidth;
    }
  });

  return (
    <div>
      <div className="flex justify-end items-center mb-4 space-x-2">
        <ColumnSelector allColumns={columns} hiddenColumns={hiddenColumns} onHiddenColumnsChange={setHiddenColumns} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((col, index) => {
                if (isHidden(col.accessor)) return null;

                // Compute inline styles for pinned columns
                let pinnedStyle = {};
                if (isPinnedLeft(col.accessor)) {
                  pinnedStyle = {
                    left: `${leftPinnedOffsets[col.accessor]}px`,
                  };
                } else if (isPinnedRight(col.accessor)) {
                  pinnedStyle = {
                    right: `${rightPinnedOffsets[col.accessor]}px`,
                  };
                }

                // Common pinned classes
                const stickyClass =
                  isPinnedLeft(col.accessor) || isPinnedRight(col.accessor) ? "sticky z-10 bg-white" : "";

                return (
                  <th
                    key={col.accessor}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={() => handleDragOver(index)}
                    onDragEnd={handleDragEnd}
                    style={pinnedStyle}
                    className={`p-2 border text-left cursor-move ${stickyClass}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{col.Header}</span>
                      {/* Allow pin toggle for columns (skip fixed ones like select, serialNumber, actions) */}
                      {!["select", "serialNumber", "status", "actions"].includes(col.accessor) && (
                        <button
                          className="ml-2 text-xs text-gray-500 focus:outline-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTogglePin(col.accessor);
                          }}
                        >
                          {isPinnedLeft(col.accessor) || isPinnedRight(col.accessor) ? "Unpin" : "Pin"}
                        </button>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((col) => {
                  if (isHidden(col.accessor)) return null;

                  let pinnedStyle = {};
                  if (isPinnedLeft(col.accessor)) {
                    pinnedStyle = {
                      left: `${leftPinnedOffsets[col.accessor]}px`,
                    };
                  } else if (isPinnedRight(col.accessor)) {
                    pinnedStyle = {
                      right: `${rightPinnedOffsets[col.accessor]}px`,
                    };
                  }
                  const stickyClass =
                    isPinnedLeft(col.accessor) || isPinnedRight(col.accessor) ? "sticky z-10 bg-white" : "";

                  return (
                    <td key={col.accessor} style={pinnedStyle} className={`p-2 border ${stickyClass}`}>
                      {col.Cell ? col.Cell(row, rowIndex) : row[col.accessor] ?? "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
