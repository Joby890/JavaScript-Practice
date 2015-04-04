var array = [];
var prompt = require("prompt");
prompt.start();



var newUser = new User("George", "Washington", "first@president.gov", "whitehair");
addUser(newUser);
newUser = new User("Abraham", "Lincoln", "woncivilwar@president.gov", "winning");
addUser(newUser);
newUser = new User("John", "Adams", "second@president.gov", "revolution");
addUser(newUser);
newUser = new User("Dwight", "Eisenhower", "worldwar@president.gov", "bomb");
addUser(newUser);
newUser = new User("Theodore", "Roosevelt", "museum@president.gov", "IAmOnAHorse");
addUser(newUser);
//console.log(array);
var cotainsCompare = function(a, b) {
	return a === b.getName();
}


var d = contains(array, "Ben Franklin", cotainsCompare);
console.log(d);
getUser("woncivilwar@president.gov", function(user) {
	console.log("Name: " + user.getName());
});
console.log(array);
sort(array, function(usera, userb) {
	if (usera.lastname.localeCompare(userb.lastname) == 0) {
		return usera.firstname.localeCompare(userb.firstname) > 0;
	} else {
		return usera.lastname.localeCompare(userb.lastname) > 0;
	}

});

sort(array, function(usera, userb) {
	return usera.email.localeCompare(userb.email) > 0;
});


console.log(array);



function User(firstname, lastname, email, password) {

	this.firstname = firstname;
	this.lastname = lastname;
	this.email = email;
	this.password = password;

	this.getName = function() {
		return this.firstname + " " + this.lastname;
	}

	this.checkEmail = function() {
		return (this.email.length > 4 && this.email.indexOf("@") > -1 && this.email.indexOf(".") > -1);
	}

	this.encryptPassword = function() {
		this.password = this.password.split("").reverse().join("");
	}



}

function getUser(email, callback) {
	if (callback == undefined) {
		array.forEach(function(user) {
			if (compare(email, user.email)) {
				return user;
			}
		});
	} else {
		array.forEach(function(user) {
			if (compare(email, user.email)) {
				callback(user);
			}
		});


	}

}

function addUser(user) {
	if (user.checkEmail()) {
		if (contains(array, newUser, compare)) {
			//console.log(user.email + " already exists")
		} else {
			array.push(newUser);
			//console.log(user.email + " added to array");
		}
	} else {
		console.log("Error with email");
	}

}

function deleteUser(user) {
	array.splice(user);
}


function logUser(arg) {
	console.log(arg);
}



function contains(collection, user, callback) {
	if (collection.constructor === Array) {
		var b = false;
		collection.forEach(function(u) {
			if (callback(user, u)) {
				b = true;
			}
		});
		return b;
	} else {
		for (var a in collection) {
			if (callback(user, collection[a])) {
				return true;
			}
		}
		return false;
	}
}

function compare(usera, userb) {
	if (typeof usera == "Object" && typeof userb == "Object") {
		return usera.email === userb.email;
	} else {
		return usera === userb;
	}
}


function sort(array, check) {
	var change = true;
	while (change) {
		change = false;
		for (i = 0; i < array.length - 1; i++) {

			if (check(array[i], array[i + 1])) {
				var temp = array[i];
				array[i] = array[i + 1];
				array[i + 1] = temp;
				change = true;
			}
		}
	}
	return change;

}