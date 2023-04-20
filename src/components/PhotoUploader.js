import { AiOutlineCloudUpload } from "react-icons/ai";
import {BiTrash} from 'react-icons/bi';
import {useEffect, useState} from 'react';
import axios from 'axios';
const PhotoUploader = ({savedPhotos, setSavedPhotos , changing}) => {

const [currentPhotos, setCurrentPhotos] = useState([]);

const jwt = sessionStorage.getItem('jwt');



const uploadPhotos = (e) => {
    const files = e.target.files;
    let data = new FormData();
    
    for (const file in files){
        data.append('propertyPhotos' , files[file])
    }

    axios.post('http://localhost:3001/api/properties/upload' , data , {
        headers : {
            'Authorization' : `Bearer ${jwt}`
        }
    }).then(res => {
        console.log(res.data.message);
        console.log(res.data.filePaths)
        setCurrentPhotos([...currentPhotos , ...res.data.filePaths]);
        setSavedPhotos([...currentPhotos , ...res.data.filePaths]);
    }).catch(err => {
        console.log(err.message);
    })

}

const deletePhoto = (e , fileName) => {
    e.preventDefault();
    setSavedPhotos(savedPhotos.filter(photo => photo !== fileName));

};

useEffect(() => {
    if(changing){
        setCurrentPhotos([]);
    }
},
 []);


    return (  
        <div className="flex align-top gap-x-20"> 
                <div className=" mt-5">
                <label className="px-5 py-5 cursor-pointer hover:bg-violet-700 flex items-center gap-1 justify-center border bg-violet-500 rounded-2xl test-2xl">
                    <AiOutlineCloudUpload className="text-2xl flex items-center text-white"/>
                <input type= "file"  className="hidden" multiple onChange={ (e) => uploadPhotos(e)}/>
            <div className="text-white">Upload</div>
            </label>

            </div>
            
            <div className=" mt-5 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6"> 
                {savedPhotos.length > 0 && savedPhotos.map((photo , index) => {
                    return (
                        <div className="px-5 h-32 flex relative" key={index}> 
                            <a href = {photo}>
                            <div className="flex relative">
                            <img  className= "w-full rounded-md cursor-pointer" alt= "Place" src={photo}/> 
                            <button onClick={(e) => {deletePhoto(e , photo)}} className="absolute right-2  top-3 bg-opacity-50 cursor-pointer" key={index+1}>
                            <BiTrash className="text-violet-500 bg-opacity-50"></BiTrash>
                            </button>
                            </div>
                            
                            
                            </a>
                            
                         </div>
                    )
                })}
            </div>
        </div>
    );
}
 
export default PhotoUploader;