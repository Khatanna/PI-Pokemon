import React, { Fragment } from "react";
//import styles from "../styles/Pokemon.module.css";
import { useParams } from "react-router-dom";

export default function Pokemon() {
  const { id } = useParams();

  return <Fragment>id: {id}</Fragment>;
}
