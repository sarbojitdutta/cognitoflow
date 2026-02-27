import axios from 'axios'

export const getOAuthToken = async (code) => {
    const params = {
        client_id: Process.env.GITHUB_CLIENT_ID,
        client_secret: Process.env.GITHUB_CLIENT_SECRET,
        code: code
    }

    const response = await axios.post('https://github.com/login/oauth/access_token',
        params,
        { headers: { 'Accept': 'application/json' } }
    )

    if (response.data.error) {
        throw new Error(response.data.error)
    }
    return response.data.access_token
}

export const getGithubProfile = async (accessToken) => {
    const { data } = await axios.get('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    return {
        id: data.id.toString(),
        githubUsername: data.login,
        email: data.email
    }
}