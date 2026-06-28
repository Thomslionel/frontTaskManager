
export class UserModel {
    username : string;

    email : string;

    password : string;


    constructor(username : string, email : string, password : string){
        this.email = email;
        this.username = username;
        this.password = password;
    }


}