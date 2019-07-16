$(document).ready(function() {
    // 1. Initialize Firebase

    var firebaseConfig = {
        apiKey: "AIzaSyDjJsWdJNhT0hNvVF2Lhc1PxSnygahYDQE",
        authDomain: "trainproj-cc22a.firebaseapp.com",
        databaseURL: "https://trainproj-cc22a.firebaseio.com",
        projectId: "trainproj-cc22a",
        storageBucket: "",
        messagingSenderId: "9840438243",
        appId: "1:9840438243:web:b5b8bcf0b162d821"
    };

    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    // Create an on click function that adds trains to the top table
    $("#newTrain").on("click", function(event) {
        event.preventDefault();

        // create variables with the user input from form
        var trainName = $("#trainName").val().trim();
        var destination = $("#destField").val().trim();
        var trainTimeVar = $("#trainTime").val().trim();
        var frequenC = $("#freqField").val().trim();

        // create object for new input
        var newTrainObj = {
            name: trainName,
            destination: destination,
            firstTime: trainTimeVar,
            frequency: frequenC
        };

        // push it (real good) to firebase 
        database.ref().push(newTrainObj);

        // make sure this train reached
        console.log(newTrainObj.name);
        console.log(newTrainObj.destination);
        console.log(newTrainObj.firstTime);
        console.log(newTrainObj.frequency);

        // clear form field
        $("#trainName").val("");
        $("#destField").val("");
        $("#trainTime").val("");
        $("#freqField").val("");
    });

    // we gotta bring it back... htf?!
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
        console.log(childSnapshot.val());

        // variables for the snizzaps
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var trainTimeVar = childSnapshot.val().firstTime;
        var frequenC = childSnapshot.val().frequency;

        // check this
        console.log(trainName);
        console.log(destination);
        console.log(trainTimeVar);
        console.log(frequenC);


        // got some help here from tutor
        var trainXConvert = moment(trainTimeVar, "hh:mm a").subtract(1, "years");
        // store current time
        var rightNowTime = moment().format("HH:mm a");
        console.log("Current Time:" + rightNowTime);
        // use that momentjs diff
        var timeDiff = moment().diff(moment(trainXConvert), "minutes");
        // store the time left
        var remainderTime = timeDiff % frequenC;
        // next train arr math
        var minutesAway = frequenC - remainderTime;
        var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");

        // push it to the table for consumption! IM FUGGIN DONE BABY!!!!
        $("#table > tbody").prepend("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequenC + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
    });
});