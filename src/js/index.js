import "babel-polyfill";
import User from "./user";
let UserObject = new User("Abhishek Mishra", "31");
document.getElementById("user_name").innerHTML = UserObject.getUserName();
document.getElementById("user_age").innerHTML = UserObject.getUserAge();
