import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import the Dummy datas
import {docs} from '../containers/demo_data';

// import Salient Library
import Card, {CardInfo, CardContent, CardTitle} from '../utils/Salient/UI/Card/Card';
import Table, {TableRow} from '../utils/Salient/UI/Table/TableV2';
import withPagination from '../utils/Salient/UI/Pagination/withPagination';

// Import Components Build with Salient
import SampleDynamicPaginatedTable from '../components/SampleTables/SampleDynamicPaginatedTable';
import SampleStaticPaginatedTable from '../components/SampleTables/SampleStaticPaginatedTable';
import SampleStaticTable from '../components/SampleTables/SampleStaticTable';

const TablesDemo = () => {
  const [tableFilterValue, setTableFilterValue] = useState();
  const ExternalPaginatedTable = withPagination()(Table);

  
  // generic helper function for any filtering
  function filterData(data, keyword) {
      if (!Array.isArray(data)) return [];

      if (!keyword) return data; // Return all rows if keyword is empty

      const lowerKeyword = keyword.toLowerCase();

      return data.filter(item => {
          if (typeof item !== 'object' || item === null) return false;

          return Object.values(item).some(value => {
              if (value == null) return false; // Skip null or undefined values
              return value.toString().toLowerCase().includes(lowerKeyword);
          });
      });
  }

  // filtered table
  const filteredTable = filterData(docs, tableFilterValue);

  return (
    <React.Fragment>
      <Card className="card-border">
        <CardInfo>
          <CardTitle>Dynamic Table with Pagination</CardTitle>
          <p>using pagination in custom component</p>
        </CardInfo>
        <CardContent>
          <input type="text" placeholder="search filter..." style={{display:'block', width: '100%', padding: '.4em', marginBottom: '.2em', boxSizing: "border-box"}} onChange={(e) => setTableFilterValue(e.target.value)}/>
          <SampleDynamicPaginatedTable items={filteredTable} itemsPerPage={3} showPageItemsControl={true} sortable={true} bordered={true}/>
        </CardContent>

        <CardInfo>
          <CardTitle>Dynamic Table with Pagination (With Inner Border)</CardTitle>
          <p>using pagination externally</p>
        </CardInfo>
        <CardContent>
          <input type="text" placeholder="search filter..." style={{display:'block', width: '100%', padding: '.4em', marginBottom: '.2em', boxSizing: "border-box"}} onChange={(e) => setTableFilterValue(e.target.value)}/>
          <ExternalPaginatedTable items={filteredTable} itemsPerPage={5} draggable={true} showColToggleUI={true} columns={["Type", "Name", "Description", "Tags", "Last Viewed", "Expiration"]} showRowSelector={true} bordered={true} tableInnerBordered={true}>
          {(paginatedItems) =>
            (Array.isArray(paginatedItems) ? paginatedItems : []).map((row, index) => (
              <TableRow key={index}>
                <td data-field="Type"><FontAwesomeIcon icon={"file-"+row.Type}></FontAwesomeIcon></td>
                <td data-field="Name">{row.Name} app</td>
                <td data-field="Description">{row.Description}</td>
                <td data-field="Tags">{row.Tags}</td>
                <td data-field="Last Viewed">{row.LastViewed}</td>
                <td data-field="Expiration">{row.Expiration}</td>
              </TableRow>
            ))
          }
          </ExternalPaginatedTable>
        </CardContent>
        <CardInfo>
          <CardTitle>Static Table with Pagination</CardTitle>
        </CardInfo>
        <CardContent>
          <SampleStaticPaginatedTable itemsPerPage={4}/>
        </CardContent>
        <CardInfo>
          <CardTitle>Static Table No Pagination (With Striped)</CardTitle>
        </CardInfo>
        <CardContent>
          <SampleStaticTable />
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

export default TablesDemo;