export class User {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;

    constructor(obj?: any) {
        if (obj) {
            this.firstName = obj ? obj.firstName : ''; //if obj exists obj.firstName, else empty string
            this.lastName = obj ? obj.lastName : ''; //if obj exists obj.lastName, else empty string
            this.email = obj ? obj.email : ''; //if obj exists obj.lastName, else empty string
            this.birthDate = obj ? obj.birthDate : ''; //if obj exists obj.birthd email, else empty string
            this.street = obj ? obj.street : ''; //if obj exists obj.street, else empty string
            this.zipCode = obj ? obj.zipCode : ''; //if obj exists obj.zipCode, else empty string
            this.city = obj ? obj.city : ''; //if obj exists obj.city, else empty string
        }
    }

    /**transform the strings important users variable to JSON object */
    public toJSON() {
        return {
            firstName:  this.firstName, 
            lastName :  this.lastName,
            email : this.email,
            birthDate:  this.birthDate,           
            street   :  this.street,     
            zipCode  :  this.zipCode,        
            city:   this.city
        }
    }

}