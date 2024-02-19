import api2 from "./Api2";

const getCurrenShift = async()=>{
    return api2.get(`/shift/current-user`);
}
const getAllShift = async()=>{
    return api2.get(`/shift/all`);
}
const addNewShift = async(values)=>{
    const response = await api2.post(`/shift/add`, values)
    return response.data
}
const deleteById = async (id) => {
    return await api2.delete(`/shift/deleteById?id=${id}`);
  };
  const updateById = async (id,data) =>{
    return await api2.put(`/shift/updateById?id=${id}`,data)
  }
 const ShiftService = {getAllShift,getCurrenShift,addNewShift,deleteById,updateById};
 export default ShiftService