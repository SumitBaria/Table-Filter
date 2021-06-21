const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoute = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(cors());

// Urls
const url =
  "mongodb+srv://root:SumitBaria@1234@cluster0.tjtvq.mongodb.net/filter-table?retryWrites=true&w=majority";
// const url = "mongodb://localhost/tablefilter";
const port = 3001;

// Mongo DatabaseConnection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("Databse is Connected");
});

// Routes
app.use("/table", productRoute);

// Listening to server
app.listen(port, () => {
  console.log(`Server is Up on ${port}`);
});
