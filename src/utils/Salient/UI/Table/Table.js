import React, { useRef, useEffect, Fragment, useState, useMemo} from "react";
import classNames from "classnames";
import { tableSorter } from "../../helpers/Sort";

const Table = (props) => {
    /*** Table Properties **/ 
    /* 
    columns: Defines custom column names, which do not necessarily need to match the data keys 
    showColToggleUI: Enables the column visibility toggle button
    draggable: Allows table rows to be draggable 
    onDragUpdate: Specifies a custom function to execute after a row drag event finishes. This function will  receive the updated data once the drag event is complete 
    data: Contains the rows of data retrieved from an external file, essential for updating the entire table object
    onRetrivedRows: Accepts a function that returns the data of the selected rows
    retrieveRowsBtnTitle: Customizes the default button title used for retrieving row data
    */
    

    // ref for returning the nth-child of the table
    const tBodyRef = useRef();

    // states for column visibility
    const [dropdownState, setDropdownState] = useState(false);
    const [dropdownList, setDropdownList] = useState([]);
    const [hiddenColumns, setHiddenColumns] = useState({});

    // states for drag event
    const [rows, setRows] = useState(props.children);
    const [highlightedRow, setHighlightedRow] = useState(null);
    const [draggedRow, setDraggedRow] = useState(null);

    // state for row checkbox
    const initialRowsCheckBoxState = useMemo(() => {
        return Object.fromEntries((props.data || []).map((_, index) => [index, false]));
    }, [props.data]);

    const initialRowsCheckBoxStateFallback = useMemo(() => {
        return Object.fromEntries((rows || []).map((_, index) => [index, false]));
    }, [rows]);

    const [selectRows, setSelectRows] = Object.keys(initialRowsCheckBoxState).length > 0 ? useState(initialRowsCheckBoxState) : useState(initialRowsCheckBoxStateFallback);

    // states for storing updatedData
    const [dataStore, setDataStore] = props.data && props.data.length > 0 ? useState(props.data) : useState(React.Children.toArray(rows || []));

    // states for sorting
    const [currentColSortState, setCurrentColSortState] = useState({colId: null, order: null});

    // variable to determine if table is paginated
    const isPaginatedTable = props.itemsPerPage && props.currentPage;

    useEffect(() => {
        setDropdownList(props.columns || []);
        setHiddenColumns(Object.fromEntries(
            (props.columns || []).map((_, index) => [index, false]) // Initialize all columns as visible
        ));
        // setColsSortOrder(Object.fromEntries(
        //     (props.columns || []).map((_, index) => [index, null]) // Initialize all columns sorting as null
        // ))
    }, [props.columns]);

    // update the rows after pagination change
    useEffect(() => {
        setRows(React.Children.toArray(props.children));
    }, [props.children]);

    const toggleColumnVisibility = (index) => {
        setHiddenColumns((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const tableClasses = classNames('sl-table', {
        'table-draggable': props.draggable
    });

    // Drag Functions
    const handleDragStart = (index) => {
        setDraggedRow(index);
    };

    const handleDragOver = (index, e) => {
        e.preventDefault(); // Allows the drop event to occur
        setHighlightedRow(index);
    };

    const handleDragLeave = () => {
        setHighlightedRow(null); // Remove highlight if dragged item leaves the row
    };

    const handleDrop = (index) => {
        if (draggedRow === null || draggedRow === index) {
            setHighlightedRow(null);
            return;
        };

        const updatedRows = [...rows];
        const [movedRow] = updatedRows.splice(draggedRow, 1);
        updatedRows.splice(index, 0, movedRow);

        setRows(updatedRows);
        updateDataObj(index, draggedRow);
        setDraggedRow(null);
        setHighlightedRow(null); // Clear highlight
    };

    const updateDataObj = (index, dragRow) => {
        if(dataStore && dataStore.length > 0){
            //create a copy of the original data
            const updatedData = [...dataStore];
            const updatedSelectedRow = {...selectRows};
            
            // remove the drag row from the data and save it in movedRow variable
            const [movedRowData] = updatedData.splice(dragRow, 1);

            // switch the row pair check state
            const {[dragRow]: dragRowCheckState, [index]: targetRowCheckState} = updatedSelectedRow;
            const updatedRowPairState = {[index]:dragRowCheckState, [dragRow]: targetRowCheckState};

            // insert the movedRow to the index that we drop
            updatedData.splice(index, 0, movedRowData);
            setDataStore(updatedData);

            // update the row pair check state
            setSelectRows((prevState) => ({
                ...prevState,
                ...updatedRowPairState
            }));
        }
    }

    // Select Rows Functions
    const selectAllRows = (e) => {
        setSelectRows((prevState) => {
            const updatedRowStates = Object.fromEntries(
                Object.entries(prevState).map(([key, value]) => [key, e.target.checked])
            );
            return updatedRowStates;
        });
    }

    const updateRowCheckState = (index) => {
        setSelectRows((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    }

    // Sort Function
    const changeSortOrder = (index) => {
        setCurrentColSortState((prevState) => {
            const newOrder = prevState.order === 'desc' ? 'asc': 'desc';
            tableSorter(tBodyRef.current, index, newOrder === 'asc');
            return {
                ...prevState,
                colId: index,
                order: newOrder
            }
        })
    }

    // helper function to filter from object
    Object.filter = (obj, predicate) => 
        Object.fromEntries(Object.entries(obj).filter(predicate));

    // return check rows data onclick
    const handleCheckedRows = () => {
        if(props.onRetrievedSelected){
            let selectedRowsData;
            const selectedRows = (Object.filter(selectRows, ([key, value]) => value));
           
            // props.data was specified directly to Table or through pagination
            // if props.data contains props, we want to return the childNodes ref, this is especially true for static table that has pagination
            // for dynamic tables, this will return the selected row data which was part of the input data props.
            if(dataStore.some(obj => obj.hasOwnProperty('props'))){
                const reactChildrensRows = Object.filter(dataStore, ([key, value]) => Object.keys(selectedRows).includes(key));
                selectedRowsData = Object.entries(reactChildrensRows).reduce((acc, [key, value]) => {
                    const fields = value.props.children.reduce((fieldsAcc, child) => {
                        const ob = child.props;
                        fieldsAcc[ob['data-field']] = ob.children;
                        return fieldsAcc;
                    }, {});
                    acc[key] = fields;
                    return acc;
                }, {});
            } else {
                selectedRowsData = Object.filter(dataStore, ([key, value]) => Object.keys(selectedRows).includes(key));
            }
            props.onRetrievedSelected(selectedRowsData);
        }
    }

    return (
        <Fragment>
            <div className="btn-group">
                {props.showColToggleUI && <div className={['dropdown-btn', dropdownState ? 'dropdown-open' : ''].join(' ').trim()}>
                    <button
                        aria-haspopup="true"
                        aria-expanded={dropdownState}
                        className="btn"
                        onClick={() => setDropdownState(!dropdownState)}
                    >
                        <span className="icon icon-filter">
                        </span>
                    </button>
                    {dropdownState && (
                        <ul className="btn-dropdown-menu">
                            {dropdownList.map((field, index) => (
                                <li key={index}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={() => toggleColumnVisibility(index)}
                                            checked={!hiddenColumns[index]}
                                        />
                                        {field}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>}
                {Object.values(selectRows).includes(true) && <button className="btn" onClick={handleCheckedRows}>{props.retrieveRowsBtnTitle}</button>}
            </div>

            <table className={[tableClasses, props.className || ''].join(' ').trim()} onDragEnd={() => props.onDragUpdate(dataStore)} ref={props.ref}>
                <thead>
                    <tr>
                        {props.showRowSelector && <td className="row-checkbox"><input type="checkbox" onChange={(e) => selectAllRows(e)}/></td>}
                        {props.columns.map((columnName, index) => (
                            <th key={index} className={hiddenColumns[index] ? 'hide-table-col' : ''}>
                                {columnName}
                                {
                                    props.sortable && 
                                    <span 
                                        className={`icon table-sort-icon ${currentColSortState.colId !== (props.showRowSelector ? index + 1  : index) ? 'icon-sort-by-fill' : ( currentColSortState.order === 'asc' ? 'icon-top-fill' : 'icon-bottom-fill')}`} 
                                        onClick={() => changeSortOrder(props.showRowSelector ? index + 1  : index)}>
                                    </span>
                                }
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody ref={tBodyRef}>
                    {/* Pass the hiddenColumns state to <Row> to decide which column to hide*/}
                    {React.Children.map(rows, (child, index) => {
                        const rowIndex = isPaginatedTable ? (props.currentPage - 1) * props.itemsPerPage + index : index;
                        return React.isValidElement(child) ? React.cloneElement(child, { 
                                ...child.props,
                                hiddenColumns, 
                                draggable: props.draggable,
                                showRowSelector: props.showRowSelector,
                                selectRow: selectRows[rowIndex],
                                rowId: rowIndex,
                                updateRowCheckState,
                                onDragStart: () => handleDragStart(index),
                                onDragOver: (e) => handleDragOver(index, e),
                                onDrop: () => handleDrop(index),
                                onDragLeave: handleDragLeave,
                                isHighlighted: highlightedRow === index
                            }) : child
                        }
                    )}
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
    retrieveRowsBtnTitle: 'Retrieve Rows',
    sortable: false
};

const TableRow = ({ children, hiddenColumns, draggable, onDragStart, onDragOver, onDragLeave, onDrop, isHighlighted, showRowSelector, selectRow, updateRowCheckState, rowId, className }) => {
    return (
        <tr draggable={draggable}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragLeave={onDragLeave}
            className={[className || '', isHighlighted ? 'row-insert-highlight' : ''].join(' ').trim()}
            >
            {showRowSelector && <td className="row-checkbox"><input type="checkbox" checked={selectRow} onChange={() => updateRowCheckState(rowId)}/></td>}
            {React.Children.map(children, (cell, index) => 
                hiddenColumns?.[index] ? null : cell
            )}
        </tr>
    )
}

export default Table;
export {TableRow}
