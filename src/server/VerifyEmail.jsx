import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    if (token) {
      fetch(`/api/confirm-email?token=${token}`)
        .then((res) => res.json())
        .then((data) => setMessage(data.message))
        .catch(() => setMessage("Invalid or expired token"));
    }
  }, [token]);

  return <div>{message}</div>;
};
