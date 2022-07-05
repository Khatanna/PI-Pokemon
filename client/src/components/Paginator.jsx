import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage, getCount } from "../redux/actions";
import styles from "../styles/Paginator.module.css";

export default function Paginator() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const { page, count } = useSelector((state) => state);
  const limit = Math.ceil(count / 12);

  useEffect(() => {
    if (!count) {
      dispatch(getCount());
    }
  }, [dispatch, count]);

  const handlePage = (e) => {
    const options = {
      next: () => dispatch(setPage(page + 1)),
      previous: () => dispatch(setPage(page - 1)),
    };
    options[e.target.id]();
  };

  const goToPage = () => {
    if (+input === page) {
      setInput("");
      return;
    }
    dispatch(setPage(+input));
  };

  const handleChange = ({ target: { value } }) => {
    if (value < 1 || value > limit) {
      setInput("");
      return;
    }
    setInput(value);
  };

  return (
    <Fragment>
      <div className={styles.pagination}>
        {page > 1 ? (
          <button onClick={handlePage} id="previous">
            Previous
          </button>
        ) : (
          <button disabled>Previous</button>
        )}
        <b>{page}</b>
        {page < limit ? (
          <button onClick={handlePage} id="next">
            Next
          </button>
        ) : (
          <button disabled>Next</button>
        )}
        <input type="number" value={input} onChange={handleChange} />
        {input !== "" ? (
          <button onClick={goToPage}>Go</button>
        ) : (
          <button disabled>Go</button>
        )}
      </div>
    </Fragment>
  );
}
