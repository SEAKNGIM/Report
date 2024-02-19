import api2 from "./Api2";

const getAllUser = async()=>{
    return api2.get(`/user/all`);
}
// const getUserById = async()=>{
//     return await api2.get(``)
// }
const addShifToUser= async(data)=>{
    const response = await api2.post(`/user-shift/add`, data)
    return response.data
}
const addSubjectToUser = async(data)=>{
    return await api2.post(`/user-subject/add`, data)
}
const deleteShift = async (id) => {
    try {
        const response = await api2.delete(`/shifts?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting shift:', error);
        throw error; // Propagate the error to the calling code
    }
};
const deleteSubject = async (id) => {
    try {
        const response = await api2.delete(`/subject?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting shift:', error);
        throw error; // Propagate the error to the calling code
    }
};
 const UserService = {getAllUser,addShifToUser,addSubjectToUser,deleteShift,deleteSubject};
 export default UserService