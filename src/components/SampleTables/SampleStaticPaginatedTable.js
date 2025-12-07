import React from "react";
import Table, { TableRow } from "../../utils/Salient/UI/Table/TableV2";
import withPagination from "../../utils/Salient/UI/Pagination/withPagination";

const StaticPaginatedTable = withPagination()(Table);
const SampleStaticPaginatedTable = (props) => {
    const handleRetrievedRows = (returnData) => {
        console.log(returnData);
    }

    return (
        <StaticPaginatedTable {...props} columns={["Company", "Contact", "Country"]} showColToggleUI={true} showRowSelector={true} onRetrievedSelected={handleRetrievedRows}>
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
            <TableRow>
                <td data-field="Company">Magazzini Alimentari Riuniti</td>
                <td data-field="Contact">Giovanni Rovelli</td>
                <td data-field="Country">Italy</td>
            </TableRow>
            <TableRow>
                <td data-field="Company">Bon Appétit</td>
                <td data-field="Contact">Pierre Dupont</td>
                <td data-field="Country">France</td>
            </TableRow>
            <TableRow>
                <td data-field="Company">Sunnyvale Grocers</td>
                <td data-field="Contact">John Smith</td>
                <td data-field="Country">USA</td>
            </TableRow>
            <TableRow>
                <td data-field="Company">Ciao Bella</td>
                <td data-field="Contact">Giovanni Rossi</td>
                <td data-field="Country">Italy</td>
            </TableRow>
            <TableRow>
                <td data-field="Company">Tokyo Treats</td>
                <td data-field="Contact">Akira Tanaka</td>
                <td data-field="Country">Japan</td>
            </TableRow>
            <TableRow>
                <td data-field="Company">Maple Delights</td>
                <td data-field="Contact">Emily Johnson</td>
                <td data-field="Country">Canada</td>
            </TableRow>
            <TableRow>
                <td data-field="Company">Rio Goods</td>
                <td data-field="Contact">Carlos Silva</td>
                <td data-field="Country">Brazil</td>
            </TableRow>
            <TableRow>
                <td data-field="Company">Kanga Kitchen</td>
                <td data-field="Contact">Olivia Brown</td>
                <td data-field="Country">Australia</td>
            </TableRow>
            <TableRow>
                <td data-field="Company">Delhi Spices</td>
                <td data-field="Contact">Rajesh Kumar</td>
                <td data-field="Country">India</td>
            </TableRow>
            <TableRow>
                <td data-field="Company">Cape Vineyards</td>
                <td data-field="Contact">Thabo Nkosi</td>
                <td data-field="Country">South Africa</td>
            </TableRow>
            <TableRow>
                <td data-field="Company">Norse Bites</td>
                <td data-field="Contact">Erik Hansen</td>
                <td data-field="Country">Denmark</td>
            </TableRow>
        </StaticPaginatedTable>
    )
}

export default SampleStaticPaginatedTable;