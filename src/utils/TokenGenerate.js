const jwt =require('jsonwebtoken')
const TokenGenerate=(details)=>{
if(!details){
    const message ="token not generated"
return message
}else{
    const detail={
        name:details?.name,
        email:details?.email,
        role:details.role
    }
    const token= jwt.sign(detail,"pankaj@&^&*%&**%*")
    return token
}
}

module.exports=TokenGenerate