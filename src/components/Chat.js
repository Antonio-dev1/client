import { useEffect, useState , useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import{BsFillChatFill} from "react-icons/bs";
import ChatAvatar from "./ChatAvatar";
import { io } from "socket.io-client";
import jwtDecode from "jwt-decode";
const Chat = () => {
const [selectedUserId , setSelectedUserId] = useState("user"); // the user that the current user has selected to chat with
const [chatUsers , setChatUsers] = useState(["user"]);    // array of users that the current user has a conversation with
const socket = useRef(io("ws://localhost:3010"))// the socket connection between the client and the server
const jwt = sessionStorage.getItem("jwt"); // the jwt token of the current user


const functionSelectContact = (userId) => {
    setSelectedUserId(userId);
}

useEffect(() => {
    socket.current.emit("addUser" , jwtDecode(jwt).id)
} , []);

        
    return (
        <div> 
            <div className = "flex h-screen">
                <div className="bg-violet-100 w-1/3 pl-4 pt-4">
                    <div className="text-violet-500 font-bold text-2xl flex gap-x-2 mb-4">  
                        HouseTech
                        <BsFillChatFill/>
                    </div> 
                    {chatUsers.map(user => (
                        <div  onClick={() => { functionSelectContact(user._id)}} className="flex gap-x-2 p-2 border-b border-gray-100 py-2 gap-2 items-center cursor-pointer">
                            <ChatAvatar/> 
                            <span className=" text-blue-700"> userName </span>
                        </div>
                    ))}
                </div>
                <div className="bg-violet-400 w-2/3 mx-2 p-2 flex flex-col">
                    <div className="flex-grow">Messages with selected person</div>
                    <div className="flex gap-x-2">
                        <input type="text " placeholder="Type a message" className="bg-white border p-2 flex-grow rounded-sm"/>
                        <button className="bg-violet-500 p-2 text-white rounded-sm "> <AiOutlineSend/> </button>
                    </div>
                </div>
            </div>
        </div>
      );
}
 
export default Chat;