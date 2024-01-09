import axios from "axios";
import { FormEvent, useState, useEffect } from "react";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setResponseText("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        username: username,
        password: password
      });

      setResponseText(response.data.message); //
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResponseText(error.message);
      } else {
        setResponseText(String(error));
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="UserName"> User-Name:</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={e => setUsername(e.target.value)}
        />
        <label htmlFor="PassWord"> Pass-Word:</label>
        <input
          type="text"
          id="password"
          autoComplete="off"
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Send Request</button>
      </form>

      {responseText && <p>Response: {responseText}</p>}
    </>
  );
}

export default LogIn;
