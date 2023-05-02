import format from 'date-fns/format';

const Message = ({message , myMessage}) => {

    const myMessageCss = " bg-blue-500 text-white rounded-lg p-3 my-2 mx-auto flex flex-col relative items-end";
    const otherMessage = "relative bg-gray-100 text-gray-600 rounded-lg p-3 my-2  mx-auto flex flex-col items-start";
    const messageTime = new Date(message.creationDate);
    function formatDate(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        
        // Return formatted date string
        return date.toLocaleString('en-US', options);
      }



    return ( 
            <div className={myMessage?myMessageCss:otherMessage}>

                <div className="flex">
                    <p className="px-[10px] border-radius-[20px] text-color-white w-max-[300px]">{message.text}</p>
                </div>

                <div className="text-sm mt-2">
                {formatDate(messageTime)}
                </div>

            </div> 
    );
}
 
export default Message;