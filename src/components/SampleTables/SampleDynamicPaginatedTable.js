import React from "react";
import Table, {TableRow} from '../../utils/Salient/UI/Table/Table';
import withPagination from "../../utils/Salient/UI/Pagination/withPagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const SampleDynamicTable = (props) => {
    const onDragUpdate = (returnData) => {
        //console.log(returnData);
    }

    const handleRetrievedRows = (returnData) => {
        console.log(returnData);
    }

    return (
        <Table draggable={true} showColToggleUI={true} columns={["Type", "Name", "Description", "Tags", "Last Viewed", "Expiration"]} onDragUpdate={onDragUpdate} data={props.data} showRowSelector={true} onRetrievedSelected={handleRetrievedRows} retrieveRowsBtnTitle="Get Row" {...props}>
            {props.items.map((row, index) => (
                <TableRow key={index}>
                    <td data-field="Type"><FontAwesomeIcon icon={"file-"+row.Type}></FontAwesomeIcon></td>
                    <td data-field="Name">{row.Name} app</td>
                    <td data-field="Description">{row.Description}</td>
                    <td data-field="Tags">{row.Tags}</td>
                    <td data-field="Last Viewed">{row.LastViewed}</td>
                    <td data-field="Expiration">{row.Expiration}</td>
                </TableRow>
            ))}
        </Table>
    )
}

const SampleDynamicPaginatedTable = withPagination()(SampleDynamicTable);

export default SampleDynamicPaginatedTable;