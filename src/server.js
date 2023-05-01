import express from "express";
import chalk from "chalk";
import path from "path";
import fs from "fs";
import cors from "cors";

const app = express();
const publicPath = "../public";

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

export const startServer = (url) => {
  app.post("/", (req, res) => {
    const data = JSON.stringify(req.body);
    fs.writeFileSync("logs/data.json", data);
    res.json({ url: url });
  });

  app.listen(8080, () => {
    console.log(
      `\n${chalk.cyan("[+]")}${chalk.green("Server started on port 8080")}`
    );
  });
};
