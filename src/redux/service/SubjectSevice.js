import api2 from "./Api2";

const getAllSubject = async()=>{
    return api2.get(`/subject/all`);
}
const AddSubect = async(data)=>{
    return await api2.post(`/subject/add`,data)
}
const getAllCurrentSubject = async()=>{
    return api2.get(`/subject/current-user`);
}
const deleteById = async(id)=>{
    return await api2.delete(`/subject/deleteById?id=${id}`)
}
const updateById = async(id, data)=>{
    return  await api2.put(`/subject/updateById?id=${id}`, data)
}
 const SubjectService = {getAllSubject,getAllCurrentSubject,AddSubect,deleteById, updateById};
 export default SubjectService