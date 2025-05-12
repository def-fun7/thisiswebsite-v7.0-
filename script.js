let msg, morse, textTimeA, textTimeB;

const sMu       = math.createUnit('solMass', '1.989e+30 kg');

let i = 1;

const input = document.getElementById('input');
const myInput = document.getElementById("myInput");
const inputLabel = document.getElementById('inputLabel');
const output = document.getElementById('output');
const btn = document.getElementById('btn');
const send = document.getElementById('send')


// const units = document.getElementById('units');
// const magnitude = document.getElementById('height');
// const diffMass = document.getElementById('diffMass');
// const bhMass = document.getElementById('bhMass');
// const realMass = document.getElementById('realMass');
// const ra = document.getElementById('ra');
// const dec = document.getElementById('dec');
// const redshift = document.getElementById('redshift');
// const comovingDistance = document.getElementById('comovingDistance');
// const age = document.getElementById('age');
// const bhName = document.getElementById('name');

const titlebar = document.getElementById('titlebar');
const popup = document.getElementById('popup');
const pageNum = document.getElementById('pageNo');
const myPopup = document.getElementById('myPopup');
const closeB = document.getElementById('close');
const pagesB = document.getElementById('pageNo');
const backB = document.getElementById('back');
const forwardB = document.getElementById('forward'); 

let pageNo = 1;
var slides = {
     s1 : `Few moments ago, not too far away ...`,
     s2 : `there was a cat that lived on a strange blue planet. Very little is known about its home planet and far more less about the cat itself. its name is long lost to the anuals of history. some even doubt it ever existed. All that remains are some fragments from a document titled, 'Perhaps Diary', that only contains what can only be described as peculiar 'thought experiments'. Only few of them has been translated and made public in their entirety.` ,
     s3 : `This one is one of the partially recovered experiment, titled, 'la-', and goes like,`,
     s4 : `Imagine two beings.`,
     s5 : ` let's name them "umiko" and "faya", because... somethings are better mysterious.`,
     s6 : `umiko is a {enter height and unit} female from a species called "humankind" where the heights range from {show min and max and unit}. Her height (they use different pronouns for different species (because... well ask them) and for females they use "she/her") is important because of where she lives.

    and she lives just a {proper_distance} from the event horizon (according to herself) of a schwarzchild black hole, whose mass is tied to her height in an elegant mathematical way. The black hole is just enough massive so that at it's event horizon, the gravitational gradient or tidal forces is same as they would be for a person with an height of one meter at her home planet. This is so she doesn't get sphegatiffied. 

    As her height {enter height and unit} changes so does the mass {ideal mass} of the black hole. (try it)

    based on her current height, she is living around a black hole named {sdss name}, (don't ask why it's called that), that has a mass of { used mass}, which is {mass diff} because universe isn't ideal.  {sdss name} is located at right ascension of {RA} decimal degrees and declination of {dec} decimal degrees from her home planet and has a event horizon at {rs}, which is also it's schwarzchild radius.

    from her home planet prespective, the black hole has a comoving distance (distance between her home planet and the bh considering no expansion of the universe) of {co_dist} and cosmological redshift factor of {z_c}. From her home planet the black hole can be seen as it was when universe was {age} because light takes time to travel.

    but that is enough about umiko. let's talk about faya.` ,

     s7 : `faya used to live with umiko but was then banned from ever coming pass any black hole (why? because universe is a crazy place). The nearest she could get was to the point where the gravitational accelaration due to that black hole is same as the gravitational accelaration on the surface of her home planet satellite, (from some text it was known as moon) due to her home planet which is almost {g at moon due to earth}. in other words next to nothing.

    based on the current umiko's bh, umiko was {coord_d} away from the event horizon according to faya measurement, meaning her radial distance from the black hole was {r}

    factoring in faya's restriction, she can only get as close as {D} from the center of the black hole, which meant they were {d} apart.

    worlds apart...
    but not separate ways...`,

     s8 : `like any good friends who have lived in the universe together long enough, they had a contengcy plan, "flash messages".
    The method was quite simple and as long as the laws of the universe doesn't suddenly decided to go bananas, workable.

    They would uses flashes of light to send each other messages, to communicate. (there is always a way). They agreed on the wavelength of light they will use, that is {obs_w} and the duration of a single dot, that was {t_do} and dash that was {t_da}.

    But when did universe ever made things easy for anyone? Due to the gravitational redshift factor of {z_g}, in order for umiko to observe {obs_w}, faya will have to use the light of wavelength {em_b} because it will get blueshift and will be {obs_w} when it reached umiko. in case of umiko, she will have to use {em_a} because it will get redshift thanks to GR.

    If this was not good enough, for dot and dash to be {t_do} and {t_da} for umiko, faya would have to use durations of dot and dashes of {t_oB} and {t_daB} because gravitational time dialtion is a thing. on the other hand, umiko would have to make her flash durations insanely small as {t_oA} and {t_daA} for it to be same as they agreed.

    From faya point of view, each message would take {sig_tr_time} to reach and recieve.`,

     s9 : `that was the thought experiment.
    what it meant and was meant to represent? ask the cat.`,

     s10 : `based on this, to grasp the full reality of their situation and how something as simple and taken for gurranted, like talking can be complex and crazy because of how the universe works, this site further allows you to send messages, acting as faya and umiko all by yourself, that will on the outside will go immediately, but if you read the message timing, it will become cleared to you. also the message will be in morse, (on hover or hold will decoded back to english), to show how completley absurd it looks unless you know what is being said.`,

     s11 : `so...`
};

