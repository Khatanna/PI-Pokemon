import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNextPage, setPreviousPage } from "../redux/actions";
import styles from "../styles/Paginator.module.css";

export default function Paginator() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const page = useSelector((state) => state.page);

  const handlePage = (e) => {
    if (e.target.id === "next") {
      dispatch(setNextPage(page + 1));
    } else {
      dispatch(setPreviousPage(page - 1));
    }
  };
  const goPage = () => {
    if (input === "") {
      dispatch(setNextPage(page + 1));
    } else if (+input > Math.ceil(1126 / 40)) {
      alert("Page does not exist");
    } else {
      dispatch(setNextPage(+input));
      setInput("");
    }
  };

  return (
    <Fragment>
      <div>
        <div className={styles.pagination}>
          {page > 1 ? (
            <button onClick={handlePage}>Previous</button>
          ) : (
            <button disabled>Previous</button>
          )}
          <b>{page}</b>
          <button onClick={handlePage} id={"next"}>
            Next
          </button>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={goPage}>Ir</button>
        </div>
      </div>
    </Fragment>
  );
}
