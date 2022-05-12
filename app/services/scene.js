import db from '../models/index.js'
import getDatabase from '../lambdas/getDatabase.js'
import getToken from '../lambdas/getToken.js'
import request from 'request'

export default function SceneService() {

    const Scene = db.Scene
    const dbo = getDatabase()
    const dbConnect = dbo.getDb()
    const appId = "aistudios.com"
    const clientHostName = "aistudios.com"
    const baseUrl = "https://dev.aistudios.com/api/odin"
    const token = getToken().token()

    return {
        getToken() {
            console.log(token)
        },
        add(req, res) {
            // console.log(token)
            // 1. Scene 추가
            request.post(baseUrl + "/editor/scene/key", {form:{screenIdx:req.body.index, scene:req.body.context}}, function(err, httpResponse, body) {
                res
                    .status(500)
                    .send({message: err});
                console.log('씬 추가 실패')
                return;
            })
            // 2. 데이터 DB 저장
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
            // 1. Scene 삭제
            request.delete(baseUrl + "/editor/scene/key", {form:{screenIdx:req.params.index}}, function(err, httpResponse, body) {
                res
                    .status(500)
                    .send({message: err});
                console.log('씬 추가 실패')
                return;
            })
        },
        update(req, res) {
            // 1. Scene 변경
            request.put(baseUrl + "/editor/scene/key", {form:{screenIdx:req.body.index, scene:req.body.context}}, function(err, httpResponse, body) {
                res
                    .status(500)
                    .send({message: err});
                console.log('씬 추가 실패')
                return;
            })

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