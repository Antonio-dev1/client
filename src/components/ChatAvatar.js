const ChatAvatar = ({profilePicture, fullName}) => {
    return ( 
    <div className="w-10 h-10 bg-pink-300 rounded-full text-center flex items-center">
        <img src = {profilePicture} alt= {fullName} className="w-full h-full rounded-full"/>

    </div>
    
    );
}
 
export default ChatAvatar ;