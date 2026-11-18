export const getTokenServer = async ()=>{
    const {token} = await auth.api.getToken({
        headers: await headers()
    })


    return token || null
}