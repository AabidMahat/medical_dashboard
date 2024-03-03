/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import { Link } from "react-router-dom";

const url = "http://localhost:8400/cities";

export default function Data() {
  const [medicalData, setMedicalData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setMedicalData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" borderRadius="50%" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const rows = medicalData.map((data) => ({
    author: (
      <Author
        image="https://st2.depositphotos.com/1907633/6917/i/450/depositphotos_69170339-stock-photo-smart-medical-doctor-hand-showing.jpg"
        name={data.cityName}
        email={data.notes}
      />
    ),
    function: <Job title={`${data.mapData.distance} KM`} />,
    status: (
      <MDBox ml={-1}>
        <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
      </MDBox>
    ),
    employed: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {data.contact}
      </MDTypography>
    ),
    action: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        <Link to="http://localhost:5173/app/cities" style={{ color: "grey" }}>
          Map
        </Link>
      </MDTypography>
    ),
  }));

  return {
    columns: [
      { Header: "Medical Store", accessor: "author", width: "45%", align: "left" },
      { Header: "Distance", accessor: "function", align: "left" },
      { Header: "isOpen", accessor: "status", align: "center" },
      { Header: "Contact", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: rows,
  };
}
