import React, {useRef, useEffect} from "react";
import Table, {TableRow} from "../../utils/Salient/UI/Table/Table";

const SampleStaticTable = () => {
    const handleRetrievedRows = (returnData) => {
        console.log(returnData);
    }

    const tableRef = useRef(null);

    useEffect(() => {
        // sample of how to get forwarded ref
        //console.log(tableRef.current);
    }, [])


    return (
        <Table draggable={true} columns={["Company", "Contact", "Country"]} showColToggleUI={true} showRowSelector={true} onRetrievedSelected={handleRetrievedRows} ref={tableRef} sortable={true}>
            <TableRow>
                <td data-field="Company">Alfreds Futterkiste</td>
                <td data-field="Contact">Maria Anders</td>
                <td data-field="Country">Germany</td>
            </TableRow>
            <TableRow>
                <td data-field="Company">Centro comercial Moctezuma</td>
                <td data-field="Contact">Francisco Chang</td>
                <td data-field="Country">Mexico</td>
            </TableRow>
            <TableRow>
                <td data-field="Company">Ernst Handel</td>
                <td data-field="Contact">Roland Mendel</td>
                <td data-field="Country">Austria</td>
            </TableRow>
            <TableRow>
                <td data-field="Company">Island Trading</td>
                <td data-field="Contact">Helen Bennett</td>
                <td data-field="Country">UK</td>
            </TableRow>
            <TableRow>
                <td data-field="Company">Laughing Bacchus Winecellars</td>
                <td data-field="Contact">Yoshi Tannamuri</td>
                <td data-field="Country">Canada</td>
            </TableRow>
        </Table>
    )
}

export default SampleStaticTable;