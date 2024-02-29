import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { BASE_URL } from "../URLs";

const Home = () => {
  const [users, setUsers] = useState([]);
  console.log(users);
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [city, setcity] = useState("");

  useEffect(() => {
    const fetchUser=async()=>{
     await axios
      .get(`${BASE_URL}/users`)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    fetchUser()
  }, []);

  const handleDelete = (_id) => {
    const confirmation = window.confirm("delete ?");

    if (confirmation) {
      console.log(_id)
      axios
        .delete(`${BASE_URL}/delete`, { _id })
        .then(() => {
          setUsers(users.filter((user) => user._id !== _id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleAdd = () => {
    if (name===""||phone===""||city==="") {
      alert("enter details")
      return
    }
    const newUser = { name, phone, city };

    axios
      .post(`${BASE_URL}/add`, newUser)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    setUsers([...users, newUser]);
    setname("");
    setphone("");
    setcity("");
    console.log(users);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <h2>Added Users</h2>
          </Col>
        </Row>
        <Row
          style={{
            maxHeight: "60vh",
            overflowY: "scroll",
            border: "2px gray solid ",
            borderRadius: "20px",
            padding: "10px",
          }}
        >
          <Col style={{ overflow: "hidden" }}>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>NAME</th>
                  <th>PHONE</th>
                  <th>CITY</th>
                  <th>OPTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.phone ? user.phone : "nill"}</td>
                    <td>{user.city}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                      }}
                    >
                      <MdDeleteForever
                        onClick={() => {
                          handleDelete(user._id);
                        }}
                      />

                      <Link to={`edit/${user._id}`}>
                        <CiEdit color="green" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "90%",
            flexDirection: "row",
            border: "1px solid gray ",
            padding: "10px",
          }}
        >
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="phone"
              value={phone}
              onChange={(e) => {
                setphone(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="city"
              value={city}
              onChange={(e) => {
                setcity(e.target.value);
              }}
            />
          </Form.Group>
          <Button onClick={handleAdd} style={{ height: "35px" }}>
            {" "}
            ADD{" "}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Home;
