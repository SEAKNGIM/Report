import Api from "./Api";


const postLogin = async(formData)=>{
    return await Api.post(`/auth/signin`,formData)
}
const postSignUp = async(formData)=>{
    return await Api.post(`/auth/signup`,formData)
}
const AuthServices = {postLogin,postSignUp}
export default AuthServices;