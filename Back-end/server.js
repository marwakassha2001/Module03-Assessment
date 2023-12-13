import sequelize from "./config/db.js";
import express from "express";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, 
  optionsSuccessStatus: 200, 
};


app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((error) => {
    console.error("Failed to synchronize database: ", error);
  });



const port = process.env.PORT || 4003;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
