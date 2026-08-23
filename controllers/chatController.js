// Import services for PDF parsing, embedding, and Gemini-based Q&A
const pdfService = require("../services/pdfService");
const embeddingService = require("../services/embeddingService");
const geminiService = require("../services/geminiService");

// This will hold the in-memory vector store for the uploaded PDF
let memoryVectorStore = null;

/**
 * Handle PDF upload, parse it into chunks, and create an embedding-based vector store
 * @route POST /upload
 */
exports.uploadPDF = async (req, res) => {
  try {
    const pdfPath = req.file.path; // Path to the uploaded PDF file

    // Parse the PDF and split its content into smaller chunks
    const textChunks = await pdfService.parseAndChunk(pdfPath);

    // Create an in-memory vector store from the text chunks
    memoryVectorStore = await embeddingService.createStore(textChunks);
    res.json({ message: "PDF processed and indexed." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Handle a user's question by retrieving context from the vector store
 * and using the Gemini model to generate an answer
 * @route POST /ask
 */
exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    // If no PDF has been uploaded yet, return an error
    if (!memoryVectorStore) {
      return res.status(400).json({ error: "No PDF uploaded yet." });
    }

    // Perform a similarity search to find relevant content from the PDF
    const context = await embeddingService.queryStore(
      memoryVectorStore,
      question
    );

    // Ask the Gemini model using the retrieved context and the question
    const answer = await geminiService.askGemini(context, question);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
