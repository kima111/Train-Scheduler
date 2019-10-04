var config = {
    apiKey: "AIzaSyBNUfzY5_Z1cX7RLttXQSC78NZo6s8lfrM",
    authDomain: "rps-game-50d40.firebaseapp.com",
    databaseURL: "https://rps-game-50d40.firebaseio.com",
    projectId: "rps-game-50d40",
    storageBucket: "",
    messagingSenderId: "451936433031",
    appId: "1:451936433031:web:308fa9c927c15f458d5922"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

var table = $("#employee-table");

$("#click-button").on("click", function (event) {
    event.preventDefault();

    var name = $("#name").val().trim();
    var role = $("#role").val().trim();
    var startDate = $("#start-date").val().trim();
    var monthlyRate = $("#monthly-rate").val().trim();

    console.log(name);
    console.log(role);
    console.log(startDate);
    console.log(monthlyRate);

    var startDateTimeStamp = moment(startDate, "MM-DD-YYYY").format("X");

    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate,
        startDateTimeStamp: startDateTimeStamp
    });

    // table.append("<tr><td>" + name + "</td><td>" + role + "</td><td>" + startDate + "</td><td>" + monthlyRate + "</td></tr>");

});

database.ref().on("child_added", function(snapshot) {
    var employee = snapshot.val();

    var a = moment(employee.startDateTimeStamp, "X");
    var b = moment();

    var difference = b.diff(a, 'months');
    
    // console.log(difference);
    console.log(moment(moment(employee.startDateTimeStamp, "X"), "YYYYMMDD").fromNow('M'));

    var monthsWorked = difference;
    var totalBilled = difference * employee.monthlyRate;

    table.append("<tr><td>" + employee.name + "</td><td>" + employee.role + "</td><td>" + employee.startDate + "</td><td>" + monthsWorked + "</td><td>" + employee.monthlyRate + "</td><td>" + totalBilled + "</td></tr>");
});