require('dotenv') .config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

const kakaoClientId = process.env.KAKAO_CLIENT_ID
const redirectURI = process.env.REDIRECT_URI

app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ["OPTIONS", "POST", "DELETE"],
}))

app.use(express.json())

app.post('/kakao/login', async (req, res) => {
    const authorizationcode = req.body.authorizationcode;

    try {
        // 1️⃣ 토큰 요청
        const tokenResponse = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            null,
            {
                params: {
                    grant_type: 'authorization_code',
                    client_id: kakaoClientId,
                    redirect_uri: redirectURI,
                    code: authorizationcode
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }
        )

        const accessToken = tokenResponse.data.access_token

        // 2️⃣ 사용자 정보 요청
        const userResponse = await axios.get(
            'https://kapi.kakao.com/v2/user/me',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )

        // 3️⃣ 프론트로 전달
        res.json({
            token: tokenResponse.data,
            user: userResponse.data
        })

    } catch (err) {
        console.error(err.response?.data)
        res.status(500).json(err.response?.data)
    }
})

app.listen(3000, () => console.log('서버 열림!'))