export default class User {
    constructor (userName, userAge) {
        this.userName = userName;
        this.userAge = userAge;
    }
   getUserName() {
        return this.userName;
    }
   getUserAge() {
        return this.userAge;
    }
}
