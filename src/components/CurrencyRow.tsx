import classes from "./CurrencyRow.module.css";

type CurrencyProps = {
  currencyOptions: string[];
  selectedCurrency: string | undefined;
  onChangeCurrency: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  amount: number;
  onChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CurrencyRow = ({
  amount,
  onChangeCurrency,
  currencyOptions,
  selectedCurrency,
  onChangeAmount,
}: CurrencyProps) => {
  return (
    <div className="wrapper">
      <input
        type="number"
        className={classes.input}
        value={amount}
        onChange={onChangeAmount}
        min={0}
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyRow;
