var bar = foo('123');

function foo(x){
	return function(){
		return x;
	}
}

console.log(bar());
