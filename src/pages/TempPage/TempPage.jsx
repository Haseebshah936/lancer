import React from "react";
import "./index.css";
import { Grid, Button } from "@mui/material";
const columns = [
  { field: "id", headerName: "ID", width: 70 },

  {
    field: "firstname",
    headerName: "First Name",
    width: 130,
    valueGetter: (params) => `${params.row.firstName || ""}`,
  },

  {
    field: "lastname",
    headerName: "Last Name",
    width: 130,
    valueGetter: (params) => `${params.row.lastName || ""}`,
  },

  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "speciality",
    headerName: "Speciality",
    width: 130,
    valueGetter: (params) => `${params.row.Speciality || ""}`,
  },
  {
    field: "lisence",
    headerName: "Lisence",
    width: 130,
    valueGetter: (params) => `${params.row.Lisence || ""}`,
  },

  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
];
const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: 35,
    Speciality: "Dentist",
    Lisence: "12-3567-89",
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
    Speciality: "Allergy",
    Lisence: "12-k123-89",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 45,
    Speciality: "Andrologist",
    Lisence: "az-3567-89",
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    age: 16,
    Speciality: "Cardiologist",
    Lisence: "12-3567-mn",
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: 15,
    Speciality: "Dermatologist",
    Lisence: "12-87iu-89",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: "john",
    age: 150,
    Speciality: "Dentist",
    Lisence: "12-iuiy-89",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    Speciality: "Allergy",
    Lisence: "12-12er-89",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    Speciality: "Anesthisit",
    Lisence: "23-987a-89",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
    Speciality: "Cardiac Surgent",
    Lisence: "12-po87-89",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
    Speciality: "Eye Specialist",
    Lisence: "aa-re43-89",
  },
];

export default function TempPage() {
  const [colData, setColData] = React.useState(columns);
  const [rowData, setRowData] = React.useState(rows);
  const handelClick = (nId) => {
    const tempRow = rowData.filter((item) => item.id !== nId);
    setRowData(tempRow);
  };

  return (
    <div style={{ width: "100vw" }}>
      <div>
        <p style={{ fontSize: "1.6rem" }}>Table Name</p>
      </div>
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item xs={11.5}>
          <table>
            <thead>
              <tr>
                {colData.map((column) => (
                  <th style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {column.headerName}
                  </th>
                ))}
                <th style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  Delede
                </th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((row) => (
                <tr>
                  <td data-label="id" style={{ fontSize: "1.2rem" }}>
                    {row.id}
                  </td>
                  <td data-label="firstName" style={{ fontSize: "1.2rem" }}>
                    {row.firstName}
                  </td>
                  <td data-label="lastName" tyle={{ fontSize: "1.2rem" }}>
                    {row.lastName}
                  </td>
                  <td data-label="fullName" tyle={{ fontSize: "1.2rem" }}>
                    {row.firstName}&nbsp;{row.lastName}
                  </td>
                  <td data-label="Speciality" tyle={{ fontSize: "1.2rem" }}>
                    {row.Speciality}
                  </td>
                  <td data-label="Lisence" tyle={{ fontSize: "1.2rem" }}>
                    {row.Lisence}
                  </td>
                  <td data-label="age" tyle={{ fontSize: "1.2rem" }}>
                    {row.age}
                  </td>
                  <td data-label="delete">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handelClick(row.id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </div>
  );
}
