
var parent = function (){
	var name = " andyaic ";
	var age = 18;

	var child = function(){
		var name = "andyiac child "
		childAge =  0.3;
		console.log(name ,age ,childAge);
	};

	child();

	console.log(name,age,childAge);
};

parent();
