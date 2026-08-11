import express from "express";
import mealRoutes from "./routes/meals.js";

const app = express();
app.use(express.json());


//GET
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Diet API is running!");
});

app.use("/api", mealRoutes);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});