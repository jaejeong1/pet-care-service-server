import request from 'request'

const getToken = () => {
    const appId = "aistudios.com"
    const clientHostName = "aistudios.com"
    const platform = "web"
    const uuid = "6443234b-77d5-4013-bfd6-bb9399f317d9"
    const getCliTokenUrl = "https://dev.aistudios.com/api/odin/generateClientToken?appId=aistudios.com&userKey=6443234b-77d5-4013-bfd6-bb9399f317d9"
    const getTokenUrl = "https://dev.aistudios.com/api/odin/generateToken"


    return {
        token() { 
            let token = ""
            request.get(getCliTokenUrl, function(err, httpResponse, body) {
                if (err) {
                    console.log("클라이언트 토큰 생성 실패")
                    return
                }
                let cliToken = JSON.parse(body).token
                request.post(getTokenUrl, {form:{appId:appId, platform:platform, isClientToken:true, token:cliToken, uuid:uuid, sdk_v:"1.0", clientHostName:clientHostName}},
                    function(err, httpResponse, body) {
                        if (err) {
                            console.log('토큰 생성 실패')
                            return
                        }
                        // console.log(err)
                        // console.log(body)
                        token = JSON.parse(body).token
                    }
                )
            })
            return token
        }
    }
}
export default getToken