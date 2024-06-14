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
        speedKm2.value = parseInt(passo2(passo1(dist, totalTime, 1000)));
        distTime1.value = parseFloat(unitOrari(dist, totalTime, 1000));
        distTime2.value = parseFloat(metriPerSecondo(dist, totalTime));
        speedMiglio1.value = parseInt(passo1(dist, totalTime, 1609));
        speedMiglio2.value = parseInt(passo2(passo1(dist, totalTime, 1609)));
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

        if(((y/60) % 1) == 0) secondiPass.value = 0;
        else if(((y/60) % 1) > 0) secondiPass.value = parseInt(((y/60) % 1) * 60);
    }
}