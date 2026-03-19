// 1. 요소 가져오기
const kakaoLoginButton = document.querySelector('#kakao')
const userImage = document.querySelector('img')
const userName = document.querySelector('#user_name')
const logoutButton = document.querySelector('#logout_button')
const kakaoClientId = 'f313cc887f6fc3a0b2936dbd22818abf'
const redirectURI = 'http://127.0.0.1:5500'

// 2. 로그인 버튼
kakaoLoginButton.onclick = () => {
    console.log("클릭됨")

    location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectURI}&response_type=code`
}

// 3. 유저 렌더링 함수
function renderUser(user) {
    userName.textContent = user.kakao_account.profile.nickname
    userImage.src = user.kakao_account.profile.profile_image_url

    kakaoLoginButton.style.display = 'none'
    logoutButton.style.display = 'block'
}

// 4. 페이지 로드시
window.onload = () => {
    const url = new URL(location.href)
    const authorizationcode = url.searchParams.get('code')

    // 🔥 로그인 유지
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
        renderUser(JSON.parse(savedUser))
    }

    // 🔥 로그인 처리
    if (authorizationcode) {
        axios.post('http://localhost:3000/kakao/login', { authorizationcode })
        .then(res => {
            const user = res.data.user

            localStorage.setItem('user', JSON.stringify(user))
            renderUser(user)

            window.history.replaceState({}, document.title, "/")
        })
    }
}

// 5. 로그아웃
logoutButton.onclick = () => {
    localStorage.removeItem('user')

    userName.textContent = ''
    userImage.src = ''

    kakaoLoginButton.style.display = 'block'
    logoutButton.style.display = 'none'
}