let msg, morse, textTimeA, textTimeB;


const sMu       = math.createUnit('solMass', '1.989e+30 kg');
const c           = math.speedOfLight;
const G          = math.gravitationConstant;
const gE         = math.gravity;

const del_ge     = math.unit(3.0723e-6, 'm/s^2');
const g_me      = math.unit(3.319e-5, 'm/s^2');

let h              = math.unit(1, 'm');
var prop_r       = math.unit(10000, 'm');
var obs_w        = math.unit(500e-9, 'm');
var dur_dot     = math.unit(3e-3, 'sec');
var dur_dash    = math.unit(5e-3, 'sec');

var mass            = math.evaluate('(c^3 / (2 * G) * sqrt(h / dg)) to solMass', { c: c, G: G, h: h, dg: del_ge });
var rs                = math.evaluate('(2*G*M)/c^2', {G: G, M:mass, c:c});
var coord_r         = math.evaluate('(-rs + sqrt(rs^2 + 4 * prop_r^2))/2 to m', {rs: rs, prop_r: prop_r });
var r                 = math.evaluate('coord_r + rs to m', {coord_r: coord_r, rs: rs});
var f_of_r            = math.evaluate('sqrt(1 - (rs/r))', {rs: rs, r: r});
var D                 = math.evaluate('sqrt((G *M)/g_me)', {G:G, M:mass, g_me: g_me});
var d                 = math.evaluate('D-r to m', {D:D, r:r});
var z                 = math.evaluate('(1/f_of_r)-1', {f_of_r: f_of_r});
var em_wA         = math.evaluate('obs_w * f_of_r to m', {obs_w:obs_w, f_of_r:f_of_r});
var em_wB         = math.evaluate('obs_w / f_of_r to m', {obs_w: obs_w, f_of_r: f_of_r});
var dur_dot_A     = math.evaluate('dur_dot * f_of_r to s', {dur_dot: dur_dot, f_of_r:f_of_r});
var dur_dash_A    = math.evaluate('dur_dash * f_of_r to s', {dur_dash: dur_dash, f_of_r:f_of_r});
var dur_dot_B     = math.evaluate('dur_dot / f_of_r to s', {dur_dot: dur_dot, f_of_r:f_of_r});
var dur_dash_B    = math.evaluate('dur_dash / f_of_r to s', {dur_dash: dur_dash, f_of_r:f_of_r});
var sig_tra_time   = math.evaluate('(d/c) +((rs/c)*((D-rs)/(r-rs))) to s', {d:d, rs:rs, c:c, D:D, r:r})

let i = 1;

const myInput = document.getElementById("myInput");
const inputLabel = document.getElementById('inputLabel');
const output = document.getElementById('output');
const btn = document.getElementById('btn');
const send = document.getElementById('send')


const units = document.getElementById('units');
const magnitude = document.getElementById('height');
const diffMass = document.getElementById('diffMass');
const bhMass = document.getElementById('bhMass');
const realMass = document.getElementById('realMass');
const ra = document.getElementById('ra');
const dec = document.getElementById('dec');
const redshift = document.getElementById('redshift');
const comovingDistance = document.getElementById('comovingDistance');
const age = document.getElementById('age');
const bhName = document.getElementById('name');


var range = {
      meter: {
        min: 1,
        max: 3
      },
      centimeters: {
        min: parseFloat(math.evaluate('1 meter to centimeters').toNumber()).toFixed(2),
        max: parseFloat(math.evaluate('3 meter to centimeters').toNumber()).toFixed(2)
      },
      feet: {
        min: parseFloat(math.evaluate('1 meter to feet').toNumber()).toFixed(2),
        max: parseFloat(math.evaluate('3 meter to feet').toNumber()).toFixed(2)
      },
      inches: {
        min: parseFloat(math.evaluate('1 meter to inches').toNumber()).toFixed(2),
        max: parseFloat(math.evaluate('3 meter to inches').toNumber()).toFixed(2)
      
    }
};

function toMorse() {
    msg = myInput.value;
    morse = morjs.encode(msg);
    var chrDic = charCount(morse);
    if (i === 1){
        time = math.evaluate('(dots * dur_dot_A) + (spc * dur_dot_A) + (dashes * dur_dash_A) to s', {dots: chrDic.dot, spc: chrDic.spc, dashes: chrDic.dash, dur_dot_A:dur_dot_A, dur_dash_A: dur_dash_A});
        inputLabel.innerHTML = 'Person B';
        i = 0;
    }else if(i === 0){
        time = math.evaluate('(dots * dur_dot_B) + (spc * dur_dot_B) + (dashes * dur_dash_B) to s', {dots: chrDic.dot, spc: chrDic.spc, dashes: chrDic.dash, dur_dot_B:dur_dot_B, dur_dash_B: dur_dash_B});
        inputLabel.innerHTML = 'Person A';
        i = 1;
    }
    newDiv(morse, msg, time);
    myInput.value = 'Add text';
    output.scrollTop = output.scrollHeight; 
    
}

