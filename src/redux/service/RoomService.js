
import Api from "./Api";
import api2 from "./Api2";

const getAllRoom = async () => {
    return api2.get(`/room/all`)
}
const addNewShift = async (values) => {
    const response = await api2.post("/room/add", values)
    console.log("/room/add", values)
    console.log("API Response:", response.data);
    return response.data
}
const deleteById = async (id) => {
    return await api2.delete(`/room/deleteById?id=${id}`);
}
const RoomService = { getAllRoom, addNewShift, deleteById }
export default RoomService;