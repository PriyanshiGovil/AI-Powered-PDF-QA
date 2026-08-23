# AI-Powered PDF Q&A

> Upload a PDF, ask questions in natural language, and get AI-generated answers based on the document's content.

AI-Powered PDF Q&A is a document question-answering application that allows users to interact with PDF documents using natural language.

Instead of manually searching through lengthy documents, users can upload a PDF and ask questions about its content. The application processes the document, retrieves the most relevant information, and uses Google Gemini to generate a contextual response.

The project implements a Retrieval-Augmented Generation (RAG) pipeline using JavaScript, Node.js, LangChain, React, and Google Gemini.

---

## ✨ Features

- 📄 Upload PDF documents
- 🔍 Extract text from PDF files
- ✂️ Split extracted text into smaller chunks
- 🧠 Generate embeddings using Gemini Embeddings
- 🔎 Perform semantic similarity search
- 🤖 Generate contextual answers using Google Gemini
- ⚛️ Interactive React-based frontend
- 🟢 Node.js and Express.js backend
- 🔌 REST APIs for PDF upload and question answering
- 🔐 Secure API key configuration using environment variables

---

## 🧠 How It Works

The application follows a Retrieval-Augmented Generation (RAG) workflow.

```text
                    PDF Document
                         │
                         ▼
                  ┌──────────────┐
                  │  PDF Parsing │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ Text Chunking│
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │  Embeddings  │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ Vector Store │
                  └──────┬───────┘
                         │
                    User Question
                         │
                         ▼
                  ┌──────────────┐
                  │  Similarity  │
                  │    Search    │
                  └──────┬───────┘
                         │
                         ▼
                  Relevant Context
                         │
                         ▼
                  ┌──────────────┐
                  │ Gemini Model │
                  └──────┬───────┘
                         │
                         ▼
                      AI Answer
```

### Workflow

1. The user uploads a PDF through the React frontend.
2. The PDF is sent to the Node.js backend.
3. `pdf-parse` extracts the text from the document.
4. The extracted text is divided into smaller chunks.
5. Gemini Embeddings convert the chunks into vector representations.
6. The vectors are stored in a LangChain `MemoryVectorStore`.
7. When the user asks a question, similarity search retrieves the most relevant chunks.
8. The retrieved context and question are sent to Google Gemini.
9. Gemini generates the final answer based on the retrieved document content.
10. The answer is displayed on the React frontend.

---

## 🛠️ Technology Stack

### Frontend

- React.js
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- Multer
- REST API

### Generative AI

- Google Gemini
- Gemini Embeddings
- LangChain.js
- Retrieval-Augmented Generation (RAG)

### Document Processing

- pdf-parse
- Custom text chunking

### Vector Retrieval

- LangChain `MemoryVectorStore`

---

## 📁 Project Structure

```text
AI-Powered-PDF-QA/
│
├── controllers/
│   └── chatController.js
│
├── routes/
│   └── chatRoutes.js
│
├── services/
│   ├── pdfService.js
│   ├── embeddingService.js
│   └── geminiService.js
│
├── utils/
│   └── chunkText.js
│
├── uploads/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

The project follows a modular architecture where frontend components, API routes, controllers, document processing, embeddings, and LLM interaction are separated into different modules.

---

## 🔌 API Endpoints

### 1. Upload PDF

```http
POST /api/chat/upload
```

#### Request

```text
Content-Type: multipart/form-data
```

Form field:

```text
pdf
```

The uploaded PDF is parsed, divided into chunks, converted into embeddings, and stored in the vector store.

---

### 2. Ask a Question

```http
POST /api/chat/ask
```

#### Request Body

```json
{
  "question": "What is the main purpose of this document?"
}
```

The application performs a similarity search to retrieve relevant document chunks and sends the retrieved context to Gemini for answer generation.

#### Example Response

```json
{
  "answer": "The document mainly discusses..."
}
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Google Gemini API key

---

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

Move into the project directory:

```bash
cd AI-Powered-PDF-QA
```

---

### 2. Install Backend Dependencies

```bash
npm install
```

---

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

Then return to the project root:

```bash
cd ..
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
```

Replace `your_gemini_api_key` with your Google Gemini API key.

### Important

Do **not** commit your `.env` file to GitHub.

Your `.gitignore` should contain:

```gitignore
node_modules/
.env
uploads/*
```

---

## ▶️ Running the Application

The frontend and backend run separately during local development.

### Start the Backend

From the project root:

```bash
node app.js
```

The backend will run on:

```text
http://localhost:3000
```

### Start the Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

Open the frontend URL in your browser.

---

## 💬 Using the Application

### Step 1 — Upload a PDF

Select a PDF document from your computer and click:

```text
Upload PDF
```

The backend processes the document and creates its vector representation.

### Step 2 — Ask a Question

Enter a question related to the uploaded document.

For example:

```text
What is this document about?
```

or:

```text
What are the main skills mentioned in this resume?
```

Click:

```text
Ask AI
```

The system retrieves relevant information from the PDF and generates an AI-powered answer.

---

## 🎯 Use Cases

The application can be used for:

- 📚 Academic notes and study material
- 📄 Resume analysis
- 📑 Research documents
- 💼 Business reports
- 📖 Technical documentation
- 📋 Policy and guideline documents
- 🔎 Information retrieval from lengthy PDFs

---

## 🧩 Key Concepts

### Retrieval-Augmented Generation (RAG)

Instead of asking the LLM to answer only from its general knowledge, the application retrieves relevant information from the uploaded document and provides that information as context to the model.

### Embeddings

Text chunks are converted into vector representations that capture their semantic meaning.

### Semantic Search

The system compares the user's question with document embeddings to retrieve the most relevant sections.

### Vector Store

The generated embeddings are stored in a LangChain `MemoryVectorStore` for similarity-based retrieval.

### LLM Integration

Google Gemini uses the retrieved document context to generate the final natural-language response.

---

## 🔒 Application Architecture

```text
React Frontend
      │
      │ REST API
      ▼
Express.js Backend
      │
      ├── PDF Upload
      │
      ├── PDF Parsing
      │
      ├── Text Chunking
      │
      ├── Gemini Embeddings
      │
      ├── MemoryVectorStore
      │
      └── Gemini LLM
              │
              ▼
          AI Response
```

---

## 🚀 Future Enhancements

- [ ] Support multiple PDF documents
- [ ] Persistent vector database
- [ ] Chat history
- [ ] Source references for answers
- [ ] Streaming AI responses
- [ ] User authentication
- [ ] Document management
- [ ] Support for additional document formats
- [ ] Improved retrieval and ranking
- [ ] Cloud deployment

---

## 📌 Project Status

**Status: Functional**

The current version supports:

- PDF upload
- PDF text extraction
- Text chunking
- Gemini embeddings
- Vector similarity search
- Context retrieval
- Gemini-based answer generation
- React frontend
- Node.js/Express backend

---

## 🎓 Learning Outcomes

This project provided practical experience with:

- Generative AI application development
- Retrieval-Augmented Generation (RAG)
- LLM API integration
- Text embeddings
- Semantic search
- Vector stores
- PDF document processing
- REST API development
- React frontend development
- Node.js backend architecture
- Environment variable management

---

## 👩‍💻 Author

**Priyanshi Govil**

A full-stack AI project built to explore practical applications of Generative AI, RAG, embeddings, semantic search, and document intelligence.

---

## 📄 License

This project is intended for educational and development purposes.