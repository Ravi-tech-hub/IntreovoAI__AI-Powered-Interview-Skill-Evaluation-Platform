const pdfparse = require("pdf-parse");

const extractTextFromPdf = async (fileBuffer) => {
  if (typeof pdfparse === "function") {
    const data = await pdfparse(fileBuffer);
    return data.text;
  }

  if (pdfparse.PDFParse) {
    const parser = new pdfparse.PDFParse({ data: fileBuffer });
    const data = await parser.getText();
    if (typeof parser.destroy === "function") {
      await parser.destroy();
    }
    return data.text;
  }

  throw new Error("Unsupported pdf-parse version");
};

module.exports = extractTextFromPdf;