function unitConvert() {
    var h_in_meters = math.evaluate('(quantity) to meters ' , {quantity: math.unit(magnitude.value, units.value)});
    
    var massIdeal = math.evaluate('(c^3 / (2 * G) * sqrt(h / dg)) to solMass', { c: c, G: G, h: h_in_meters, dg: del_ge });

    bhMass.innerHTML = math.format(massIdeal.toNumber(), 3)  + ' M<sub>&#9737;</sub> '   

    var bhJSON = JSON.parse(data);
    var massArray = bhJSON.Mass;

    var massUsed = closestMass(massIdeal.toNumber(), massArray);
    realMass.innerHTML = math.format(massUsed, 3) + ' M<sub>&#9737;</sub> ';
    var i = Object.values(massArray).indexOf(massUsed);

    var diff = massIdeal.toNumber() - massUsed;

    if (diff > 0) {
    diffMass.innerHTML = 'The real mass is ' + '<span class="styledBox">' +math.format(diff, 3) + ' M<sub>&#9737;</sub> </span>' + ' larger than the ideal mass.';
    } else {
    diffMass.innerHTML = 'The real mass is ' + '<span class="styledBox">' +math.format(-diff, 3) + ' M<sub>&#9737;</sub>  </span>' + ' smaller than the ideal mass.';
    }

    var massRow = {};

    for (var key in bhJSON) {
    if (bhJSON.hasOwnProperty(key) && bhJSON[key].hasOwnProperty(i)) {
        massRow[key]= bhJSON[key][i];
    }
    }
    
    bhName.innerHTML = massRow.SDSS_Name;
    ra.innerHTML = parseFloat(massRow.RA).toFixed(6);
    dec.innerHTML = parseFloat(massRow.DEC).toFixed(6);
    redshift.innerHTML = massRow.z;
    comovingDistance.innerHTML = math.format(massRow['co-d'], 3) + ' light years';
    age.innerHTML = parseFloat(massRow['age_of_un']).toFixed(3) + ' billion years';
}



function newDiv(morse, msg, time){
    const newDiv = document.createElement('p');
    newDiv.classList.add('message-text', 'morse');
    newDiv.id = 'text';
    newDiv.textContent = morse;
    
    newDiv.onmouseover = function(){
        newDiv.innerText = msg;
    }

    newDiv.onmouseout = function(){
        newDiv.innerText = morse;
    }

    if (i ===0){
        newDiv.classList.add('user-message');
        newDiv.style.textAlign = 'right';
        send.style.color = 'blue';
    }else if(i ===1){
        newDiv.classList.add('other-message');
        newDiv.style.textAlign = 'left';
        send.style.color = 'green';
    }

    const infoButton = document.createElement('i');
    infoButton.id = 'info';
    infoButton.classList.add('fas', 'fa-info-circle');
    infoButton.style.fontSize = '16px';
    infoButton.style.cursor = 'pointer';

    infoButton.onmouseover = function(){
        infoButton.innerHTML = "<b>Text Time:</b> "+time + '<br>' + "<b>Message: </b>" + msg;
    }

    infoButton.onmouseout = function(){
        infoButton.innerHTML = "";
    }

    output.appendChild(newDiv);
    // outputDiv.appendChild(infoButton);
}

function charCount(str){
    var chars = str.split('');
    var dsd = {dot: morjs.encode('e'), spc: ' ', dash: morjs.encode('t')}
    var counts = {dot: 0, spc: 0, dash: 0};
    for (const char of chars){
        if (char === dsd.dot ){
            counts.dot +=1;
        }else if ( char === dsd.dash ){
            counts.dash +=1;
        }else if(char === dsd.spc){
            counts.spc +=1;
        }else {
             console.log('Non-morse character');
        }
    }
    return counts;
}  

 function closestMass(target, dictionary) {

      const values = Object.values(dictionary);
  
      return values.reduce((closest, current) => 
          Math.abs(current - target) < Math.abs(closest - target) ? current : closest
      );
  }


myInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
    //   event.preventDefault();
      btn.click();
      window.scrollTo(0, output.scrollHeight)
    }

});

units.addEventListener('change', () => {
    magnitude.min = eval(range[units.value].min);
    magnitude.max = eval(range[units.value].max);
    magnitude.value = magnitude.min; 
    unitConvert();
});

magnitude.addEventListener('change', () => {
    unitConvert();
});

document.onload = unitConvert();