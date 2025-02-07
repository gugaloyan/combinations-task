import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateRoute from "./routes/generate";
import {getResponses} from "./services/dbService";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// app.get("/", async (req, res) => {
//     const responses = await getResponses();
//     res.json(responses);
// });

app.use('/api', generateRoute);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
