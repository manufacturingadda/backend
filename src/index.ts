import express from "express";
import cors from "cors";
import connects from "./utils/DB";

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({ extended: false, limit: 10000, parameterLimit: 6 })
);

const PORT = process.env.PORT || 8000;

connects();

import UserRoutes from "./routes/User";
app.use("/user", UserRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
