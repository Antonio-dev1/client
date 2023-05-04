import { useEffect, useState , useRef , useContext} from "react";
import { AiOutlineSend } from "react-icons/ai";
import { UserContext } from "./UserContext";
import{BsFillChatFill} from "react-icons/bs";
import ChatAvatar from "./ChatAvatar";
import { io } from "socket.io-client";
import jwtDecode from "jwt-decode";
import NavBar from "./navbar";
import axios from "axios";
import Message from "./Message";
import {ImSpinner2} from "react-icons/im";
const Chat = () => {
const [selectedUserId , setSelectedUserId] = useState(""); // the user that the current user has selected to chat with
const [chatUsers , setChatUsers] = useState([]);    // array of users that the current user has a conversation with
const socket = useRef(io("ws://localhost:3010"))// the socket connection between the client and the server
const jwt = sessionStorage.getItem("jwt"); // the jwt token of the current user
const {isLoggedIn} = useContext(UserContext); // the context of the current user
const [userMessage , setUserMessage] = useState(""); // the message that the current user is typing
const [messages , setMessages] = useState([]); // the messages between the current user and the selected user
const [arrivalMessage , setArrivalMessage] = useState(null); // the message that the current user has received from the selected user
const [conversationId , setConversationId] = useState(""); // the id of the conversation between the current user and the selected user
const [isLoadingConv, setIsLoadingConv] = useState(false); // a boolean that indicates if the conversation is loading or not

const config = {
    headers: {
        Authorization: `Bearer ${jwt}`,
    }
}
console.log(jwt)

const SelectContact = (userId) => {
    setIsLoadingConv(true);
    setSelectedUserId(userId);
    getConversationId(userId);
    setTimeout(() => {
        return setIsLoadingConv(false);
    } , 1000);
    
    
}

//Waits for the conversation Id to update and then updates the messages for a smoother transition
useEffect(() => {
    if(conversationId){
    getAllMessageChats(conversationId)
    }
} , [conversationId]);

//Get a a way to send the conversation ID and you are done

async function getAllMessageChats(conversation)  {
    try{
        const response = await axios.get("http://localhost:3001/api/messages/chat/"+conversationId ,config);
        if(response.data.length>0){
            setMessages(response.data);
        }
        else{
            console.log("no messages");
            setMessages([]);
        }
        
    }
    

    
    catch(err){
        console.log(err.message);
    }
}
async function getConversationId(userId) {
    try{

        const response = await axios.get("http://localhost:3001/api/conversations/user/"+jwtDecode(jwt).id+"/"+userId , config);

        if(response.data){
            setConversationId(response.data[0]._id);
         }
    }
    catch(err){
        console.log(err.message);
    };
}

async function getChatUsers(){
    try{
        const response = await axios.get("http://localhost:3001/api/conversations/user/"+jwtDecode(jwt).id , {
            headers : {
                Authorization:  `Bearer ${jwt}`
            } 
        });

        if(response.data.length > 0){
            console.log("hello" , response.data)
            console.log("members", response.data)
            let usersArray = [];
            for (let chat in response.data){
                
                usersArray.push(response.data[chat].members.filter(user => user._id !== jwtDecode(jwt).id)[0]);
            }
            console.log("usersArray" , usersArray)
            setChatUsers(usersArray);
        } else{
            console.log("no conversations");
        }
    }
    catch(err){
        console.log(err.message);
    }
}

useEffect(() => {
    console.log(jwtDecode(jwt).id)
    socket.current.emit("addUser" , jwtDecode(jwt).id);
    socket.current.on("getUsers" , users => {
        console.log("hello" , users)

 })
} , [isLoggedIn]);

//get all chat users
useEffect(()=> {
    socket.current = io("ws://localhost:3010");
    socket.current.on("getMessage" , data => {
        setArrivalMessage({
            senderId:data.senderId,
            text:data.text,
            createdAt:Date.now()
        })
    });

    console.log(arrivalMessage)

} , [messages])

useEffect(() => {
    getChatUsers();
    console.log("chatUser" , chatUsers)
} , [])

useEffect(() => {
    console.log("messages" , messages)
} , [messages]);


useEffect(() => {
    arrivalMessage && selectedUserId === arrivalMessage.senderId && setMessages(prev => [...prev , arrivalMessage]);
},[arrivalMessage]);

const handleUserMessageChange = (e) => {
    setUserMessage(e.target.value);
};





const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello")
    const message ={
        senderId : jwtDecode(jwt).id,
        receiverId : selectedUserId,
        text : userMessage,
        conversationId: conversationId 

    }

    socket.current.emit("sendMessage" , {
        senderId:jwtDecode(jwt).id,
        receiverId:selectedUserId,
        text:userMessage,
    });



    try{
        const response = await axios.post("http://localhost:3001/api/messages" , message , {
            headers : {
                Authorization:  `Bearer ${jwt}`
            }
        });

        if(response.data){
            console.log("Messages" , response.data)
            setMessages([...messages , response.data])
            setUserMessage("");
        }
    }
    catch(err){
        console.log(err.message);
    };
};

    if(isLoadingConv){
        return(
            <div className="flex justify-center items-center h-screen"> 
                <ImSpinner2 className="animate-spin text-5xl text-violet-500"/>
            
            </div>
        )
    }


    return (
        <div> 
            <div>
                <NavBar/>
            </div>
            <div className = "flex h-screen mt-2 rounded-sm">
                <div className="bg-violet-100 w-1/3 pl-4 pt-4">
                    <div className="text-violet-500 font-bold text-2xl flex gap-x-2 mb-4">  
                        <span>Chats</span>
                        <BsFillChatFill/>
                    </div> 
                    {chatUsers.map((user , index) => 
                        (
                        <div  key = {index} onClick={() => SelectContact(user._id)} className={"flex gap-x-2 p-2 border-b border-gray-100 py-2 gap-2 items-center cursor-pointer hover:animate-pulse"}>
                            <ChatAvatar profilePicture={user.profilePicture} fullName={user.fullName}/> 
                            <span className=" text-blue-700"> {user.fullName}</span>
                        </div>
                    ))}
                </div>
                <div className="bg-violet-400 w-2/3 mx-2 p-2 flex flex-col overflow-auto">
                    <div className="flex-grow">
                        
                        {messages.map((message , index)=> {
                            return(
                            <Message key={index} message={message} myMessage={message.senderId === jwtDecode(jwt).id}/>
                            );
                        })}
                    </div>
                    <form>
                    <div className="flex gap-x-2">
                        <input type="text" onChange={(e) => handleUserMessageChange(e)} placeholder="Type a message" className="bg-white border p-2 flex-grow rounded-sm"/>
                        <button onClick = {(e) => handleSubmit(e)} className="bg-violet-500 p-2 text-white rounded-sm hover:bg-violet-800"> <AiOutlineSend/> </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
      );
}
 
export default Chat;