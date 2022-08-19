import React, { useRef, useState } from "react";
import { Alert, Button, Col, Row, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import getCookie from "../../getCookies";
import upload from "../Images/upload.png";
import Loader from "./Loader";

let access = getCookie("access_token");

const headers = {
  Authorization: `Bearer ${access}`,
  "Content-Type": "application/json",
};

export default function UploadQuestion() {
  const { id } = useParams();
  // const [file, setFile] = useState(null)
  const test_name = useSelector((state) => state.tests.test.name);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const file_ref = useRef();

  function upload_file(file) {
    let form_data = new FormData();
    form_data.append("unique_id", id);
    form_data.append("file", file);
    setLoader(true);
    axiosInstance
      .post("/api/test-upload/", form_data, {
        headers: headers,
      })
      .then((res) => {
        if (res.status === 201) {
          window.location = `/question/${id}`;
          file_ref.current.value = "";
          setLoader(false);
        }
      })
      .catch((e) => {
        setError(e.response.data);
        file_ref.current.value = "";
        setTimeout(() => {
          setError(null);
          window.location = "/teacher";
        }, 1000);
      });
  }

  return (
    <div
      style={{
        padding: "0% 10%",
        fontSize: "90%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          boxShadow: "0 8px 6px -6px black",
          border: "none",
          padding: "2%",
          height: "50rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loader && <Loader />}
        <h3 style={{}}>Upload File or Enter Manually</h3>
        {error && (
          <h5
            style={{
              textAlign: "center",
              color: "red",
            }}
          >
            {error}
          </h5>
        )}
        <br />
        <br />
        <center>
        <input
          type={"file"}
          ref={file_ref}
          onChange={(e) => {
            upload_file(e.target.files[0]);
          }}
        />
        </center>
        <Button
          variant="outline-primary"
          style={{ margin: "1%", borderRadius: "20px", width: "30%" }}
          onClick={() => {
            window.location = `/question/${id}`;
          }}
        >
          Enter Question Manually
        </Button>
      </Card>
    </div>
  );
}
