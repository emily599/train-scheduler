var config = {
    apiKey: "AIzaSyA-StDC3S9wOwqTrPiXfJMw0ve4fk_TpZU",
    authDomain: "train-scheduler-a1514.firebaseapp.com",
    databaseURL: "https://train-scheduler-a1514.firebaseio.com",
    projectId: "train-scheduler-a1514",
    storageBucket: "train-scheduler-a1514.appspot.com",
    messagingSenderId: "389719691225"
};

firebase.initializeApp(config);

var database = firebase.database();

var trains = {
    trainName: [],
    destination: [],
    firstTrainTime: [],
    frequency: [],
}

$(".submit").on("click", function (event) {
    console.log("hello");
    event.preventDefault();

    trainNameValue = $("#trainNameInput").val().trim();
    destinationValue = $("#destinationInput").val().trim();
    trainTimeValue = $("#trainTimeInput").val().trim();
    frequencyValue = $("#frequencyInput").val().trim();

    database.ref().push({
        trainName: trainNameValue,
        destination: destinationValue,
        firstTrainTime: trainTimeValue,
        frequency: frequencyValue,
        // dateAdded: firebase.database.serValue.TIMESTAMP
    });

});

database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val());

    var momentCalc = moment();
    var firstTimeCalc = childSnapshot.val().firstTrainTime;
    var diffHours = momentCalc.diff(firstTimeCalc, "hours");
    var conversion = diffHours * 60;
    var minutesLeft = conversion % childSnapshot.val().frequency;

    var nextArrival = minutesLeft + moment();




    $("tbody").append("<tr><td>"
        + childSnapshot.val().trainName +
        "<td>" + childSnapshot.val().destination +
        "<td>" + childSnapshot.val().frequency +
        "<td>" + nextArrival +
        "<td>" + minutesLeft +
        "</td><tr>");
}, function (errorObject) {
    console.log("Errors handled" + errorObject.code);

});
