function promiseToString(callMethod){
    let result;
    try {
        result = callMethod;
    } catch (err) {
        console.log('promiseToString error');
    }
    return result;
 }

function currentTimeStamp () {
    return convertTime(Math.floor(Date.now() / 1000)); 
}

function convertTime (UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = "0" + a.getMinutes();
    let sec = "0" + a.getSeconds();
    let formattedDate = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min.substr(-2) + ':' + sec.substr(-2) ;
    return formattedDate;
}

// --- Firebase -------------------------------------------------------------------------------------
 
var admin = require("firebase-admin");
var serviceAccount = require("../nxc-weather-station-firebase-adminsdk-xrmvu-08f1654e2b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nxc-weather-station-default-rtdb.europe-west1.firebasedatabase.app/"
});

function writeFirebase (data,path) {
    var db = admin.database();
    var ref = db.ref(path);

    // Update data
    ref.set(data, function(error) {
    if (error) {
        console.log("Data could not be updated." + error);
    } else {
        //console.log("Data updated successfully.");
    }
    });
}

function readFirebase(path) {
    var db = admin.database();
    var ref = db.ref(path);

    return new Promise((resolve, reject) => {
        ref.once("value", function(snapshot) {
            const data = snapshot.val();
            resolve(data);
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
            reject(errorObject);
        });
    });
}

function getIndoorData() {
    return readFirebase("indoor");
}

function getOutdoorData() {
    return readFirebase("outdoor");
}



module.exports = {  promiseToString : promiseToString,
                    writeFirebase: writeFirebase,
                    readFirebase : readFirebase,
                    getIndoorData : getIndoorData,
                    getOutdoorData: getOutdoorData,
                    currentTimeStamp : currentTimeStamp
                 }   