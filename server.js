const express = require("express");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const file = path.join(__dirname, "students.xlsx");

app.use(express.json());
app.use(express.static("public"));

app.post("/api/student", (req, res) => {
  const name = String(req.body.name || "").trim();
  const id = String(req.body.id || "").trim();

  if (!name || !id) {
    return res.status(400).json({ message: "Name and ID are required." });
  }

  let rows = [];
  if (fs.existsSync(file)) {
    const book = XLSX.readFile(file);
    rows = XLSX.utils.sheet_to_json(book.Sheets[book.SheetNames[0]]);
  }

  rows.push({
    "Student Name": name,
    "Student ID": id,
    "Date": new Date().toLocaleString()
  });

  const sheet = XLSX.utils.json_to_sheet(rows);
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, sheet, "Students");
  XLSX.writeFile(book, file);

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Quiz system running on http://localhost:${PORT}`);
});
