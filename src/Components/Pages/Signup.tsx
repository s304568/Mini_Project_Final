import axios from "axios";
import { FormEvent, useState } from "react";
import "./Pages.css";

function SignUp() {
  const [newUsername, setNewUsername] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [finalPassword, setFinalPassword] = useState("");
  const [responseText, setResponseText] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setResponseText("");
    setValidationError("");

    if (!newUsername || !passwordOne || !finalPassword) {
      setValidationError("Please fill in all fields.");
    } else if (newUsername.length < 5 || newUsername.length > 16) {
      setValidationError(
        "Username must be between 5 and 16 characters long and contain only alphanumeric characters."
      );
    } else if (passwordOne !== finalPassword) {
      setValidationError("Passwords do not match.");
    } else {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,16}$/;

      if (!passwordRegex.test(passwordOne)) {
        setValidationError(
          "Password must be between 5 and 16 characters, contain only alphanumeric characters, and include at least one number and one letter."
        );
      } else {
        setFinalPassword(passwordOne);
        setFinalPassword(finalPassword);

        try {
          const response = await axios.post("http://127.0.0.1:5000/signup", {
            username: newUsername,
            password: finalPassword,
          });

          setResponseText(response.data.message);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setResponseText(error.message);
          } else {
            setResponseText(String(error));
          }
        }
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setNewUsername(e.target.value)}
        />

        <label htmlFor="passwordOne">Password:</label>
        <input
          type="password"
          id="passwordOne"
          autoComplete="off"
          onChange={(e) => setPasswordOne(e.target.value)}
        />

        <label htmlFor="finalPassword">Confirm Password:</label>
        <input
          type="password"
          id="finalPassword"
          autoComplete="off"
          onChange={(e) => setFinalPassword(e.target.value)}
        />

        <button type="submit">Send Request</button>
      </form>

      <p style={{ color: "green" }}>
        Username: Between 5 - 16 characters long & Should only contain alfabetic
        characters A-Z
      </p>

      <p style={{ color: "green" }}>
        Password: Should Between 5 - 16 characters long & contain at least one
        alfabetic characters A-Z and one number
      </p>
      {responseText && <p>Response: {responseText}</p>}
      {validationError && <p style={{ color: "red" }}>{validationError}</p>}
    </>
  );
}

export default SignUp;
