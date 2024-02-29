import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../URLs";

const Edit = () => {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [city, setcity] = useState("");
  const uid = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/${uid.id}`)
      .then((response) => {
        setname(response.data.name);
        setphone(response.data.phone);
        setcity(response.data.city);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [uid.id]);

  const handleSave = () => {
    if (name === "" || phone === "" || city === "") {
      alert("enter details");
      return;
    }
    const EditedData = { name, phone, city };
    axios
      .put(`${BASE_URL}/update/${uid.id}`, EditedData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
setTimeout(() => {
  Navigate("/")
}, 200);

    
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        // width: "90%",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <Form.Group className="mb-3">
        <Form.Control
          placeholder="name"
          defaultValue={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder="phone"
          defaultValue={phone}
          onChange={(e) => {
            setphone(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder="city"
          defaultValue={city}
          onChange={(e) => {
            setcity(e.target.value);
          }}
        />
      </Form.Group>
      <Button onClick={handleSave} style={{ height: "35px" }}>
        {" "}
        SAVE{" "}
      </Button>
    </div>
  );
};

export default Edit;
