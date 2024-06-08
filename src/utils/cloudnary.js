import cloudnary from 'cloudinary'
import fs from "fs";
const uploadCloudnary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null
        //upload file on cloudnary
        const response = await cloudnary.uploader.upload(localFilePath,{resource_type : "auto"})
        //file has been uploaded successfully
        console.log("File is uploaded on cloudnary", response.url);
        return response; 
    }
    catch(error){
        fs.unlinkSync(localFilePath)  
        return null;
    }
}
export default uploadCloudnary