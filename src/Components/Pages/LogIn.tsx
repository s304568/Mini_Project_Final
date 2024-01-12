import axios from "axios";
import "./Pages.css";
import { FormEvent, useState, useEffect } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";
import VisibilityOffSharpIcon from "@mui/icons-material/VisibilityOffSharp";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseText, setResponseText] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setResponseText("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        username: username,
        password: password,
      });

      setResponseText(response.data.message); //
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResponseText(error.message);
      } else {
        setResponseText(String(error));
      }
    }

    const EndAdornment = ({ visible, setVisible }) => {
      return (
        <>
          <InputAdornment position="end">
            <IconButton>
              <RemoveRedEyeSharpIcon />
            </IconButton>
          </InputAdornment>
        </>
      );
    };

    return (
      <>
        <form onSubmit={handleSubmit}>
          <TextField
            label="username"
            variant="outlined"
            type="text"
            required
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="password"
            type="password"
            id="password"
            variant="outlined"
            required
            fullWidth
            autoComplete="off"
            inputProps={{
              endAdornment: <EndAdornment />,
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Send Request</button>
        </form>

        {responseText && <p>Response: {responseText}</p>}
      </>
    );
  };
}

export default LogIn;
