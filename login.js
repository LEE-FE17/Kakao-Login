// 1. 요소
const kakaoLoginButton = document.querySelector('#kakao')
const naverLoginButton = document.querySelector('#naver')
const userImage = document.querySelector('img')
const userName = document.querySelector('#user_name')
const logoutButton = document.querySelector('#logout_button')

// 2. 카카오
const kakaoClientId = "f313cc887f6fc3a0b2936dbd22818abf"
const redirectURI = "http://127.0.0.1:5500"

// 3. 네이버
const naverClientId = "KRQC1pRvEvVNQrLGCofh"
const state = Math.random().toString(36).substring(2)

// 카카오 로그인
kakaoLoginButton.onclick = () => {
    location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectURI}&response_type=code`
}

// 네이버 로그인
naverLoginButton.onclick = () => {
    location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${redirectURI}&state=${state}`
}

// 유저 렌더링
function renderUser(user) {
    userName.textContent = user.nickname || user.kakao_account?.profile?.nickname
    userImage.src = user.profile_image || user.kakao_account?.profile?.profile_image_url

    kakaoLoginButton.style.display = 'none'
    naverLoginButton.style.display = 'none'
    logoutButton.style.display = 'block'
}

// 페이지 로드
window.onload = () => {
    const url = new URL(location.href)
    const code = url.searchParams.get('code')
    const stateValue = url.searchParams.get('state')

    const savedUser = localStorage.getItem('user')
    if (savedUser) {
        renderUser(JSON.parse(savedUser))
    }

    if (code) {
        if (stateValue) {
            // 네이버
            axios.post('http://localhost:3000/naver/login', { code, state: stateValue })
            .then(res => {
                const user = res.data.user
                localStorage.setItem('user', JSON.stringify(user))
                renderUser(user)
            })
        } else {
            // 카카오
            axios.post('http://localhost:3000/kakao/login', { authorizationcode: code })
            .then(res => {
                const user = res.data.user
                localStorage.setItem('user', JSON.stringify(user))
                renderUser(user)
            })
        }

        window.history.replaceState({}, document.title, "/")
    }
}

// 로그아웃
logoutButton.onclick = () => {
    localStorage.removeItem('user')

    userName.textContent = ''
    userImage.src = ''

    kakaoLoginButton.style.display = 'block'
    naverLoginButton.style.display = 'block'
    logoutButton.style.display = 'none'
}