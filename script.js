/*
function firstParameter(distance, unita){
    switch(unita){
        case 0: distance *= 1.0;
        break;
        case 1:  distance *= 1000.0;
        break;
        case 2:  distance *= 1609.0;
        break;
        case 3: distance /= 1.094;
        break;
    }

    return distance;
}

function secondParameter(hours, minutes, seconds){
    const time = (hours * 3600) + (minutes * 60)+ seconds;
    return time;
}

function passo1(distance, time, num){
    if(distance == 0) return 0;
    else if (distance > 0) return (time / (distance / num)) / 60;
}

function passo2(passoMinuti){
    
    if((passoMinuti % 1) == 0) return 0;
    else if((passoMinuti % 1) > 0){
        return (passoMinuti % 1) * 60;
    }
}

function unitOrari(distance, time, num){
    var ore = time / 3600;
    return (distance / num) / ore;
}

function metriPerSecondo(distance, time){
    return distance / time;
}

function calculate(){
    const distanceInput = document.getElementById("distance");
    const unitDistance = document.getElementById("unitDistance");
    const hoursInput = document.getElementById("hours");
    const minutesInput = document.getElementById("minutes");
    const secondsInput = document.getElementById("seconds");
    const speedKm1 = document.getElementById("speedKm1");
    const speedKm2 = document.getElementById("speedKm2");
    const distTime1 = document.getElementById("Km/h");
    const distTime2 = document.getElementById("Metri/secondo");
    const speedMiglio1 = document.getElementById("PassoMiglio1");
    const speedMiglio2 = document.getElementById("PassoMiglio2");
    const distTime3 = document.getElementById("Miglia/h");

    var distance = parseFloat(distanceInput.value);
    var hours = parseInt(hoursInput.value);
    var minutes = parseInt(minutesInput.value);
    var seconds = parseInt(secondsInput.value);

    if(isNaN(distance) || isNaN(hours) || isNaN(minutes) || isNaN(seconds) ||
    distance<0 || hours < 0 || minutes < 0 || seconds < 0) alert("Non possono esserci valori vuoti!!!");
    else{
        const dist = firstParameter(distance, unitDistance.selectedIndex);
        const totalTime = secondParameter(hours, minutes, seconds);
        
        speedKm1.value = parseInt(passo1(dist, totalTime, 1000));
        speedKm2.value = zeroBefore(parseInt(passo2(passo1(dist, totalTime, 1000))));
        distTime1.value = parseFloat(unitOrari(dist, totalTime, 1000));
        distTime2.value = parseFloat(metriPerSecondo(dist, totalTime));
        speedMiglio1.value = parseInt(passo1(dist, totalTime, 1609));
        speedMiglio2.value = zeroBefore(parseInt(passo2(passo1(dist, totalTime, 1609))));
        distTime3.value = parseFloat(unitOrari(dist, totalTime, 1609));
        passoXMetri(dist, totalTime);
    }

    //const dist = firstParameter(distance, unitDistance.selectedIndex);
    //const totalTime = secondParameter(hours, minutes, seconds);
    //alert(dist);
}

function passoXMetri(distance, time){
    const passaggioInput = document.getElementById("passaggio");
    const unitPassaggio = document.getElementById("unitPassaggio");
    const minutiPass = document.getElementById("passaggioResult1");
    const secondiPass = document.getElementById("passaggioResult2");

    var passaggio = parseInt(passaggioInput.value);

    var pass = firstParameter(passaggio, unitPassaggio.selectedIndex);

    if(passaggio < 0 || isNaN(passaggio) || pass > 10000) alert("Se non vuoi sapere nessun passaggio, inserisci 0 \n(MAX passaggio 10km)");
    else{
        var x = distance / pass;
        var y = time / x;
        document.getElementById("fraseMetri").innerHTML = "Passaggio a " + pass;

        if(distance == 0) minutiPass.value = 0;
        else if (distance > 0) minutiPass.value = parseInt(y / 60);

        if(((y/60) % 1) == 0) secondiPass.value = "00";
        else if(((y/60) % 1) > 0){
            secondiPass.value = zeroBefore(parseInt(((y/60) % 1) * 60));
        }
    }
}

function zeroBefore(value){
    let nwValue;
    if (value >= 0 && value <= 9) nwValue = "0" + value;
    else if(value > 9) nwValue = value;
    return  nwValue;
}
*/

