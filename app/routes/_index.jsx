import { useState } from "react";

export const meta = () => {
  return [
    { title: "Tip Calculator" },
    { name: "description", content: "Calculate tips easily!" },
  ];
};

export default function Index() {
  let [billAmount, setBillAmount] = useState(null);
  let [tipPercentage, setTipPercentage] = useState(null);
  let [peopleQuantity, setPeopleQuantity] = useState(null);
  let [totalAmount, setTotalAmount] = useState(0);
  let [tipAmount, setTipAmount] = useState(0);

  let tipPercentages = [5, 10, 15, 25, 50];

  console.log({ billAmount });
  console.log({ tipPercentage });
  console.log({ peopleQuantity });

  // let totalAmount;

  function calculateTotal() {
    console.log("calculate total!!");
    let tip = (Number(billAmount) * Number(tipPercentage)) / 100;
    console.log({ tip });

    setTipAmount(tip);

    let total = Number(billAmount) + tip;
    console.log({ total });

    setTotalAmount(total);
  }
  function reset() {
    setBillAmount(null);
    setPeopleQuantity(null);
    setTipPercentage(null);
    setTipAmount(0);
    setTotalAmount(0);
  }

  return (
    <main className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-4 bg-white lg:max-w-5xlmx-auto p-4">
        <div className="text-gray-800">
          <Label htmlFor="bill">Bill</Label>
          <Input
            type="number"
            name="bill"
            id="bill"
            placeholder={1000}
            value={billAmount}
            setValue={setBillAmount}
          />

          <p className="mt-8 capitalize">Select Tip</p>

          <div className="mt-4  w-full grid grid-cols-3 gap-4">
            {tipPercentages.map((item, index) => (
              <Tip
                key={index}
                percentage={item}
                tipPercentage={tipPercentage}
                setTipPercentage={setTipPercentage}
              />
            ))}

            <label className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 flex gap-2">
              <input type="radio" name="tip" />
              Custom
            </label>
          </div>

          <Label htmlFor="people" className="mt-8 inline-block">
            Number of People
          </Label>
          <Input
            type="number"
            name="people"
            id="people"
            placeholder={2}
            value={peopleQuantity}
            setValue={setPeopleQuantity}
          />
        </div>
        <Button
          type="button"
          className="border-transparent bg-[#26bfae] w-full bg-customBg mt-10 py-1 text-noCustom text-xl rounded-lg"
          handleClick={calculateTotal}
        >
          calculate
        </Button>

        <div className="border rounded-md border-transparent bg-[#0d484c] m-7 p-6">
          <div>
            <div className="flex justify-between">
              <p className="text-xl text-white">Tip Amount</p>
              <Amount amount={tipAmount} />
            </div>

            <p>/per person</p>
          </div>

          <div className="flex justify-between mt-3">
            <div>
              <p className="text-xl text-white">Total</p>
              <p>/per person</p>
            </div>
            <Amount amount={totalAmount} />
          </div>
          <Button handleClick={reset}>Reset</Button>
        </div>
      </div>
    </main>
  );
}
function Tip({ percentage, setTipPercentage, tipPercentage }) {
  return (
    <label className="px-4 py-2 rounded-md bg-brand-teal text-gray-200 flex gap-2">
      <input
        type="radio"
        name="tip"
        value={percentage}
        checked={percentage === Number(tipPercentage)}
        onChange={(event) => setTipPercentage(event.target.value)}
      />
      {percentage}%
    </label>
  );
}
//Input component
function Input({ type, name, id, placeholder, value, setValue }) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(event) => setValue(event.target.value)}
      onBlur={(event) => setValue(event.target.value)}
      className="border border-gray-300 p-2 w-full block "
    />
  );
}
function Label({ children, htmlFor }) {
  return <label htmlFor={htmlFor}>{children}</label>;
}
//Amount component

function Amount({ amount }) {
  return <p className="text-lg font-bold">{amount}</p>;
}

function Button({ children, handleClick }) {
  return (
    <button
      type="button"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
