require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

const kakaoClientId = process.env.KAKAO_CLIENT_ID
const redirectURI = process.env.REDIRECT_URI

const naverClientId = process.env.NAVER_CLIENT_ID
const naverClientSecret = process.env.NAVER_CLIENT_SECRET

app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ["OPTIONS", "POST"]
}))

app.use(express.json())

// 카카오
app.post('/kakao/login', async (req, res) => {
    const authorizationcode = req.body.authorizationcode

    try {
        const tokenRes = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            null,
            {
                params: {
                    grant_type: 'authorization_code',
                    client_id: kakaoClientId,
                    redirect_uri: redirectURI,
                    code: authorizationcode
                }
            }
        )

        const accessToken = tokenRes.data.access_token

        const userRes = await axios.get(
            'https://kapi.kakao.com/v2/user/me',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )

        res.json({ user: userRes.data })

    } catch (err) {
        console.error(err.response?.data)
        res.status(500).json(err.response?.data)
    }
})

// 네이버
app.post('/naver/login', async (req, res) => {
    const { code, state } = req.body

    try {
        const tokenRes = await axios.post(
            'https://nid.naver.com/oauth2.0/token',
            null,
            {
                params: {
                    grant_type: 'authorization_code',
                    client_id: naverClientId,
                    client_secret: naverClientSecret,
                    code,
                    state
                }
            }
        )

        const accessToken = tokenRes.data.access_token

        const userRes = await axios.get(
            'https://openapi.naver.com/v1/nid/me',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )

        res.json({ user: userRes.data.response })

    } catch (err) {
        console.error(err.response?.data)
        res.status(500).json(err.response?.data)
    }
})

app.listen(3000, () => console.log('서버 열림!'))