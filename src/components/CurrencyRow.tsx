import classes from "./CurrencyRow.module.css";

const CurrencyRow = () => {
  return (
    <div className="wrapper">
      <input type="number" className={classes.input} />
      <select>
        <option value="hi">hi</option>
      </select>
    </div>
  );
};

export default CurrencyRow;
