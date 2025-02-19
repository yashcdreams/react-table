import { useState } from "react";
import TableComponent from "../atoms/TableComponent";

const DemoPage = () => {
  const [data] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      city: "New York",
      country: "USA",
      phone: "123-456-7890",
      status: "Active",
      createdDate: "08/13/2023",
      updatedDate: "15/02/2025",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      city: "Los Angeles",
      country: "USA",
      phone: "987-654-3210",
      status: "Inactive",
      createdDate: "09/10/2023",
      updatedDate: "10/02/2025",
    },
    // add more rows as needed
  ]);

  const initialColumns = [
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "City", accessor: "city" },
    { Header: "Country", accessor: "country" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Created Date", accessor: "createdDate" },
    { Header: "Status", accessor: "status", pinned: "right" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Demo Table</h1>
      <TableComponent data={data} initialColumns={initialColumns} tableId="demo" />
    </div>
  );
};

export default DemoPage;
