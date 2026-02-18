import React, { useRef, useEffect, Fragment, useState, useMemo } from "react";
import classNames from "classnames";
import { tableSorter } from "../../helpers/Sort";

const Table = (props) => {
  const tBodyRef = useRef();

  // Column visibility
  const [dropdownState, setDropdownState] = useState(false);
  const [dropdownList, setDropdownList] = useState([]);
  const [hiddenColumns, setHiddenColumns] = useState({});

  // Rows
  const [rows, setRows] = useState(React.Children.toArray(props.children));
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [draggedRow, setDraggedRow] = useState(null);
  const [activeDragRow, setActiveDragRow] = useState(null);

  // Row selection
  const initialRowsCheckBoxState = useMemo(() => Object.fromEntries((props.data || []).map((_, index) => [index, false])), [props.data]);
  const initialRowsCheckBoxStateFallback = useMemo(() => Object.fromEntries(rows.map((_, index) => [index, false])), [rows]);
  const [selectRows, setSelectRows] = Object.keys(initialRowsCheckBoxState).length > 0
    ? useState(initialRowsCheckBoxState)
    : useState(initialRowsCheckBoxStateFallback);

  // Data store
  const [dataStore, setDataStore] = props.data && props.data.length > 0
    ? useState(props.data)
    : useState(React.Children.toArray(rows));

  // Sorting
  const [currentColSortState, setCurrentColSortState] = useState({ colId: null, order: null });

  // Pagination
  const isPaginatedTable = props.itemsPerPage && props.currentPage;

  useEffect(() => {
    setDropdownList(props.columns || []);
    setHiddenColumns(Object.fromEntries((props.columns || []).map((_, index) => [index, false])));
  }, [props.columns]);

  useEffect(() => {
    setRows(React.Children.toArray(props.children));
  }, [props.children]);

  const toggleColumnVisibility = (index) => setHiddenColumns(prev => ({ ...prev, [index]: !prev[index] }));

    const tableClasses = classNames("sl-table", {
        "table-draggable": props.draggable,
        "table-bordered": props.bordered,
        "table-bordered__inner": props.tableInnerBordered,
        "table-striped": props.striped
    });

  /*** Drag functions ***/
  const handleDragStart = (index) => {
    setDraggedRow(index);
  };

  const handleDragOver = (index, e) => {
    e.preventDefault();
    setHighlightedRow(index);
  };

  const handleDragLeave = () => {
    setHighlightedRow(null);
  };

  const handleDrop = (index) => {
    if (draggedRow === null || draggedRow === index) {
      setHighlightedRow(null);
      setActiveDragRow(null);
      return;
    }

    const updatedRows = [...rows];
    const [movedRow] = updatedRows.splice(draggedRow, 1);
    updatedRows.splice(index, 0, movedRow);

    setRows(updatedRows);
    updateDataObj(index, draggedRow);
    setDraggedRow(null);
    setActiveDragRow(null);
    setHighlightedRow(null);
  };

  const updateDataObj = (index, dragRow) => {
    if (!dataStore || dataStore.length === 0) return;

    const updatedData = [...dataStore];
    const updatedSelectRows = { ...selectRows };

    const [movedRowData] = updatedData.splice(dragRow, 1);
    updatedData.splice(index, 0, movedRowData);

    // Swap select states
    const { [dragRow]: dragCheck, [index]: targetCheck } = updatedSelectRows;
    updatedSelectRows[dragRow] = targetCheck;
    updatedSelectRows[index] = dragCheck;

    setDataStore(updatedData);
    setSelectRows(updatedSelectRows);
  };

  /*** Row selection ***/
  const selectAllRows = (e) => setSelectRows(prev => Object.fromEntries(Object.entries(prev).map(([key]) => [key, e.target.checked])));
  const updateRowCheckState = (index) => setSelectRows(prev => ({ ...prev, [index]: !prev[index] }));

  const handleCheckedRows = () => {
    if (!props.onRetrievedSelected) return;
    let selectedRowsData;
    const selectedRows = Object.fromEntries(Object.entries(selectRows).filter(([_, v]) => v));

    if (dataStore.some(obj => obj.hasOwnProperty("props"))) {
      // Static table
      selectedRowsData = Object.entries(selectedRows).reduce((acc, [key]) => {
        const row = dataStore[key];
        const fields = row.props.children.reduce((fieldsAcc, child) => {
          const ob = child.props;
          fieldsAcc[ob["data-field"]] = ob.children;
          return fieldsAcc;
        }, {});
        acc[key] = fields;
        return acc;
      }, {});
    } else {
      // Dynamic table
      selectedRowsData = Object.fromEntries(Object.entries(dataStore).filter(([key]) => selectedRows.hasOwnProperty(key)));
    }
    props.onRetrievedSelected(selectedRowsData);
  };

  /*** Sorting ***/
  const changeSortOrder = (index) => {
    setCurrentColSortState(prev => {
      const newOrder = prev.order === "desc" ? "asc" : "desc";
      tableSorter(tBodyRef.current, index, newOrder === "asc");
      return { colId: index, order: newOrder };
    });
  };

  const handleBlur = (event) => {
    const currentTarget = event.currentTarget;

    // Give the browser time to focus the next element
    requestAnimationFrame(() => {
      // Check if the new focused element is still a child of the container
      if (!currentTarget.contains(document.activeElement)) {
        setDropdownState(false);
      }
    });
  };

  return (
    <Fragment>
      <div className="btn-group">
        {props.showColToggleUI && (
          <div className={["dropdown-btn", dropdownState ? "dropdown-open" : ""].join(" ").trim()} onBlur={handleBlur}>
            <button className="btn" onClick={() => setDropdownState(!dropdownState)}>
              <span className="icon icon-filter" />
            </button>
            {dropdownState && (
              <ul className="btn-dropdown-menu">
                {dropdownList.map((field, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={!hiddenColumns[index]}
                        onChange={() => toggleColumnVisibility(index)}
                      />
                      {field}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {Object.values(selectRows).includes(true) && (
          <button className="btn" onClick={handleCheckedRows}>{props.retrieveRowsBtnTitle}</button>
        )}
      </div>

      <table className={[tableClasses, props.className || ""].join(" ").trim()} ref={props.ref}>
        <thead>
          <tr>
            {props.draggable && <th className="drag-handle-column"></th>}
            {props.showRowSelector && <th className="row-checkbox"><input type="checkbox" onChange={selectAllRows} /></th>}
            {props.columns.map((colName, index) => (
              <th key={index} className={hiddenColumns[index] ? "hide-table-col" : ""}>
                {colName}
                {props.sortable && (
                  <span
                    className={`icon table-sort-icon ${
                      currentColSortState.colId !== (props.showRowSelector ? index + 2 : index + 1)
                        ? "icon-sort-by-fill"
                        : currentColSortState.order === "asc"
                          ? "icon-top-fill"
                          : "icon-bottom-fill"
                    }`}
                    onClick={() => changeSortOrder(props.showRowSelector ? index + 2 : index + 1)}
                  ></span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody ref={tBodyRef}>
          {React.Children.map(rows, (child, index) => {
            const rowIndex = isPaginatedTable
              ? (props.currentPage - 1) * props.itemsPerPage + index
              : index;

            return React.isValidElement(child)
              ? React.cloneElement(child, {
                  ...child.props,
                  hiddenColumns,
                  draggable: props.draggable,           // allow handle to be shown
                  activeDragRow,                        // new state
                  setActiveDragRow,                      // pass setter to row
                  showRowSelector: props.showRowSelector,
                  selectRow: selectRows[rowIndex],
                  rowId: rowIndex,
                  updateRowCheckState,
                  onDragStart: () => handleDragStart(index),
                  onDragOver: (e) => handleDragOver(index, e),
                  onDrop: () => handleDrop(index),
                  onDragLeave: handleDragLeave,
                  isHighlighted: highlightedRow === index
                })
              : child;
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

Table.defaultProps = {
  draggable: false,
  columns: [],
  data: [],
  onDragUpdate: () => {},
  showColToggleUI: false,
  showRowSelector: false,
  retrieveRowsBtnTitle: "Retrieve Rows",
  sortable: false,
  tableInnerBordered: false,
  bordered: true,
  striped: false
};

/**
 * TableRow Component
 * Renders a single table row (<tr>) with optional:
 * - Drag handle (only draggable from handle)
 * - Row selection checkbox
 * - Hidden columns support
 * - Highlighted row style
 */

const TableRow = ({
  children,
  hiddenColumns,
  showRowSelector,
  selectRow,
  updateRowCheckState,
  rowId,
  isHighlighted,
  className,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  draggable,       // row reordering enabled
  activeDragRow,
  setActiveDragRow,
  dragIconClass='icon icon-drag'
}) => {

  const rowRef = useRef(null);

  const handleMouseDown = () => {
    // allow row to become draggable *only while dragging*
    setActiveDragRow(rowId);
  };

  const handleDragStartInternal = (e) => {
    onDragStart && onDragStart();
  
    const original = rowRef.current;
    if (!original) return;
  
    // Clone the row DOM
    const clonedRow = original.cloneNode(true);
  
    // Create wrapper DIV that will be used as drag image
    const wrapper = document.createElement("div");
    wrapper.className = "sl-drag-ghost"; // apply ghost CSS to wrapper
  
    // Make cloned row renderable outside table:
    // Force display styles so it looks like a table row inside the wrapper
    clonedRow.style.display = "table";
    Array.from(clonedRow.children || []).forEach((td) => {
      // ensure td acts like table-cell
      td.style.display = "table-cell";
      td.style.boxSizing = "border-box";
    });
  
    // Optionally restrict width so ghost has same width as original row
    wrapper.style.width = `${original.offsetWidth}px`;
  
    // Append cloned row into wrapper, and put wrapper into body
    wrapper.appendChild(clonedRow);
    document.body.appendChild(wrapper);
  
    // Use the wrapper as drag image (must be in DOM)
    // offsetX/offsetY: adjust to move ghost under pointer if needed
    e.dataTransfer.setDragImage(wrapper, 0, 0);
  
    // store for cleanup
    window.__slGhostRow = wrapper;
  
    // add lift class to real row
    original.classList.add("sl-row-dragging");
  };
  
  const handleDragEndInternal = () => {
    setActiveDragRow(null);
  
    // cleanup ghost
    if (window.__slGhostRow) {
      window.__slGhostRow.remove();
      window.__slGhostRow = null;
    }
  
    // remove lift class on original row
    if (rowRef.current) rowRef.current.classList.remove("sl-row-dragging");
  };

  return (
    <tr
      ref={rowRef}
      draggable={activeDragRow === rowId}   // Only draggable when activated
      onDragStart={handleDragStartInternal}
      onDragEnd={handleDragEndInternal}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={[
        className || "",
        isHighlighted ? "row-insert-highlight" : "",
        selectRow ? "row-selected" : ""
      ].join(" ").trim()}
    >
      {/* Drag handle column FIRST */}
      {draggable && (
        <td className="drag-handle">
          <span
            className={dragIconClass}
            draggable={true}
            onMouseDown={handleMouseDown}
            onDragStart={handleDragStartInternal}
          >
          </span>
        </td>
      )}

      {/* Checkbox column */}
      {showRowSelector && (
        <td className="row-checkbox">
          <input type="checkbox" checked={selectRow} onChange={() => updateRowCheckState(rowId)} />
        </td>
      )}

      {/* Data columns */}
      {React.Children.map(children, (cell, index) =>
        hiddenColumns?.[index] ? null : cell
      )}
    </tr>
  );
};


export { TableRow };
export default Table;