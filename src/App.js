import { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import data from "./current-loans.json";
import "./App.scss";

function App() {
  const [successInvest, setSuccessInvest] = useState([]);
  const [modalActive, setModalActive] = useState({
    state: false,
    element: null,
  });
  const [loans, setLoans] = useState(data.loans);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    setTotalAmount(
      loans
        .map((e) => e.amount.replace(",", ""))
        .reduce((e, counter) => Number(e) + Number(counter))
    );
  }, [loans]);
  console.log(successInvest);
  return (
    <div className="App">
      <main>
        <header className="header">
          <section className="title">Currant Loans</section>
        </header>
        {loans.map((e) => (
          <section className="loan-item" key={e.id}>
            <span>
              <h1 className="loan-name">{e.title}</h1>
              <h3 className="loan-details">
                Tranche: {e.tranche} &nbsp; Available: {e.available}
              </h3>
            </span>
            <section className="button-item">
              <span
                className={
                  successInvest.filter((element) => element === e.id).length > 0
                    ? "invest-success active"
                    : "invest-success"
                }
              >
                Invested
              </span>
              <button
                onClick={() => setModalActive({ state: true, element: e })}
                className="invest-button"
              >
                Invest
              </button>
            </section>
          </section>
        ))}
        <section className="total-4-investment">
          Total amount available for investment:
          <span className="amount-available">
            ${totalAmount.toLocaleString()}
          </span>
        </section>
      </main>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        setLoans={setLoans}
        loans={loans}
        setSuccessInvest={setSuccessInvest}
        successInvest={successInvest}
      />
    </div>
  );
}

export default App;
