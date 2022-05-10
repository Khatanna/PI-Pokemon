import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/actions";
import styles from "../styles/Paginator.module.css";

export default function Paginator() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const page = useSelector((state) => state.page);

  const handlePage = (e) => {
    const options = {
      next: () => dispatch(setPage(page + 1)),
      previous: () => dispatch(setPage(page - 1)),
    };
    options[e.target.id]();
  };
  const goPage = () => {
    if (input === "") {
      dispatch(setPage(1));
    } else if (+input > Math.ceil(40 / 12)) {
      alert("Page does not exist");
    } else {
      dispatch(setPage(+input));
    }
    setInput("");
  };

  useEffect(() => {
    if (input < 1) {
      setInput("");
    }
    if (input > Math.ceil(40 / 12)) {
      setInput(Math.ceil(40 / 12));
    }
  }, [input]);

  return (
    <Fragment>
      <div>
        <div className={styles.pagination}>
          {page > 1 ? (
            <button onClick={handlePage} id="previous">
              Previous
            </button>
          ) : (
            <button disabled>Previous</button>
          )}
          <b>{page}</b>
          {page < Math.ceil(40 / 12) ? (
            <button onClick={handlePage} id="next">
              Next
            </button>
          ) : (
            <button disabled>Next</button>
          )}
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
