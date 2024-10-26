import React from "react";
import "./ErrorHandler.css";

const ErrorHandler = ({ error, refetchAsyncData }) => {
  return (
    <div className="error error-wrapper">
      <div className="error-text">{error}</div>
      <button
        className="btn btn-outline-primary"
        onClick={() => refetchAsyncData()}
      >
        Обновить
      </button>
    </div>
  );
};

export default ErrorHandler;
