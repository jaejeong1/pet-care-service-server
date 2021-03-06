export default function SceneModel(mongoose) {
    const sceneSchema = mongoose.Schema({
        index: {type: Number, unique: 1},
        content: String
    })
    return mongoose.model('Scene', sceneSchema)
}