import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { TextField } from "@mui/material";
import Toast, { showToast } from "./Toast";
import { setPatientName } from "context";
import { useMaterialUIController } from "context";
import { setPatientPasscode } from "context";

function PlatformSettings() {
  const context = useMaterialUIController();
  // const [changePasscodeSwitch, setChangePasscodeSwitch] = useState(false);
  const [newLaunches, setNewLaunches] = useState(false);
  const [passcode, setPasscode] = useState("test1234");

  const [productUpdate, setProductUpdate] = useState(false);
  const [newPatient, setNewPatient] = useState("Aabid");

  const [newsletter, setNewsletter] = useState(false);

  const handleSubmitResponse = () => {
    // Simulating data submission, you can replace this with your actual submission logic
    setTimeout(() => {
      // if (context[0].patientName === "Aabid" && context[0].patientPasscode === "test1234") {
      //   showToast("Data Not has been Updated", "warning");
      // } else {
      //   !newsletter && showToast("Data submitted successfully", "success");
      //   setPatientName(context[1], newPatient);
      //   setNewsletter(true);
      // }
      if (newPatient !== "Aabid" && passcode !== "test1234" && !newsletter) {
        showToast("Data submitted successfully", "success");
        setPatientName(context[1], newPatient);
        setPatientPasscode(context[1], passcode);
        setNewsletter(true);
      } else {
        showToast("Data Not has been Updated", "warning");
      }
    }, 2000);
  };

  return (
    <Card sx={{ boxShadow: "none" }}>
      <Toast />
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          platform settings
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
        <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
          account
        </MDTypography>
        <MDBox display="flex" alignItems="center" justifyContent="center" mb={0.5} ml={1} mt={0.5}>
          <MDBox pr={0.7}>
            <span style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Hospital:- </span>
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              {`${context[0].patient?.hospital_name}`}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={1} mt={0.5}>
          <MDBox pr={0.7}>
            <span style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Doctor:- </span>
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              {`${context[0].patient?.doctor_name}`}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={1} mt={0.5}>
          <MDBox pr={0.7}>
            <span style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Dignosis:- </span>
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              {`${context[0].patient?.disease}`}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox mt={3}>
          <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
            Change me
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={newLaunches} onChange={() => setNewLaunches(!newLaunches)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            {newLaunches ? (
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                margin="dense"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              ></TextField>
            ) : (
              <MDTypography variant="button" fontWeight="regular" color="text">
                Change Default Passcode
              </MDTypography>
            )}
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={productUpdate} onChange={() => setProductUpdate(!productUpdate)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            {productUpdate ? (
              <TextField
                size="small"
                variant="outlined"
                fontSize="1.3rem"
                fullWidth
                margin="dense"
                // value={patientName}
                onChange={(e) => setNewPatient(e.target.value)}
              ></TextField>
            ) : (
              <MDTypography variant="button" fontWeight="regular" color="text">
                Change Patient Name
              </MDTypography>
            )}
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch
              checked={newsletter}
              onChange={() => {
                handleSubmitResponse();
              }}
            />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Submit Data
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default PlatformSettings;
