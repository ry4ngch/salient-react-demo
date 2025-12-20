/**
 * @file Table.test.jsx
 *
 * Tests:
 * 1. Renders static table rows correctly
 * 2. Renders drag handle column when draggable=true
 * 3. Does NOT render drag handle column when draggable=false
 * 4. Drag is ONLY enabled when handle is activated
 * 5. Row checkbox renders in correct column order
 * 6. Pagination-safe rendering for static children
 * 7. Column visibility toggles when checkboxes are changed
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Table, { TableRow } from "./TableV2";

describe("Table component", () => {
  const columns = ["Company", "Contact", "Country"];

  const renderStaticTable = (props = {}) =>
    render(
      <Table columns={columns} draggable {...props}>
        <TableRow>
          <td data-field="Company">Alfreds</td>
          <td data-field="Contact">Maria</td>
          <td data-field="Country">Germany</td>
        </TableRow>
        <TableRow>
          <td data-field="Company">Centro</td>
          <td data-field="Contact">Francisco</td>
          <td data-field="Country">Mexico</td>
        </TableRow>
      </Table>
    );

  test("renders static table rows", () => {
    renderStaticTable();
    expect(screen.getByText("Alfreds")).toBeInTheDocument();
    expect(screen.getByText("Centro")).toBeInTheDocument();
  });

  test("renders drag handle column when draggable=true", () => {
    renderStaticTable({ draggable: true });
    const dragHandles = document.querySelectorAll(".drag-handle");
    expect(dragHandles.length).toBeGreaterThan(0);
  });

  test("does NOT render drag handle column when draggable=false", () => {
    render(
      <Table columns={columns} draggable={false}>
        <TableRow>
          <td data-field="Company">Only Data</td>
          <td data-field="Contact">Test</td>
          <td data-field="Country">Nowhere</td>
        </TableRow>
      </Table>
    );
    const dragHandles = document.querySelectorAll(".drag-handle");
    expect(dragHandles.length).toBe(0);
  });

  test("checkbox column appears AFTER drag handle column", () => {
    renderStaticTable({ showRowSelector: true });
    const firstRow = document.querySelector("tbody tr");
    const cells = firstRow.querySelectorAll("td");

    // Expected order: [0] drag-handle, [1] checkbox, [2+] data columns
    expect(cells[0]).toHaveClass("drag-handle");
    expect(cells[1]).toHaveClass("row-checkbox");
    expect(cells[2]).toHaveTextContent("Alfreds");
  });

  test("row is NOT draggable unless drag handle is activated", () => {
    renderStaticTable({ draggable: true });
    const row = document.querySelector("tbody tr");
    const handle = row.querySelector(".drag-handle span");

    // Initially not draggable
    expect(row).not.toHaveAttribute("draggable", "true");

    // Simulate mouse down on handle
    fireEvent.mouseDown(handle);

    // Row should now be draggable
    expect(row).toHaveAttribute("draggable", "true");
  });

  test("supports static table with pagination children pattern", () => {
    render(
      <Table columns={["Company", "Contact", "Country"]} itemsPerPage={1} currentPage={1}>
        <TableRow>
          <td data-field="Company">PageRow1</td>
          <td data-field="Contact">A</td>
          <td data-field="Country">X</td>
        </TableRow>
        <TableRow>
          <td data-field="Company">PageRow2</td>
          <td data-field="Contact">B</td>
          <td data-field="Country">Y</td>
        </TableRow>
      </Table>
    );
  
    const rows = document.querySelectorAll("tbody tr");
  
    // Page 1 should show first row
    expect(rows[0]).toBeInTheDocument();
    expect(rows[0]).toHaveTextContent("PageRow1");
  
    // Page 1 should include PageRow2 in DOM but you can ignore its content for pagination logic
    expect(rows[1]).toBeInTheDocument();
    expect(rows[1]).toHaveTextContent("PageRow2"); // still in DOM
  });
  

  test("column visibility toggles when column checkbox is changed", () => {
    render(
      <Table
        columns={columns}
        showColToggleUI={true}
        draggable={false} // not needed for this test
      >
        <TableRow>
          <td data-field="Company">Alfreds</td>
          <td data-field="Contact">Maria</td>
          <td data-field="Country">Germany</td>
        </TableRow>
      </Table>
    );

    // Open column toggle dropdown
    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    // Find the Contact column checkbox (index 1)
    const contactCheckbox = screen.getByLabelText("Contact");

    // Initially visible
    expect(screen.getByText("Maria")).toBeInTheDocument();

    // Hide the column
    fireEvent.click(contactCheckbox);
    expect(screen.queryByText("Maria")).not.toBeInTheDocument();

    // Show the column again
    fireEvent.click(contactCheckbox);
    expect(screen.getByText("Maria")).toBeInTheDocument();
  });
});
