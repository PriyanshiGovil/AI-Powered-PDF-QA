import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [uploading, setUploading] = useState(false);
  const [asking, setAsking] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnswer("");
    setMessage("");
  };

  const uploadPDF = async () => {
    if (!file) {
      setMessage("Please select a PDF first.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await fetch("http://localhost:3000/api/chat/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setMessage("✅ PDF uploaded successfully!");
    } catch (error) {
      setMessage("❌ " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) {
      setMessage("Please enter a question.");
      return;
    }

    setAsking(true);
    setAnswer("");
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/chat/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setAnswer(data.answer);
    } catch (error) {
      setMessage("❌ " + error.message);
    } finally {
      setAsking(false);
    }
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">📄 PDF Chat Assistant</div>
        <span className="status">AI Powered</span>
      </header>

      <main className="container">
        <section className="hero">
          <h1>Chat with your PDF</h1>
          <p>
            Upload a PDF and ask questions about its content using AI.
          </p>
        </section>

        <section className="card">
          <h2>1. Upload your PDF</h2>

          <div className="upload-box">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              id="pdfInput"
            />

            <label htmlFor="pdfInput" className="file-label">
              📁 Choose PDF
            </label>

            {file && (
              <p className="file-name">
                Selected: <strong>{file.name}</strong>
              </p>
            )}
          </div>

          <button
            className="primary-btn"
            onClick={uploadPDF}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload PDF"}
          </button>
        </section>

        <section className="card">
          <h2>2. Ask a question</h2>

          <textarea
            placeholder="Example: What is this resume about?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button
            className="primary-btn"
            onClick={askQuestion}
            disabled={asking}
          >
            {asking ? "Thinking..." : "Ask AI"}
          </button>
        </section>

        {message && <div className="message">{message}</div>}

        {answer && (
          <section className="answer-card">
            <h2>🤖 AI Answer</h2>
            <p>{answer}</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;