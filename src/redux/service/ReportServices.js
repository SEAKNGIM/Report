import { addYears } from "flowbite-react/lib/esm/components/Datepicker/helpers";
import Api from "./Api"
import api2 from "./Api2"

const getAllReport = async () => {
  try {
      const response = await api2.get("/report/all");
      return response.data;
  } catch (error) {
      // Handle errors
      console.error("Error fetching reports:", error);
      throw error;
  }
};
const getReportCurrentUser = async () => {
  try {
      const response = await api2.get("/report/by-currenUser")
      return response.data;
  } catch (error) {
      // Handle errors
      console.error("Error fetching reports:", error);
      throw error;
  }
};

const postReport = async(formData)=>{
    try {
        const response = await api2.post("/report/add", formData);
        return response.data;
      } catch (error) {
        // Handle errors
        console.error("Error posting report:", error);
        throw error;
      }
}
const deleteById = async (id)=>{
  try{
    const responense = await api2.delete(`/report/deleteById?id=${id}`);
    return responense.data;
  }catch(error){
    console.error("Error posting report:", error);
    throw error;
  }
}
const updateById = async (id, apiData)=>{
  try{
      const respones = await api2.put(`/report/updateById?id=${id}`,apiData)
      return respones.data;
  }catch(e){

  }
}
const getReportById = async (id)=>{
  const res = await api2.get(`/report/getReportById?id=${id}`);
  return res.data;
}
const ReportServices = {getAllReport,postReport,getReportCurrentUser,deleteById,updateById,getReportById}
export default ReportServices;