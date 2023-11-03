// import "./App.css";
// import CurrencyRow from "./components/CurrencyRow";
// import { useEffect, useState } from "react";

// const BASE_URL =
//   "https://v6.exchangerate-api.com/v6/fdeea4bc814b0cdbed24aa22/latest/USD";
// // const API_KEY = "5fc048c69af0a564c05cce7390077c5d";

// function App() {
//   const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
//   console.log(currencyOptions);

//   const [fromCurrency, setFromCurrency] = useState<string>();
//   const [toCurrency, setToCurrency] = useState<string>();
//   const [amount, setAmount] = useState<number>(1);
//   const [amountInFromCurrency, setAmountInFromCurrency] =
//     useState<boolean>(true);
//   const [exchangeRate, setExchangeRate] = useState<number>();

//   let toAmount, fromAmount;
//   if (amountInFromCurrency) {
//     fromAmount = amount;
//     toAmount = amount * exchangeRate!;
//   } else {
//     toAmount = amount;
//     fromAmount = amount / exchangeRate!;
//   }

//   useEffect(() => {
//     fetch(`${BASE_URL}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const firstCurrency = Object.keys(data.conversion_rates)["48"];
//         setCurrencyOptions([
//           data.base_code,
//           ...(Object.keys(data.conversion_rates) as string[]),
//         ]);
//         setFromCurrency(data.base_code),
//           setToCurrency(firstCurrency),
//           setExchangeRate(data.conversion_rates[firstCurrency]);
//       });
//   }, []);

//   function handleFromAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setAmount(Number(e.target.value));
//     setAmountInFromCurrency(true);
//   }

//   function handleToAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setAmount(Number(e.target.value));
//     setAmountInFromCurrency(false);
//   }

//   useEffect(() => {
//     if (fromCurrency != null && toCurrency != null) {
//       fetch(
//         `${BASE_URL}?base_code=${fromCurrency}&conversion_rates=${toCurrency}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           setExchangeRate(data.conversion_rates[toCurrency]);
//         });
//     }
//   }, [fromCurrency, toCurrency]);

//   return (
//     <>
//       <h1>Convert</h1>
//       <CurrencyRow
//         currencyOptions={currencyOptions}
//         selectedCurrency={fromCurrency}
//         onChangeCurrency={(event) => setFromCurrency(event.target.value)}
//         amount={fromAmount}
//         onChangeAmount={handleFromAmountChange}
//       />
//       <div className="equals">=</div>
//       <CurrencyRow
//         currencyOptions={currencyOptions}
//         selectedCurrency={toCurrency}
//         onChangeCurrency={(event) => setToCurrency(event.target.value)}
//         amount={toAmount}
//         onChangeAmount={handleToAmountChange}
//       />
//     </>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import CurrencyRow from "./components/CurrencyRow";

const BASE_URL =
  "https://v6.exchangerate-api.com/v6/fdeea4bc814b0cdbed24aa22/latest/";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("GEL");
  const [amount, setAmount] = useState<number>(1);
  const [amountInFromCurrency, setAmountInFromCurrency] =
    useState<boolean>(true);
  const [exchangeRate, setExchangeRate] = useState<number>();

  let toAmount, fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate!;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate!;
  }

  useEffect(() => {
    fetch(`${BASE_URL}${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyOptions([
          data.base_code,
          ...(Object.keys(data.conversion_rates) as string[]),
        ]);
        setExchangeRate(data.conversion_rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value));
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value));
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(event) => setFromCurrency(event.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(event) => setToCurrency(event.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </>
  );
}

export default App;
