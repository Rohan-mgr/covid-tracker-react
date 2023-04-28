import { useEffect, useState } from "react";
import "../../assets/css/Home.css";
import Card from "../../Components/Common/Card";
import { Container, Row, Col } from "react-bootstrap";
import axios from "../../config";
import coronaLogo from "../../assets/images/corona-logo.png";
import LineChart from "../../Components/Chart/LineChart.jsx";

function Home() {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [url, setUrl] = useState("/all");
  const [countries, setCountries] = useState(null);
  const [data, setData] = useState({
    infected: 0,
    recovered: 0,
    deaths: 0,
  });

  useEffect(() => {
    axios
      .get("/countries")
      .then((res) => {
        setCountries(res?.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData((prevState) => {
          return {
            ...prevState,
            infected: res?.data.active,
            recovered: res?.data.recovered,
            deaths: res?.data.deaths,
          };
        });
      })
      .catch((err) => console.log(err));
  }, [url]);
  function handleChange(e) {
    setSelectedCountry(e.target.value);
    if (e.target.value === "all") {
      setUrl("/all");
    } else {
      setUrl(`/countries/${e.target.value}?strict=true`);
    }
    setData({
      infected: 0,
      recovered: 0,
      deaths: 0,
    });
  }

  return (
    <div className="home">
      <div className="home__logo__wrapper">
        <img src={coronaLogo} alt="covid-png" />
      </div>
      <Container fluid>
        <Row>
          <Col xs={12} sm={4} lg={4}>
            <Card title="Infected" color="#f5dd42" Data={data.infected} />
          </Col>
          <Col xs={12} sm={4} lg={4}>
            <Card title="Recovered" color="green" Data={data.recovered} />
          </Col>
          <Col xs={12} sm={4} lg={4}>
            <Card title="Deaths" color="red" Data={data.deaths} />
          </Col>
        </Row>
      </Container>
      <div className="drop__down">
        <label>Live Cases by Country: </label>
        <select onChange={(e) => handleChange(e)}>
          <option value="all">Global</option>
          {countries?.map((c) => {
            return (
              <option key={c.country} value={c.country}>
                {c.country}
              </option>
            );
          })}
        </select>
      </div>
      <div className="home__graph">
        <LineChart SelectedCountry={selectedCountry} />
      </div>
      <div>
        <p
          style={{
            margin: "1rem 0",
            textAlign: "center",
          }}
        >
          Rohan &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Home;
