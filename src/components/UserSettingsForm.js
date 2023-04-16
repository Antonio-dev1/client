const UserSettingsForm  = () => {
    return (  
        <div className="bg-white px-[500px] py-[500px] rounded-3xl border-2 border-gray-200"> 
        <div className="flex justify-center">
        <img src ={''} alt="logo" className="flex w-40 h-40 justify-content-center"/>
        </div>
        <p className="flex justify-center font-bold text-lg text-gray-500 mb-2 ">User Settings!</p>
        <div className="mt-2"> 
            <input onChange={''} value={''} className ="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"  type="text" placeholder="First Name"   required />
    
        </div>
        <div className="mt-1"> 
            <input onChange={''} value={''}  className ="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"  type="text" placeholder="Last Name" required />
            
        </div>
        <div className="mt-1"> 
            <input onChange = {''} value={''}  className ="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"  type="text" placeholder="Email" required />
        
        </div>
        <div className="mt-1"> 
            <input onChange = {''} value={''} className ="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"  type="password" placeholder="password"  required />
        
        </div>
        <div className="mt-1"> 
            <input onChange = {''} value={''} className ="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"  type="password" placeholder="Retype password"  required />
        
        </div>
    
            <div className="mt-6 flex flex-col ">
                <button className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold" onClick = {'' }>Sign Up </button>
            </div>
           
        
    </div>
    );
}
 
export default UserSettingsForm ;