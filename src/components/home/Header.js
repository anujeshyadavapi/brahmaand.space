import React, { useState, useEffect } from "react";
import "../../styles/ModulePage.css";
import axios from "axios";
import Head from "../../images/social-media-with-photo-frame-like-button-media-payer-pink-background-illustration 10.png";
import { useNavigate } from "react-router-dom";
import Hastag from "../../../src/components/home/Hastag";
import { Container, Row, Col, Card, Button } from "reactstrap";
import backimg from "../../assets/images/backimg.png";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function Header() {
  const [searchbytopics, setSearchbytopics] = useState("");
  const [searchdata, setSearchdata] = useState("");

  const navigate = useNavigate();
  const [homesearch, setHomesearch] = useState("");

  const items = [
    {
      id: 0,
      name: "Cobol",
    },
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Basic",
    },
    {
      id: 3,
      name: "PHP",
    },
    {
      id: 4,
      name: "Java",
    },
  ];
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  // const landtoproductpage = () => {
  //   console.log(homesearch);
  //   navigate(`/productList/${homesearch}`);
  // };
  const [data, setData] = useState([]);
  const handlesearchtopics = () => {
    console.log(searchdata);
    if (searchdata !== "") {
      navigate(`/productList/${searchdata}`);
      // axios
      //   .post(`http://3.7.173.138:9000/user/search_topic_title`, {
      //     searchinput: searchdata,
      //   })
      //   .then((res) => {
      //     setData(res.data.data);
      //     console.log(res.data.data);
      //     setHomesearch(res.data.data[0]?.sub_category);

      //     if (res.data.data !== "" && res.data.data !== undefined) {
      //       landtoproductpage();
      //     } else {
      //       return <p>No data available</p>;
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }

    // const data = "#learning , #media , #study,  #songs, #learning ";
    // const onedata = data.split(",");
  };
  useEffect(() => {
    handlesearchtopics();
  }, [homesearch]);

  return (
    <>
      <div
        className="mainBg"
        style={{
          backgroundImage: `url(${backimg})`,
          width: "100%",
          padding: "0px 0px",
          backgroundSize: "cover",
        }}
      >
        <section className="text_header ">
          <Container>
            <Row>
              <Col md="6">
                <div className="py-20">
                  <h1>Looking for best content across the world?</h1>
                  <h3 className=" mx-30 ">
                    Finding the quality resources is not a hassle anymore
                  </h3>
                </div>
              </Col>
              <Col md="6">
                <div className="hImage col">
                  <img src={Head} className="imghead" />
                </div>
              </Col>
            </Row>
            <Row></Row>
          </Container>
        </section>
      </div>
      <section>
        <div className="searchbar">
          <div className="inputarea">
            <Row
              className=" align-item-center justify-content-center"
              style={{ width: "100%" }}
            >
              <Col lg="1"></Col>
              <Col className="mt-3 mb-2" lg="10">
                {/* <ReactSearchAutocomplete
                  items={data?.topics}
                  onSearch={handleOnSearch}
                  onHover={handleOnHover}
                  onSelect={handleOnSelect}
                  onFocus={handleOnFocus}
                  autoFocus
                  formatResult={formatResult}
                /> */}
              </Col>
              <Col lg="1"></Col>
            </Row>

            <input
              type="text"
              placeholder="Searching best quality content here . . . "
              className="search"
              value={searchdata}
              onChange={(e) => {
                setSearchdata(e.target.value);
              }}
            />
          </div>
          <div className="text-center mt-3">
            <Button onClick={handlesearchtopics} className="btn btn-success">
              Search
            </Button>
          </div>
        </div>
      </section>
      <br />
      <br />
      <Hastag />

      <br />
      <br />
    </>
  );
}

export default Header;
