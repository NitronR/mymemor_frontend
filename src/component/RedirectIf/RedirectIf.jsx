import React from "react";
import { Redirect } from "react-router-dom";

export default function RedirectIf(props) {
  if (props.condition)
    return <Redirect to={props.to} condition={props.condition} />;
  return "";
}
