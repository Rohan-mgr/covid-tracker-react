import Spinner from "react-bootstrap/Spinner";

function Loader({ cardTitle }) {
  return (
    <Spinner
      size="sm"
      animation="border"
      variant={
        cardTitle === "Infected"
          ? "warning"
          : cardTitle === "Deaths"
          ? "danger"
          : "success"
      }
    />
  );
}

export default Loader;
