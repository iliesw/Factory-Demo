export default function({email,password,Secrets}:{email:string,password:string,Secrets?:any}):boolean{
    if(email === Secrets.AdminEmail && password === Secrets.AdminPassword){
        return true
    }
    return false
}