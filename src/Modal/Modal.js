import React, { useRef } from "react";
import "./Modal.scss";
import close from "./close.png";

function Modal({
  active,
  setActive,
  setLoans,
  loans,
  setSuccessInvest,
  successInvest,
}) {
  const investedInput = useRef();
  function investedMoney() {
    if (investedInput.current.value === "" || investedInput.current.value === 0)
      return;
    setLoans(
      loans.map((e) =>
        e.id === active.element.id
          ? {
              ...active.element,
              available: Number(
                active.element.available.replace(",", "") -
                  investedInput.current.value
              ).toString(),
              amount: Number(
                active.element.amount.replace(",", "") -
                  investedInput.current.value
              ).toString(),
            }
          : e
      )
    );
    let newId = successInvest.filter((e) => e === active.element.id).length;
    setActive({ state: false, element: null });
    newId > 0
      ? setSuccessInvest([...successInvest])
      : setSuccessInvest([...successInvest, active.element.id]);
    investedInput.current.value = "";
  }
  function Convert(value) {
    let hour = value % 60;
    let days = hour % 24;
    let month = days % 30;
    return `${month} month ${days} days`;
  }
  return (
    <section
      className={active.state ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <section
        className={active.state ? "modal-content active" : "modal-content"}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          onClick={() => setActive(false)}
          className="close"
          src={close}
          alt="x"
        />

        <h1 className="investment-title">Invest in Loan </h1>
        <h2 className="investment-name">{active.element?.title}</h2>
        <h3 className="investment-available">
          Amount available: ${active.element?.available}
        </h3>
        <h3 className="investment-timer">
          Loan ends in: {Convert(Number(active.element?.term_remaining))}
        </h3>
        <h1 className="investment-title">Investment amount</h1>
        <section className="investment-amount">
          <input
            className="investment-input"
            placeholder="1000"
            ref={investedInput}
          />
          <button onClick={() => investedMoney()} className="invest-button">
            Invest
          </button>
        </section>
      </section>
    </section>
  );
}

export default Modal;
