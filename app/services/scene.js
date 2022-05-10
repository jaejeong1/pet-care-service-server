import db from '../modles/index.js'
import getDatabase from '../lambdas/getDatabase.js'

export default function SceneService() {

    const Scene = db.Scene
    const dbo = getDatabase()
    const dbConnect = dbo.getDb()

    return {
        add(req, res) {
            new Scene(req.body).save(function (err) {
                if (err) {
                    res
                        .status(500)
                        .send({message: err});
                    console.log('씬 추가 실패')
                    return;
                } else {
                    res
                        .status(200)
                        .json({ok: 'ok'})
                }
            })
        },
        delete(req, res) {
            
        },
        update(req, res) {
            Scene.findOneandUpdate({
                index: req.body.index
            }, function (err, user) {
                if (err)
                    throw err
                if (!user) {
                    res
                        .status(401)
                        .send({success: false, message: '해당 INDEX가 존재하지 않습니다'})
                } else {
                    
                }
            })
        }
    }
}