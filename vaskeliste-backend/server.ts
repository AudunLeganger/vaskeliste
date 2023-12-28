import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());

app.get("/test", (req: Request, res: Response) => {
    res.send("Hello from the backend!");
});

app.post("/test", (req: Request, res: Response) => {
    console.log(req.body.bookings);
    res.send("Hello from the backend!");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})