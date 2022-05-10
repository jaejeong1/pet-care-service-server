import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import SceneService from '../services/scene.js'
dotenv.config()
const corsOptions = {
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
}
const app = express()
app.use(cors());
app.use(function (_req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
app.post('/', cors(corsOptions), (req, res) => {
    SceneService.add(req, res)
    res.json({message: 'ok'})
})
app.delete('/', cors(corsOptions), (req, res) => {
    SceneService.delete(req, res)
    res.json({message: 'ok'})
})
app.put('/', cors(corsOptions), (req, res) => {
    SceneService.update(req, res)
    res.json({message: 'ok'})
})
export default app