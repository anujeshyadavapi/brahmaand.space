import { Button, Modal, ModalBody, Label, FormGroup, Input } from "reactstrap";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Multiselect from "multiselect-react-dropdown";
import business from "../images/business.png";
// import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";Im
import { ImCancelCircle } from "react-icons/im";
import React from "react";
import axios from "axios";
import dummy from "../../src/images/dummy.png";
import imageToBase64 from "image-to-base64/browser";
import swal from "sweetalert";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import {
  Navbar,
  Nav,
  Container,
  Col,
  Row,
  Form,
  InputGroup,
} from "react-bootstrap";
import "../styles/Navbar.css";
import Logo from "../assets/logos/logo.png";
import { useEffect, useState, useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContextMenu } from "../context/MenuContext";
import { useAuth } from "../context/AuthContext";
import agreement_download from "../assets/files/Dispatch305-agreement.pdf";
import UserPage from "./UserPage";

function CustomNavbar(args) {
  const [validated, setValidated] = useState(false);
  const [link, setLink] = useState("");
  const [catgry, setCatgry] = useState("");
  const [subcatry, setSubcatry] = useState("");
  const [type, setType] = useState("");
  const [formate, setformate] = useState("");
  const [topic, setTopic] = useState([]);
  const [Desc, setDesc] = useState("");
  const [Optitle, setOptitle] = useState("");
  const [first, setfirst] = useState({});
  const [lngage, setLngage] = useState([]);
  const [sellang, setSellang] = useState();
  const [relyear, setRelyear] = useState([]);
  const [selectedyear, setSelectedyear] = useState();
  const [cat_img, setCat_img] = useState({});
  const [Opcname, setOpcname] = useState("");
  const [Opdes, setOpdes] = useState("");
  const [Opcomm, setOpcomm] = useState("");
  const [title, settitle] = useState({});
  const [error, setError] = useState(null);
  const [conimg, setConimg] = useState("");

  var fileUpload = (e) => {
    setCat_img(e.target.files[0]);
    // setCat_img({
    //   picturePreview: URL.createObjectURL(e.target.files[0]),
    //   pictureAsFile: e.target.files[0],
    // });
  };
  imageToBase64(cat_img) // Path to the image
    .then((response) => {
      setConimg(response); // "cGF0aC90by9maWxlLmpwZw=="
      // setConvertimg(response);
      // console.log(response);
    })
    .catch((error) => {
      console.log(error); // Logs an error if there was one
    });
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const userid = localStorage.getItem("userId");

  // function urlPatternValidation(link) {
  //   const regex = new RegExp(
  //     "https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)"
  //   );
  //   return regex.test(link);
  // }

  const handleSubmitResource = (e) => {
    e.preventDefault();

    const userid = localStorage.getItem("userId");

    const answerarray = topic.split(",");
    console.log(answerarray);
    if (cat_img == "" && cat_img == null && cat_img == undefined) {
      setCat_img(dummy);
    }
    if (
      link != "" &&
      catgry !== "" &&
      subcatry !== "" &&
      type !== "" &&
      formate !== "" &&
      sellang !== "" &&
      topic != "" &&
      Desc != ""
    ) {
      axios
        .post(`http://3.7.173.138:9000/user/App_Sub_resrc`, {
          link: link,
          category: catgry,
          sub_category: subcatry,
          type: type,
          format: formate,
          language: sellang,
          topics: answerarray,
          desc: Desc,
          resTitle: Optitle,
          creatorName: Opcname,
          relYear: selectedyear,
          res_desc: Opdes,
          comment: Opcomm,
          img: conimg,
          userid: userid,
        })
        .then((res) => {
          console.log(res.data.data);
          if (res.data.message === "success") {
            swal("Resource Submitted Successfully????");
            setLink("");
            setCatgry("");
            setSubcatry("");
            setType("");
            setformate("");
            setSellang("");
            setTopic("");
            setDesc("");
            setOptitle("");
            setOpcname("");
            setSelectedyear("");
            setOpdes("");
            setOpcomm("");
            setCat_img(null);
            setModal(false);
          } else {
            swal("Something went wrong, Try again");
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          if (error.response.data.message === "error") {
            swal(" * Fields are Mandatory Please fill details ");
          } else {
          }
        });
    } else {
      swal(" * Fields are mandatory Please fill details");
    }
  };

  // all category
  const [allcatego, setAllcatego] = useState([]);
  const allcategory = () => {
    axios
      .get(`http://3.7.173.138:9000/admin/getallCategory`)

      .then((response) => {
        setAllcatego(response.data.data);
        //console.log("submit resorcecat", response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.data);
      });
  };

  const [subctgry, setSubctgry] = useState([]);

  const fetchallget = () => {
    // catgry = catgry;
    // console.log(catgry);
  };

  useEffect(() => {
    const params = catgry;

    // function allsubcategory() {
    axios

      .get(`http://3.7.173.138:9000/admin/listbycategory/${params}`)
      .then((response) => {
        console.log(response.data.data);
        setSubctgry(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    // }
  }, [catgry]);

  // all year selection api
  const getYear = () => {
    axios
      .get(`http://3.7.173.138:9000/user/allYear`)
      .then((response) => {
        setRelyear(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getLanguage = () => {
    axios
      .get(`http://3.7.173.138:9000/user/allLang`)
      .then((response) => {
        setLngage(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getYear();
    fetchallget();
    allcategory();

    getLanguage();
  }, []);

  const [open, setOpen] = useState("1");
  const toggler = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const { current_link, setCurrentLinkHelper } = useContextMenu();

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [inputList, setinputList] = useState([{ Languages: "" }]);
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  // useEffect(() => {
  //   // console.log(current_link);
  // }, [current_link]);

  // const onSelect = (selectedList, selectedItem) => {
  //   setSellang(Sellang.concat(selectedItem._id));
  //   console.log(sellang);
  // };
  const onSelect = (selectedList, selectedItem) => {
    console.log(selectedList);
    var selectItem1 = [];

    for (var i = 0; i < selectedList.length; i++) {
      selectItem1.push(selectedList[i]._id);
    }
    console.log("aaaa", selectItem1);
    setSellang(selectItem1);
    // console.log(sellang);
  };

  const onRemove = (selectedList, removedItem) => {
    console.log(selectedList);
  };

  const onSelesubcat = (selectedsubcat, selectedItem) => {
    // setLngage(selectedList);
  };
  return (
    <Navbar
      bg="light"
      variant="light"
      className="navbar"
      collapseOnSelect
      expand="lg"
    >
      <Navbar.Brand exact to="/" as={NavLink} className="navbar-brand">
        <img
          src={Logo}
          width="150px"
          height="90px"
          className="d-inline-block align-top navbar-brand-img"
          alt="React Bootstrap logo"
          onClick={() => setCurrentLinkHelper("Home")}
        />
      </Navbar.Brand>

      <Navbar.Toggle
        className="navbar-toggle"
        aria-controls="responsive-navbar-nav"
      />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto navbar-nav">
          {/*user not login  */}
          {localStorage.getItem("userId") !== "" &&
          localStorage.getItem("userId") !== null &&
          localStorage.getItem("userId") !== undefined ? (
            <Nav.Link as={NavLink} className="navbar-link">
              <button
                className="btn rbutton mobile"
                type="submit"
                onClick={toggle}
              >
                <h4 className="rText">+Submit a Content</h4>
              </button>
              <Container>
                <Modal
                  toggle={toggle}
                  {...args}
                  className="mdlg"
                  isOpen={modal}
                >
                  <div className="p-3 w-100">
                    <Row className=" justify-content-right canceltoggle">
                      <Col lg="10" md="8">
                        <h2
                          style={{ font: "GT Walsheim Pro", fontSize: "25px" }}
                        >
                          Submit a Content
                        </h2>
                      </Col>
                      <Col
                        style={{ justifyContent: "right" }}
                        className="d-flex justify-content-right align-item-right"
                        lg="2"
                        md="4"
                      >
                        <ImCancelCircle
                          className="setmodelfalseicon"
                          onClick={() => setModal(false)}
                          size={25}
                        />
                      </Col>
                    </Row>
                    <hr></hr>
                    <p>
                      You know a content of any niche
                      (Education/Politics/General Affairs etc.) Post the content
                      and we will publish it on our website which can be rated
                      and reviewed by users and has potential to become viral.
                      It will also help the content reach a global audience.
                      <p>
                        <b> Moreover it will help you win cool prizes daily.</b>
                      </p>
                    </p>
                    <Link onClick={() => setModal(false)} to="/leaderboard">
                      <h5 className="mt-2" style={{ color: "#5F56C6" }}>
                        Checkout Leaderboard Here.
                      </h5>
                    </Link>

                    <ModalBody>
                      <Form
                        noValidate
                        validated={validated}
                        // onSubmit={handleSubmit}
                      >
                        <div className="">
                          <Row>
                            <Label>
                              {link != "" ? (
                                <p>Link</p>
                              ) : (
                                <p style={{ color: "red" }}>
                                  Link <span style={{ color: "Red" }}>*</span>
                                </p>
                              )}
                            </Label>
                            <h5>
                              <input
                                type="url"
                                value={link}
                                className="form-control "
                                placeholder="https://www. "
                                onChange={(e) => setLink(e.target.value)}
                              />
                            </h5>
                            {error !== "" ? (
                              <h6 style={{ color: "red" }}>{error}</h6>
                            ) : null}
                          </Row>
                        </div>
                        <div>
                          <Row>
                            <Col>
                              <Label style={{ font: "GT Walsheim Pro" }}>
                                {catgry !== "" ? (
                                  <p
                                    style={{ color: "black" }}
                                    className="mt-4"
                                  >
                                    Category
                                  </p>
                                ) : (
                                  <p style={{ color: "red" }} className="mt-4">
                                    Category
                                    <span style={{ color: "red" }}>*</span>
                                  </p>
                                )}
                                {/* <b className="mt-4">
                                  Category
                                  <span style={{ color: "red" }}>*</span>
                                </b> */}
                              </Label>
                              <Input
                                required
                                type="select"
                                name="catgry"
                                className="form-control"
                                onChange={(e) => setCatgry(e.target.value)}
                              >
                                <option>Select Category</option>
                                {allcatego?.map((allCategory) => {
                                  return (
                                    <option
                                      value={allCategory?._id}
                                      key={allCategory?._id}
                                    >
                                      {allCategory?.title}
                                    </option>
                                  );
                                })}
                              </Input>
                            </Col>

                            <Col>
                              <Label style={{ font: "GT Walsheim Pro" }}>
                                {subcatry !== "" ? (
                                  <p
                                    style={{ color: "black" }}
                                    className="mt-4"
                                  >
                                    Sub-Category
                                  </p>
                                ) : (
                                  <p style={{ color: "red" }} className="mt-4">
                                    Sub-Category
                                    <span style={{ color: "red" }}>*</span>
                                  </p>
                                )}
                              </Label>

                              <select
                                required
                                type="select"
                                name="title"
                                className="form-control"
                                onChange={(e) => setSubcatry(e.target.value)}
                              >
                                <option>Select Sub-Category</option>
                                {subctgry?.map((subctgry) => {
                                  return (
                                    <option
                                      value={subctgry?._id}
                                      key={subctgry?._id}
                                    >
                                      {subctgry?.title}
                                    </option>
                                  );
                                })}
                              </select>
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <Label
                                className="mt-3"
                                style={{ font: "GT Walsheim Pro" }}
                              >
                                {type !== "" ? (
                                  <p
                                    style={{ color: "black" }}
                                    className="mt-4"
                                  >
                                    Type
                                  </p>
                                ) : (
                                  <p style={{ color: "red" }} className="mt-4">
                                    Type
                                    <span style={{ color: "red" }}>*</span>
                                  </p>
                                )}

                                {/* <b>
                                  Type <span style={{ color: "red" }}>*</span>
                                </b> */}
                              </Label>
                              <select
                                required
                                onChange={(e) => setType(e.target.value)}
                                className="form-control"
                              >
                                <option>Select Type</option>
                                <option>Free</option>
                                <option>Paid</option>
                              </select>
                            </Col>

                            <Col>
                              <Label
                                className="mt-3"
                                style={{ font: "GT Walsheim Pro" }}
                              >
                                {formate !== "" ? (
                                  <p
                                    style={{ color: "black" }}
                                    className="mt-4"
                                  >
                                    Format
                                  </p>
                                ) : (
                                  <p style={{ color: "red" }} className="mt-4">
                                    Format
                                    <span style={{ color: "red" }}>*</span>
                                  </p>
                                )}
                                {/* <b>
                                  Format <span style={{ color: "red" }}>*</span>
                                </b> */}
                              </Label>
                              <select
                                required
                                onChange={(e) => setformate(e.target.value)}
                                className="form-control"
                              >
                                <option>Select Formate</option>
                                <option>Video</option>
                                <option>Text</option>
                                <option>Video & Text</option>
                              </select>
                            </Col>
                          </Row>
                        </div>

                        <Row className="d-flex w-100%">
                          <Col lg="12">
                            <Label
                              className="mt-3"
                              style={{ font: "GT Walsheim Pro" }}
                            >
                              {sellang !== "" &&
                              sellang !== null &&
                              sellang !== undefined ? (
                                <p>Language of Content</p>
                              ) : (
                                <p style={{ color: "red" }}>
                                  Language of Content
                                  <span style={{ color: "red" }}>*</span>
                                </p>
                              )}
                              {/* <b>
                                Language of Content
                                <span style={{ color: "red" }}>*</span>
                              </b> */}
                            </Label>
                            <Multiselect
                              style={{ borderRadius: "14px" }}
                              placeholder="Select language"
                              className="w-100%"
                              options={lngage}
                              onSelect={onSelect}
                              onRemove={onRemove}
                              displayValue="language"
                            />
                          </Col>
                        </Row>

                        <div>
                          {/* <Row>
                          <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                          >
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>First name</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                defaultValue="Mark"
                              />
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form>
                        </Row> */}
                          <Row>
                            <Label
                              className="mt-3"
                              style={{ font: "GT Walsheim Pro" }}
                            >
                              {topic != "" ? (
                                <p>Topic </p>
                              ) : (
                                <p style={{ color: "red" }}>
                                  Topic <span style={{ color: "red" }}>*</span>
                                </p>
                              )}
                            </Label>
                            {/* <Row className="mt-3 mb-3 textarea">
                              <Form.Group controlId="validationCustomtopics">
                                <Form.Label>
                                  <b>
                                    Topic{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </b>
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <textarea
                                    className="form-control"
                                    style={{
                                      // width: "auto",
                                      height: "120px",
                                      borderRadius: "10px",
                                    }}
                                    type="text"
                                    placeholder="topics "
                                    // value={email}
                                    // onChange={(e) => setEmail(e.target.value)}
                                    aria-describedby="inputGroupPrepend"
                                    required
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    Please choose at Least Five topics Topics.
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>
                            </Row> */}
                            <h5>
                              <textarea
                                type="text"
                                // style={{ background: "#F1F1F1" }}
                                className="form-control"
                                placeholder="like- javaScript, react, native"
                                onChange={(e) => setTopic(e.target.value)}
                              />
                            </h5>
                            <h6>
                              Add Topics that covers Resource.Separate multiple
                              topic with commas.
                              <span style={{ color: "red" }}>
                                At Least Five Topics
                              </span>
                            </h6>
                          </Row>
                        </div>
                        <div>
                          <Row>
                            <Label
                              className="mt-4"
                              style={{ font: "GT Walsheim Pro" }}
                            >
                              {Desc != "" &&
                              Desc != null &&
                              Desc != undefined ? (
                                <p>
                                  Descriptions
                                  <span>*</span>
                                </p>
                              ) : (
                                <p style={{ color: "red" }}>
                                  Descriptions
                                  <span style={{ color: "red" }}>*</span>
                                </p>
                              )}
                              {/* <b>
                                Descriptions
                                <span style={{ color: "red" }}>*</span>
                              </b> */}
                            </Label>
                            <h5>
                              <textarea
                                type="text"
                                // style={{ background: "#F1F1F1" }}
                                className="form-control"
                                placeholder=" Enter blog description here"
                                onChange={(e) => setDesc(e.target.value)}
                              />
                            </h5>
                          </Row>

                          <Row>
                            <Label
                              className="mt-3"
                              style={{ font: "GT Walsheim Pro" }}
                            >
                              <b>Upload Image of Related Content </b>
                            </Label>
                            <h5>
                              <input
                                type="file"
                                // style={{ background: "#F1F1F1" }}
                                className="form-control imageuserupload"
                                onChange={fileUpload}
                              />
                            </h5>
                          </Row>
                          <b className="mt-1">Release year/last Updated</b>
                          <Row className="mx-1">
                            <Label style={{ font: "GT Walsheim Pro" }}></Label>

                            <Input
                              type="select"
                              className="form-control"
                              name="yrName"
                              onChange={(e) => {
                                setSelectedyear(e.target.value);
                              }}
                            >
                              <option>Select Year</option>
                              {relyear?.map((yr) => {
                                return (
                                  <option value={yr?._id} key={yr?._id}>
                                    {yr?.yrName}
                                  </option>
                                );
                              })}
                            </Input>
                          </Row>
                          <p className=" mb-3">
                            Which year was this resource Was released or last
                            updated?
                          </p>
                        </div>
                        <div>
                          <Row>
                            <Col lg="12">
                              <FormGroup>
                                <Label className="mt-3">
                                  <h6>
                                    <b>Optional</b>
                                  </h6>
                                </Label>

                                <Accordion open={open} toggle={toggler}>
                                  <AccordionItem>
                                    <AccordionHeader targetId="1">
                                      Optional Fields
                                    </AccordionHeader>

                                    <AccordionBody accordionId="1">
                                      <div>
                                        <Row>
                                          <Label
                                            style={{ font: "GT Walsheim Pro" }}
                                          >
                                            <b>Title of your Resource</b>
                                          </Label>
                                          <input
                                            type="text"
                                            // style={{ background: "#F1F1F1" }}
                                            className=" form-control mb-3"
                                            placeholder="Title of the resource?"
                                            onChange={(e) =>
                                              setOptitle(e.target.value)
                                            }
                                          />
                                        </Row>

                                        <Row>
                                          <Label
                                            style={{ font: "GT Walsheim Pro" }}
                                          >
                                            <b>Creator Name</b>
                                          </Label>
                                          <input
                                            type="text"
                                            // style={{ background: "#F1F1F1" }}
                                            className="form-control mb-3"
                                            placeholder="author of the resource?"
                                            onChange={(e) =>
                                              setOpcname(e.target.value)
                                            }
                                          />
                                        </Row>

                                        {/* <Row>
                                          <Label
                                            style={{ font: "GT Walsheim Pro" }}
                                          >
                                            <b>Release year/last Updated</b>
                                          </Label>
                                          <Input
                                            type="select"
                                            className="form-control"
                                            name="yrName"
                                            onChange={(e) => {
                                              setSelectedyear(e.target.value);
                                            }}
                                          >
                                            <option>Select Year</option>
                                            {relyear?.map((yr) => {
                                              return (
                                                <option
                                                  value={yr?._id}
                                                  key={yr?._id}
                                                >
                                                  {yr?.yrName}
                                                </option>
                                              );
                                            })}
                                          </Input>
                                          <p className=" mb-3">
                                            What year was this resource released
                                            or last updated?
                                          </p>
                                        </Row> */}

                                        <Row>
                                          <Label
                                            style={{ font: "GT Walsheim Pro" }}
                                          >
                                            <b>Description</b>
                                          </Label>
                                          <h5>
                                            <textarea
                                              type="text"
                                              // style={{ background: "#F1F1F1" }}
                                              className="form-control mb-3"
                                              placeholder="describe the resource in a few sentences, topics it covers?"
                                              onChange={(e) =>
                                                setOpdes(e.target.value)
                                              }
                                            />
                                          </h5>
                                        </Row>

                                        <Row>
                                          <Label
                                            style={{ font: "GT Walsheim Pro" }}
                                          >
                                            <b>Comments</b>
                                          </Label>
                                          <h5>
                                            <textarea
                                              type="text"
                                              // style={{ background: "#F1F1F1" }}
                                              className="form-control "
                                              placeholder="Add anything you want to let us know"
                                              onChange={(e) =>
                                                setOpcomm(e.target.value)
                                              }
                                            />
                                          </h5>
                                        </Row>

                                        <h6>
                                          Thesefields are optional, but it will
                                          help others find the resource more
                                          easily.
                                        </h6>
                                      </div>
                                    </AccordionBody>
                                  </AccordionItem>
                                </Accordion>
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                        <div>
                          <Row>
                            <Col lg="8"></Col>
                            <Col>
                              <Button
                                onClick={() => setModal(false)}
                                color="danger"
                                className="m-1"
                              >
                                Discard
                              </Button>
                              <Button
                                color="success"
                                className="m-1"
                                onClick={handleSubmitResource}
                              >
                                SUBMIT
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </Form>
                    </ModalBody>
                  </div>
                </Modal>
              </Container>
            </Nav.Link>
          ) : (
            <Nav.Link as={NavLink} className="navbar-link">
              <Link to={`/signup`}>
                <button
                  className="btn rbutton mobile"
                  onClick={() =>
                    swal(
                      "For Submit a content",
                      "Need To Signup for Submit a Content"
                    )
                  }
                >
                  <h4 className="rText">+ Submit a Content</h4>
                </button>
              </Link>
            </Nav.Link>
          )}

          {/* signup and login condition */}
          {localStorage.getItem("userId") !== "" &&
          localStorage.getItem("userId") !== null &&
          localStorage.getItem("userId") !== undefined ? (
            <Nav.Link>
              <UserPage />
            </Nav.Link>
          ) : (
            <>
              <Nav.Link
                exact
                to="/signup"
                as={NavLink}
                className="navbar-link"
                style={{ marginTop: 25 }}
              >
                <span className="text bSignUp" aria-current="page">
                  Sign up
                </span>
              </Nav.Link>

              <Nav.Link
                exact
                to="/login"
                as={NavLink}
                className="navbar-link lText"
              >
                <button className="btn rLogin mobile" type="submit">
                  <span className="">LOGIN</span>
                </button>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
      {/* <UserPage/> */}
    </Navbar>
  );
}

export default CustomNavbar;