//BUTTON
const submitButton = document.getElementById("submitButton");
const resetButton = document.getElementById("resetButton");
//INPUT
const distance = document.getElementById("distance");
const unitDistance = document.getElementById("unitDistance");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const passaggio = document.getElementById("passaggio");
const unitPassaggio = document.getElementById("unitPassaggio");
//OUTPUT
const minutesToKm = document.getElementById("minutesToKm");
const secondsToKm = document.getElementById("secondsToKm");
const kmToHour = document.getElementById("kmToHour");
const metersToSecond = document.getElementById("metersToSecond");
const minutesToMile = document.getElementById("minutesToMile");
const secondsToMile = document.getElementById("secondsToMile");
const mileToHour = document.getElementById("mileToHour");
const minutesToPace = document.getElementById("minutesToPace");
const secondsToPace = document.getElementById("secondsToPace");



function toMeters(distance, unita){
    switch(unita){
        case 0: distance *= 1.0;
        break;
        case 1:  distance *= 1000;
        break;
        case 2:  distance *= 1609;
        break;
        case 3: distance /= 1.094;
        break;
    }
    return distance;
}

function toSeconds(hours, minutes, seconds){
    let time = (hours * 3600) + (minutes * 60) + seconds;
    return time;
}

function calcMinutesToPace(distance, time, pace){
    if(distance == 0) return 0;
    else if (distance > 0) return (time / (distance / pace)) / 60;
}

function calcSecondsToPace(minutesToPace){
    if((minutesToPace % 1) == 0) return 0;
    else if((minutesToPace % 1) > 0){
        return (minutesToPace % 1) * 60;
    }
}

function unitToHour(distance, time, num){
    let hours = time / 3600;
    return (distance / num) / hours;
}

function calcMetersToSecond(distance, time){
    return distance / time;
}

function zeroBefore(value){
    let nwValue;
    if (value >= 0 && value <= 9) nwValue = "0" + value;
    else if(value > 9) nwValue = value;
    return  nwValue;
}

submitButton.addEventListener("click", function(){
    const meter = toMeters(parseFloat(distance.value), unitDistance.selectedIndex);
    const second = toSeconds(parseInt(hours.value), parseInt(minutes.value), parseInt(seconds.value));

    minutesToKm.value = parseInt(calcMinutesToPace(meter, second, 1000));
    secondsToKm.value = zeroBefore(parseInt(calcSecondsToPace(calcMinutesToPace(meter, second, 1000))));
    kmToHour.value = parseFloat(unitToHour(meter, second, 1000));
    metersToSecond.value = parseFloat(calcMetersToSecond(meter, second));
    
    minutesToMile.value = parseInt(calcMinutesToPace(meter, second, 1609));
    secondsToMile.value = zeroBefore(parseInt(calcSecondsToPace(calcMinutesToPace(meter, second, 1609))));
    mileToHour.value = parseFloat(unitToHour(meter, second, 1609));

    const pace = toMeters(parseFloat(passaggio.value), unitPassaggio.selectedIndex);
   
    minutesToPace.value = parseInt(calcMinutesToPace(meter, second, pace));
    secondsToPace.value = zeroBefore(parseInt(calcSecondsToPace(calcMinutesToPace(meter, second, pace))));
    
});

resetButton.addEventListener("click", function(){
    distance.value = 0;
    unitDistance.selectedIndex = 0;
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;  
    passaggio.value = 0;
    unitPassaggio.selectedIndex = 0;
    minutesToKm.value = 0;
    secondsToKm.value = 0;
    kmToHour.value = 0.0;
    metersToSecond.value = 0.0;
    minutesToMile.value = 0;
    secondsToMile.value = 0;
    mileToHour.value = 0.0;
    minutesToPace.value = 0;
    secondsToPace.value = 0;
});