var a = [slides.s1, slides.s2, slides.s3, slides.s4, slides.s5, slides.s6, slides.s7, slides.s8, slides.s9, slides.s10, slides.s11];


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
        // time = math.evaluate('(dots * dur_dot_A) + (spc * dur_dot_A) + (dashes * dur_dash_A) to s', {dots: chrDic.dot, spc: chrDic.spc, dashes: chrDic.dash, dur_dot_A:dur_dot_A, dur_dash_A: dur_dash_A});
        inputLabel.innerHTML = 'Person B';
        i = 0;
    }else if(i === 0){
        // time = math.evaluate('(dots * dur_dot_B) + (spc * dur_dot_B) + (dashes * dur_dash_B) to s', {dots: chrDic.dot, spc: chrDic.spc, dashes: chrDic.dash, dur_dot_B:dur_dot_B, dur_dash_B: dur_dash_B});
        inputLabel.innerHTML = 'Person A';
        i = 1;
    }
    time = 0;
    newDiv(morse, msg, time);
    myInput.value = 'Add text';
    output.scrollTop = output.scrollHeight; 
    
}

function unitConvert() {
    var h_in_meters = math.evaluate('(quantity) to meters ' , {quantity: math.unit(magnitude.value, units.value)});
    
    var massIdeal = math.evaluate('(c^3 / (2 * G) * sqrt(h / dg)) to solMass', { c: math.speedOfLight, G: math.gravitationConstant, h: h_in_meters, dg: math.unit(3.0723e-6, 'm/s^2') });

    bhMass.innerHTML = math.format(massIdeal.toNumber(), 3)  + ' M<sub>&#9737;</sub> '   

    var bhJSON = JSON.parse(data);
    var massArray = bhJSON.Mass;

    var massUsed = closestMass(massIdeal.toNumber(), massArray);
    var quantities = calculations(h_in_meters, math.unit(massUsed, 'solMass'));
    
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


function calculations (h, mass){

    const c           = math.speedOfLight;
    const G          = math.gravitationConstant;
    const gE         = math.gravity;

    const del_ge     = math.unit(3.0723e-6, 'm/s^2');
    const g_me      = math.unit(3.319e-5, 'm/s^2');

    var prop_r       = math.unit(10000, 'm');
    var obs_w        = math.unit(500e-9, 'm');
    var dur_dot     = math.unit(3e-3, 'sec');
    var dur_dash    = math.unit(5e-3, 'sec');

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
    
    calculatedQ = {
        c           :  c,
        G          : G,
        gE         : gE, 
        del_ge     : del_ge, 
        g_me      : g_me,
        prop_r     : prop_r,
        obs_w         : obs_w,
        dur_dot      : dur_dot,
        dur_dash     : dur_dash,

        mass             : mass, 
        rs                 : rs, 
        coord_r          : coord_r,
        r                  : r,
        f_of_r             : f_of_r,
        D                  : D, 
        d                  : d,
        z                  : z,
        em_wA          : em_wA,
        em_wB          : em_wB,
        dur_dot_A      : dur_dot_A,
        dur_dash_A     : dur_dash_A,
        dur_dot_B      : dur_dot_B,
        dur_dash_B     : dur_dash_B,
        sig_tra_time    : sig_tra_time
    }

    return calculatedQ
}


function closePopup(){
    popup.style.display = "none";
    input.style.display = "block";
    titlebar.style.display = "block"
}

function back(){
    if(pageNo > 1){
        pageNo -= 1;
        pageNum.innerHTML = pageNo+'/11';
        myPopup.innerHTML = a[pageNo-1];
    }
}

function forward(){
    if (pageNo <11){
        pageNo += 1;
        pageNum.innerHTML = pageNo +'/11';
        myPopup.innerHTML = a[pageNo-1];
    }
}


myInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
    //   event.preventDefault();
      btn.click();
      window.scrollTo(0, output.scrollHeight)
    }

});


closeB.addEventListener('mouseover', () => {
    closeB.setAttribute('title', 'close');
});

pagesB.addEventListener('mouseover', () => {
    pagesB.setAttribute('title', 'Pages');
});

backB.addEventListener('mouseover', () => {
    backB.setAttribute('title', 'Go to Previous Slide');
});

forwardB.addEventListener('mouseover', () => {
    forwardB.setAttribute('title', 'Go to Next Slide');
});

// units.addEventListener('change', () => {
//     magnitude.min = eval(range[units.value].min);
//     magnitude.max = eval(range[units.value].max);
//     magnitude.value = magnitude.min; 
//     unitConvert();
// });

// magnitude.addEventListener('change', () => {
//     unitConvert();
// });

// document.onload = unitConvert();