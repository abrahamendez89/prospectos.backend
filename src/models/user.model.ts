export class User {
    userId: Number
    username: String
    password: String
    
    constructor (userId: Number, username: String, password: String){
       this.userId = userId
       this.username = username
       this.password = password
    }
}