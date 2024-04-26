import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { TextField } from "@mui/material";
import Toast, { showToast } from "./Toast";
import { useMaterialUIController } from "context";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function PlatformSettings() {
  const context = useMaterialUIController();
  // const [changePasscodeSwitch, setChangePasscodeSwitch] = useState(false);
  const [newLaunches, setNewLaunches] = useState(false);
  const [currentPasscode, setcurrentPasscode] = useState("test1234");
  const [newPasscode, setnewPasscode] = useState("test1234");
  const [confirmPasscode, setconfirmPasscode] = useState("test1234");

  const [productUpdate, setProductUpdate] = useState(false);

  const [newsletter, setNewsletter] = useState(false);

  console.log(context[0].loginPassword);
  const handleSubmitResponse = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:4000/api/v1/patients/updateMyPassword",
        {
          passwordCurrent: currentPasscode,
          password: newPasscode,
          passwordConfirm: confirmPasscode,
        },
        {
          withCredentials: true,
        }
      );
      const data = await response.data;
      console.log(response.status);
      if (currentPasscode !== context[0].loginPassword) {
        toast.error("Wrong Password . Please confirm again", {
          position: "top-center",
          theme: "dark",
          autoClose: 3000,
        });
        return;
      }
      if (currentPasscode === context[0].loginPassword && data.status === "success") {
        toast.success("Password Update Successfully", {
          position: "top-center",
          theme: "dark",
          autoClose: 3000,
        });

        await axios.get("http://localhost:4000/api/v1/patients/logOut", {
          withCredentials: true,
        });

        setTimeout(() => {
          window.location.href = "/authentication/sign-in";
        }, 3500);
        setNewsletter(false);
      }
    } catch (err) {
      console.log(err);
    }
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
                value={currentPasscode}
                onChange={(e) => setcurrentPasscode(e.target.value)}
              ></TextField>
            ) : (
              <MDTypography variant="button" fontWeight="regular" color="text">
                Current Passcode
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
                value={newPasscode}
                onChange={(e) => setnewPasscode(e.target.value)}
              ></TextField>
            ) : (
              <MDTypography variant="button" fontWeight="regular" color="text">
                New Passcode
              </MDTypography>
            )}
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            {productUpdate ? (
              <TextField
                size="small"
                variant="outlined"
                fontSize="1.3rem"
                fullWidth
                margin="dense"
                value={confirmPasscode}
                onChange={(e) => setconfirmPasscode(e.target.value)}
              ></TextField>
            ) : (
              <MDTypography variant="button" fontWeight="regular" color="text">
                Confirm Passcode
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
                setNewsletter(!newsletter);
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
