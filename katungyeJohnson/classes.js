
"strict";
/* this is a class using the constractor method*/
function vehicle (make, spead, color) {
    this.make = make;
    this.spead = spead;
    this.color = color;

    this.getName = function(){
        //code that is executed when the class is called
        return this.make + "" + this.model;
    }
}
// this class is called when this.getInfo points to the fuction
function Apple (type, weight) {
    this.type = type;
    this.weight = weight;
    
    this.getInfo = function() {
        return this.color + ' ' + this.type;
    };
}

//the code below is a besic way to diclare an object 
var student = {firstName:"Johnson", lastName:"katungye", age:28, course:"software development"};
 console.log(student);