import "../styles/Spinner.css";

const Spinner = ({ text = "Loading..." }) => (
  <div className="spinner">
    <div className="spinner-circle"></div>
    <div className="spinner-text">{text}</div>
  </div>
);

export default Spinner;