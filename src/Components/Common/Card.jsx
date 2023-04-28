import "../../assets/css/Card.css";
import CountUp from "react-countup";
import { formatNumber } from "../../utils/formater";
import Loader from "./Spinner";

function Card(props) {
  const { title, color, Data } = props;
  return (
    <div className="card" style={{ borderBottom: `5px solid ${color}` }}>
      <p>{title}</p>
      <div>
        {Data ? (
          <h3 style={{ color: `${color}` }}>
            <CountUp start={0} end={Data} duration={1} separator="," />
          </h3>
        ) : (
          <Loader cardTitle={title} />
        )}
      </div>
      <p>{Data ? formatNumber(Data) : <Loader cardTitle={title} />}</p>
      <p>Number of {title} cases of COVID-19.</p>
    </div>
  );
}

export default Card;
