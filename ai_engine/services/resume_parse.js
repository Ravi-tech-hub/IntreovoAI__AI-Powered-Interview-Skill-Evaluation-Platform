const pdfparse = require("pdf-parse");
const extractTextFromPdf = async (fileBuffer) => {
  const data = await pdfparse(fileBuffer);
  return data.text;
};
module.exports = extractTextFromPdf;
