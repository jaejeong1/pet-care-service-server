import dotenv from 'dotenv'
import mongoose from 'mongoose'
import UserModel from './User.js'
import SceneModel from './Scene.js'
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dotenv.MONGO_URI
db.User = new UserModel(mongoose)
db.Scene = new SceneModel(mongoose)

export default db