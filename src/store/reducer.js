const INITIAL_STATE = {
  
   login : {
      name : "",
      email : "",
      password : "" , 
      uid : "", 
      phoneNo : ""
   } ,
   checkData : {
      name : "",
      email : "",
      password : "" , 
      uid : "" , 
      phoneNo : ""

   },
  posts : []
   
} 
function reducer(state = INITIAL_STATE ,action){
        switch (action.type) {
           case "SignIn" :
               return {...state , login : {...state.login , name : action.name , email : action.email , password : action.password , uid : action.uid , phoneNo : action.phoneNo} }
         
            case "checkData" : 
            return {...state , checkData : {...state.checkData , name : action.name , email : action.email , password : action.password , uid : action.uid , phoneNo : action.phoneNo} }
            case "addPost" : 
            return {...state ,  posts : action.posts}
            case "postDataFromLS" : 
            return {...state , posts : action.posts}
            case "postDelete":
               return {...state , posts : action.posts}
               case "postUpdate":
                  return {...state , posts : action.posts}
         }

        return state
}
export default reducer