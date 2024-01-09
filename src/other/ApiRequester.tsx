import axios from "axios";
import { FormEvent, useState } from "react";

function ApiRequester() {
  const [animal, setAnimal] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setResponseText("");

    try {
      const response = await axios.get("http://127.0.0.1:5000/animals", {
        params: {
          animal: animal,
        },
      });
      setResponseText(JSON.stringify(response.data));
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
        <label htmlFor="animal">Animal:</label>
        <input
          type="text"
          id="animal"
          autoComplete="off"
          onChange={(e) => setAnimal(e.target.value)}
        />
        <button type="submit">Send Request</button>
      </form>
      {responseText && <p>Response: {responseText}</p>}
    </>
  );
}

export default ApiRequester;

/*const handleClick = async () => {
    setResponseText("");
    try {
      const response = await axios.get("http://127.0.0.1:5000/names");
      setResponseText(JSON.stringify(response.data));
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
      
        
        <button type="button" onClick={handleClick}>
          Send Request
        </button>
        {responseText && <p>Response: {responseText}</p>}
      
    </>
  );*/
