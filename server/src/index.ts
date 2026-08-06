import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Diet API is running!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});