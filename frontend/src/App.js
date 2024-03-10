import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { FaArrowAltCircleUp } from "react-icons/fa";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [responses, setResponses] = useState([]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(message);
    try {
      const response = await axios.post(`createresponse`, { message });
      console.log(response.data);
      // Push message to messages array and response to responses array
      setMessages([...messages, message]);
      setResponses([...responses, response.data]);
      // Optionally reset message or give user feedback
      setMessage("");
    } catch (error) {
      console.error("Error posting message", error);
      // Handle error
    }
  };

  const inputHeight = message.length > 50 ? "15vh" : "50px";
  const [contentHeight, setContentHeight] = useState("calc(100vh - 120px)"); // Example initial calculation

  useEffect(() => {
    // Dynamically adjust the height based on header and footer sizes
    const headerHeight = 60; // Adjust as per your header's height
    const footerHeight = 80; // Adjust as per your footer's height
    setContentHeight(`calc(100vh - ${headerHeight + footerHeight}px)`);
  }, []);

  
  return (
    <div className="App">
      <h1>RK Assistant</h1>
      <div
      className="scrollable-content"
        style={{
          width: "80%",
          overflowY: "auto", // Makes the container scrollable
          marginBottom:"6rem",
          height: contentHeight, // Dynamically calculated height

        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <div style={{ margin: "10px 0" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  marginBottom: "1.6rem",
                }}
              >
                <img
                  src="https://www.logolynx.com/images/logolynx/4b/4beebce89d681837ba2f4105ce43afac.png"
                  alt="user"
                  style={{ height: "30px", width: "30px", alignSelf: "start" }}
                />
                <p style={{ maxWidth: "80%", textAlign: "left" }}>{msg}</p>
              </div>
              {responses.length > index && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    marginTop: "5px",
                  }}
                >
                  <img
                    src="https://freelogopng.com/images/all_img/1681039084chatgpt-icon.png"
                    alt="bot"
                    style={{
                      height: "30px",
                      width: "30px",
                      alignSelf: "start",
                    }}
                  />
                  <p style={{ maxWidth: "80%", textAlign: "left" }}>
                    {responses[index]}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <footer
        style={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          padding: "20px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="textarea-container"
          style={{ position: "relative", width: "80%" }}
        >
          <textarea
            value={message}
            onChange={handleInputChange}
            style={{
              width: "100%",
              height: inputHeight,
              resize: "none",
              marginBottom: "10px",
              borderRadius: "10px",
              border: "2px solid black",
              padding: "10px 50px 10px 10px",
              height: "60px", // Set a fixed height for your footer
              marginTop: "3rem", // This won't affect since the footer is fixed; adjust space in content area instead
            }}
          />
          <button
            onClick={handleSubmit}
            className="btn btn-light"
            style={{ position: "absolute", right: "10px", bottom: "20px" }}
          >
            <FaArrowAltCircleUp />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
