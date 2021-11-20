const addToken = async (request, body) =>{
    let response = await request(body.email, body.password);
    if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
    }
}

export default addToken;