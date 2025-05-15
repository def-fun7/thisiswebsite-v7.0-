// it was fun writing this... crying-in-the-bleachers-saying-it-was-fun-kinda-fun

let msg, morse, textTimeA, textTimeB;

const sMu       = math.createUnit('solMass', '1.989e+30 kg');
const billyr     = math.createUnit('TrillionYears', '10e12 years');

let i = 1;
let pageNo = 1;
let messageCount =0;
var longPages = [2, 3];
var l = [];

const input = document.getElementById('input');
const myInput = document.getElementById("myInput");
const inputLabel = document.getElementById('inputLabel');
const output = document.getElementById('output');
const btn = document.getElementById('btn');
const send = document.getElementById('send')

const infoB = document.getElementById('info');
const infoC = document.getElementById('infoC')
const titlebar = document.getElementById('titlebar');
const popup = document.getElementById('popup');
const pageNum = document.getElementById('pageNo');
const myPopup = document.getElementById('myPopup');
const closeB = document.getElementById('close');
const pagesB = document.getElementById('pageNo');
const backB = document.getElementById('back');
const forwardB = document.getElementById('forward'); 

var slides = {
     s1 : `Few moments ago, not too far away...`,
     s2 : `<p> 
                There was a cat, that presumably lived on a strange blue planet. 
                Very little is known about its home planet and even far more less about the cat itself. 
                Its name, if it ever had one, is long lost to the annuals of history.
            </p>

            <p class="noIndent">
                Some even doubt it ever existed. 
            </p>

            <p>
                All that remains are some fragments from a document titled, 
                <span class="styledBox">
                    "Perhaps Diary"
                </span>, 
                that only contains what can only be described as peculiar 
                <span class="styledBox">
                    "thought experiments".
                </span>. 
            </p>
            <p class="noIndent">
                Only few of them has been translated and made public in their entirety.
            </p>
            ` ,
     s3 : `<p>
                This is mostly based on one of the partially recovered experiments from the aforementioned document, titled, 
            </p>
            <p style="text-align: center; text-indent:0; font-size:x-large; margin-bottom: 5px;">
                <span class="styledBox" >
                    L'appel au Vide
                </span>,
            </p>
            <p class="noIndent">
                which translates to 
                <span class="styledBox">
                    "Call at the Void"
                </span>,
                 and goes like,
            </p>`,
     s4 : `<p style="text-align: center; text-indent:0; margin-bottom: 5px;">
                Imagine two beings of reasonable intellect and resilient as well as reliable friendship. 
            </p>`,
     s5 : `<p style="text-align: center; text-indent:0; margin-bottom: 5px;">
                Let's name them "Faye" and "Umiko".
            </p>
            <p style="text-align: center; text-indent:0; margin-bottom: 5px;">
                <div class="why" style="cursor: pointer;"> 
                    (why???)
                    <span class="hiddenwhy" style="top:0; left:0;"> 
                        (because... somethings are better mysterious.) 
                    </span>
                </div>
            </p>`,
     s6 : `<p>
                Faye is a 
                    <label for="height"></label>
                        <input type="number" title="height" id="height" class="styledBox" min="1" max="3" value="1" step="0.1">

                        <label for="units"></label>
                        <select id="units" class="styledBox" name="units" title="units">
                        
                            <option value="meters" >meters</option>
                            <option value="centimeters" >centimeters</option>
                            <option value="feet" >feet </option>
                            <option value="inches" > inches</option>
                        </select> 
                tall female member of a species called "humankind", that also inhabit this planet and on average have heights ranging from 
                <span id="minMaxunit" class="styledBox">
                    1 to 3 meters
                </span>. 
            </p>
            <p>
                Her height (they use different pronouns for different genders
                <span class="why" style="cursor: pointer;"> 
                    (why???)
                    <span class="hiddenwhy"> 
                        (well, ask them) 
                    </span>
                </span> 
                and for females they use "she/her") is important because of where she lives.
                <span class="why" style="cursor: pointer; font-size:small;"> 
                    (Her gender)
                    <span class="hiddenwhy"> 
                        (is interesting because male of that species are reportedly more moronic.) 
                    </span>
                </span>
            </p>            
            <p>
                And she lives according to her measurements, just 
                <span id="properDistance" class="styledBox"></span> 
                from the event horizon of a 
                <span class="styledBox">
                    Schwarzchild black hole
                </span>, 
                whose mass is tied to her height in an elegant mathematical way. 
                The black hole is just enough massive so that at it's event horizon, 
                the gravitational gradient or tidal forces is same as they would be for a person with an height of one meter at our home planet. 
                This is so she doesn't get sphegattified. 
            </p>

            <p class="noIndent">
                As her height changes so does the mass 
                <span id="idealBHMass" class="styledBox"></span> 
                of the black hole. (try it)
            </p>
            <p> 
                Based on her current height, she is living around a black hole named 
                <span id="sdssname" class="styledBox"></span>, 
                <span class="why" style="cursor: pointer;"> 
                    (why???)
                    <span class="hiddenwhy"> 
                        (dunno) 
                    </span>
                </span> 
                that has a mass of 
                <span id="realMass" class="styledBox"></span>, 
                which is 
                <span id="diffMass"></span> 
                because universe isn't ideal.  
                <span id="sdssname2" class="styledBox"></span> 
                is located at right ascension of 
                <span id="ra" class="styledBox"></span> 
                decimal degrees and declination of 
                <span id="dec" class="styledBox"></span> 
                decimal degrees from our home planet, according to a catalogue of QSOs named
                <span class="styledBox" style="margin-right:7px;"> 
                    "SDSS dr14"
                </span>
                and has a event horizon at 
                <span id="rs" class="styledBox"></span>, 
                which is also it's schwarzchild radius.
            </p>
            <p>
            From her home planet prespective, the black hole has a 
            <span class="why" style="cursor: pointer;"> 
                    comoving distance 
                    <span class="hiddenwhy"> 
                        (distance between her home planet and the bh considering no expansion of the universe) 
                    </span>
            </span> 
             of 
            <span id="comovingDistance" class="styledBox"></span> 
            and cosmological redshift factor of 
            <span id="redshiftC" class="styledBox"></span>.
            From there, the black hole can be seen as it was when universe was 
            <span id="age" class="styledBox"></span> 
            years old, because light takes time to travel.
            </p>
            <p class="noIndent">
            But that is enough about Faye. Let's talk about Umiko.
            </p>` ,

     s7 : `<p>
                Umiko used to live with Faye but was then banned from ever coming pass any black hole
                <span class="why" style="cursor: pointer;"> 
                    (why???).
                    <span class="hiddenwhy"> 
                        (because universe is a crazy place.) 
                    </span>
                </span>
                The nearest she could get was to the point where the gravitational acceleration due to that 
                black hole is same as the gravitational acceleration on the surface of her home planet satellite, 
                (according to some texts, it was known as moongo) due to her home planet which is almost 
                <span id="gmM" class="styledBox"></span>. 
            </p>
            <p class="noIndent">
                In other words next to nothing.
            </p>
            <p>
                Based on the current Faye's BH, Faye was 
                <span id="coordR" class="styledBox"></span> 
                away from the event horizon according to Umiko measurement, meaning her radial distance from the black hole was 
                <span id="radialD" class="styledBox"></span>.
            </p>
            <p>
            Factoring in Umiko's restriction, Faye can only get as close as 
            <span id="FayaD" class="styledBox"></span> 
            from the center of the black hole, which meant they were 
            <span id="distance" class="styledBox"></span> apart.
            </p>
            <p style="justify-self:center; text-indent:0; ">
               <span style="text-align:center; border-bottom:1px dotted white; width:fit-content; justify-self:center; ">
                    Worlds apart...
                </span>
                <br>
                <span style="text-align:center; border-bottom:1px dotted white; text-indent:0; width:fit-content; justify-self:center; ">
                    but not separate ways...
                </span>
            </p> `,

     s8 : `
            <p>
                Like any good friends who have lived in the universe together long enough, they also had a contingency plan. 
                <span style="styledBox">
                    "Flash messages".
                </span>
                The method was quite simple and as long as the laws of the universe doesn't suddenly decided to go bananas, workable.
            </p>
            <p>
                The plan was to use flashes of light to send each other messages, 
                <span class="why" style="cursor: pointer;"> 
                    to communicate.
                    <span class="hiddenwhy"> 
                        (as long as one wants and try, there is always a way.) 
                    </span>
                </span>
                They agreed on the following three thingies beforehand, 
                <ul style="justify-self:center;">
                    <li>
                        <span class="why" style="cursor: pointer;"> 
                            &#955; <sub>em</sub>
                            <span class="hiddenwhy"> 
                                (Wavelength of light observed) 
                            </span>
                        </span>
                         : 
                        <span id="obs_w" class="styledBox"></span>  
                    </li>
                    <li>
                        <span class="why" style="cursor: pointer;"> 
                            t <sub> (.) </sub>
                            <span class="hiddenwhy"> 
                                (Duration of a single Dot) 
                            </span>
                        </span>  
                         : 
                        <span id="t_do" class="styledBox"></span>
                    </li>
                    <li>
                        <span class="why" style="cursor: pointer;"> 
                            t <sub> (-) </sub>
                            <span class="hiddenwhy"> 
                                (Duration of a single Dash) 
                            </span>
                        </span>  
                         : 
                     <span id="t_da" class="styledBox"></span>
                    </li>
                </ul>
            </p>
            <p style="noIndent">
                But when did universe ever made things easy for anyone? 
            </p>
            <p>
                Due to the gravitational redshift factor of 
                <span id="z_g" class="styledBox"></span>, 
                in order for Faye to observe 
                <span id="obs_w2" class="styledBox"></span>, 
                Umiko will have to use the light of wavelength 
                <span id="em_b" class="styledBox"></span> 
                because it will get blueshift and will be 
                <span id="obs_w3" class="styledBox"></span> 
                when it reached Faye. in case of Faye, she will have to use 
                <span id="em_a" class="styledBox"></span> 
                because it will get redshift thanks to GR.
            </p>
            <p>
                If this was not enough, for dot and dash to be 
                <span id="t_do1" class="styledBox"></span> 
                and 
                <span id="t_da1" class="styledBox"></span> 
                for Faye, Umiko would have to use durations of dot and dashes of 
                <span id="t_oB" class="styledBox"></span> 
                and 
                <span id="t_daB" class="styledBox"></span> 
                because gravitational time dilation is a thing. 
                On the other hand, Faye would have to make her flash durations insanely small as 
                <span id="t_oA" class="styledBox"></span> 
                and 
                <span id="t_daA" class="styledBox"></span>
                for it to be same as they agreed.
            </p>
            <p style="noIndent"> 
            From Umiko point of view, each message would take 
            <span id="sig_tr_time" class="styledBox"></span> 
            or 
            <span id="sig_tr_timely" class="styledBox"></span> 
            to reach and receive. (so much for that)
            </p>`,

     s9 : ` <p style="justify-self:center; text-align:center; text-indent:0;">
            and, that was the thought experiment.
            <br>
                <span class="why" style="cursor: pointer;"> 
                    what it meant and was meant to represent?
                    <span class="hiddenwhy" style="top:0; left:0; justify-self:center;"> 
                        (ask the cat) 
                    </span>
                </span>
            </p>`
            ,

     s10 : `<p>
                Based on this, to grasp the full reality of their situation and 
                how something as simple and taken for granted, 
                like talking can be complex and crazy because of how the universe works, 
                this site further allows you to send messages, 
                acting as Umiko and Faye all by yourself, 
                that will on the outside, go immediately, but if you read the message timing, 
                it will become cleared to you (which only takes in to account the composing time). 
                Also the message will be in morse, which on
                <span class="why" style="cursor: pointer;"> 
                    hover.
                    <span class="hiddenwhy" style=" top:70%; left:30%; justify-self:center;"> 
                        (or hold will decode it back to english),
                    </span>
                </span>
                </p>
                <p class="noIndent">
                    (Just to show the absurdity of it all...)
                </p>`,
     s11 : `so...
            <br>
            <button class="fallbtn" onclick="closePopup()">
                Let's fall!
            </button>`
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
}

var now = new Date().getTime();

function toMorse() {
    messageCount += 1;
    var quantitiesM = l[0];

    msg = myInput.value;
    if (msg.length === 0){
        alert("type something you idiot")
    }else{
        morse = morjs.encode(msg);
        var chrDic = charCount(morse);
        if (i === 1){
            ctime = math.evaluate('(dots * dur_dot_A) + (spc * dur_dot_A) + (dashes * dur_dash_A) to s', {dots: chrDic.dot, spc: chrDic.spc, dashes: chrDic.dash, dur_dot_A:quantitiesM.dur_dot_A, dur_dash_A: quantitiesM.dur_dash_A});
            inputLabel.innerHTML = 'Umiko';
            i = 0;
        }else if(i === 0){
            ctime = math.evaluate('(dots * dur_dot_B) + (spc * dur_dot_B) + (dashes * dur_dash_B) to s', {dots: chrDic.dot, spc: chrDic.spc, dashes: chrDic.dash, dur_dot_B:quantitiesM.dur_dot_B, dur_dash_B: quantitiesM.dur_dash_B});
            inputLabel.innerHTML = 'Faye';
            i = 1;
        }
        
        var ct = now + ctime.toNumber('milliseconds');
        var rt = ct + quantitiesM.sig_tra_time.toNumber('milliseconds')
        console.log(rt);
        newDiv(morse, msg, ct, rt);
        now = ct;
        myInput.value = '';
        output.scrollTop = output.scrollHeight; 
        
    }
    
}

function unitConvert(magnitude, units, bhMass, bhName, bhName2, redshift) {
    var h_in_meters = math.evaluate('(quantity) to meters ' , {quantity: math.unit(magnitude.value, units.value)});
    
    var massIdeal = math.evaluate('(c^3 / (2 * G) * sqrt(h / dg)) to solMass', { c: math.speedOfLight, G: math.gravitationConstant, h: h_in_meters, dg: math.unit(3.0723e-6, 'm/s^2') });

    bhMass.innerHTML = math.format(massIdeal.toNumber(), 3)  + ' M<sub>&#9737;</sub> '   

    var bhJSON = JSON.parse(data);
    var massArray = bhJSON.Mass;

    var massUsed = closestMass(massIdeal.toNumber(), massArray);
    var quantities = calculations(h_in_meters, math.unit(massUsed, 'solMass'));
    l.push(quantities);

    realMass.innerHTML = math.format(massUsed, 3) + ' M<sub>&#9737;</sub> ';
    var i = Object.values(massArray).indexOf(massUsed);

    var diff = massIdeal.toNumber() - massUsed;

    if (diff > 0) {
    diffMass.innerHTML = '<span class="styledBox">' +math.format(diff, 3) + ' M<sub>&#9737;</sub> </span>' + ' larger than the ideal mass.';
    } else {
    diffMass.innerHTML = '<span class="styledBox">' +math.format(-diff, 3) + ' M<sub>&#9737;</sub>  </span>' + ' smaller than the ideal mass.';
    }

    var massRow = {};

    for (var key in bhJSON) {
    if (bhJSON.hasOwnProperty(key) && bhJSON[key].hasOwnProperty(i)) {
        massRow[key]= bhJSON[key][i];
    }
    }
    
    properDistance.innerHTML = quantities.prop_r
    bhName.innerHTML ='SDSS ID ' + massRow.SDSS_Name;
    bhName2.innerHTML ='SDSS ID ' + massRow.SDSS_Name;
    ra.innerHTML = parseFloat(massRow.RA).toFixed(6);
    dec.innerHTML = parseFloat(massRow.DEC).toFixed(6);
    redshift.innerHTML = massRow.z;
    comovingDistance.innerHTML = math.format(massRow['co-d'], 3) + ' light years';
    age.innerHTML = parseFloat(massRow['age_of_un']).toFixed(3) + ' billion years';
    rs.innerHTML = quantities.rs.format(3);

}

function newDiv(morse, msg, ctime, rtime){
    const newDiv = document.createElement('p');
    newDiv.classList.add('message-text', 'morse');
    newDiv.id = 'text';
    newDiv.textContent = morse;
    
    newDiv.onmouseover = function(){
        newDiv.innerText = msg;
    }

    newDiv.onmouseout = function(){
        newDiv.innerText = morse;
        newDiv.appendChild(timeInfo)
    }

    if (i ===0){
        newDiv.classList.add('user-message');
        newDiv.style.textAlign = 'right';
        send.style.color = 'black';
    }else if(i ===1){
        newDiv.classList.add('other-message');
        newDiv.style.textAlign = 'left';
        send.style.color = 'blue';
    }

    const timeInfo = document.createElement('p');
    timeInfo.id = 'timeInfo';
    timeInfo.classList.add('smallText');
    
    timeInfo.textContent = 'Composed at: ' + new Date(ctime).toString().split('GMT')[0];
    // timeInfo.innerHTML += " <br> sent at " + new Date(rtime).toString().split('GMT')[0];
    

    newDiv.appendChild(timeInfo)
    output.appendChild(newDiv);
    
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

function slide6change(){
        
    const units = document.getElementById('units');
    const magnitude = document.getElementById('height');
    const minMaxunit = document.getElementById('minMaxunit');
    const properDistance = document.getElementById('properDistance');

    const diffMass = document.getElementById('diffMass');
    const bhMass = document.getElementById('idealBHMass');
    const realMass = document.getElementById('realMass');
    const ra = document.getElementById('ra');
    const dec = document.getElementById('dec');
    const redshift = document.getElementById('redshiftC');
    const comovingDistance = document.getElementById('comovingDistance');
    const age = document.getElementById('age');
    const bhName = document.getElementById('sdssname');
    const bhName2 = document.getElementById('sdssname2');
    const rsB = document.getElementById('rs')


    unitConvert(magnitude, units, bhMass, bhName, bhName2, redshift);

    units.addEventListener('change', () => {
        magnitude.min = eval(range[units.value].min);
        magnitude.max = eval(range[units.value].max);
        magnitude.value = magnitude.min; 
        minMaxunit.innerHTML = range[units.value].min + ' to ' + range[units.value].max + ' ' + units.value
        unitConvert(magnitude, units, bhMass, bhName, bhName2, redshift);
    });

    magnitude.addEventListener('change', () => {
        unitConvert(magnitude, units, bhMass, bhName, bhName2, redshift);
    });
}

function slide7change(){
    var quantities7 = l[0];

    document.getElementById('gmM').innerHTML = quantities7.g_me.format(3);
    document.getElementById('coordR').innerHTML = quantities7.coord_r.format(3);
    document.getElementById('radialD').innerHTML = quantities7.r.format(3);
    document.getElementById('FayaD').innerHTML = quantities7.D.format(3);
    document.getElementById('distance').innerHTML = quantities7.d.format(3);
    
}

function slide8change(){
    var quantities8 = l[0];
    document.getElementById('obs_w').innerHTML = quantities8.obs_w.format(3);
    document.getElementById('obs_w3').innerHTML = quantities8.obs_w.format(3) ;
    document.getElementById('obs_w2').innerHTML = quantities8.obs_w.format(3) ;
    document.getElementById('t_do').innerHTML = quantities8.dur_dot.format(3);
    document.getElementById('t_do1').innerHTML = quantities8.dur_dot.format(3) ;
    document.getElementById('t_da').innerHTML = quantities8.dur_dash.format(3) ;
    document.getElementById('t_da1').innerHTML = quantities8.dur_dash.format(3) ;
    document.getElementById('z_g').innerHTML = parseFloat(quantities8.z).toExponential(2) ;
    document.getElementById('em_b').innerHTML = quantities8.em_wB.format(3) ;
    document.getElementById('em_a').innerHTML = quantities8.em_wA.format(3) ;
    document.getElementById('t_oB').innerHTML = quantities8.dur_dot_B.format(3) ;
    document.getElementById('t_daB').innerHTML = quantities8.dur_dash_B.format(3) ;
    document.getElementById('t_oA').innerHTML = quantities8.dur_dot_A.format(3) ;
    document.getElementById('t_daA').innerHTML = quantities8.dur_dot_B.format(3) ;
    document.getElementById('sig_tr_time').innerHTML = quantities8.sig_tra_time.format(3);
    document.getElementById('sig_tr_timely').innerHTML = quantities8.sig_tra_time.to('TrillionYears').format(3);
}

function closePopup(){
    if (pageNo <5){
            myPopup.display = "none"
            myPopup.innerHTML = a[5];
            slide6change()
        }
      
    popup.style.display = "none";
    input.style.display = "block";
    titlebar.style.display = "block";
    output.style.display = "flex"
}

function openPopup(){
    
    pageNo = 0;
    myPopup.innerHTML = a[0];     
    pageNum.innerHTML = '1/11';

    popup.style.display = "block";
    input.style.display = "none";
    titlebar.style.display = "none";
    output.style.display = "none"

}

function back(){
    if(pageNo > 1){
        pageNo -= 1;
        pageNum.innerHTML = pageNo+'/11';
        myPopup.innerHTML = a[pageNo-1];

        if(pageNo >5 && pageNo <9){
            eval('slide'+pageNo+'change()');   
            if (pageNo === 6 || pageNo === 8){
                myPopup.style.lineHeight = 2;
            }else{
                myPopup.style.lineHeight = 1.7;
            }
    }
        if (longPages.includes(pageNo)){
            myPopup.style.textIndent = '4em';
            myPopup.style.textAlign = 'justify'
        }else {
            myPopup.style.textIndent = '0';
            myPopup.style.textAlign = 'center'
        }
    }
}

function forward(){

    if (pageNo <12){
        pageNo += 1;
        pageNum.innerHTML = pageNo +'/11';
        myPopup.innerHTML = a[pageNo-1];

        if(pageNo >5 && pageNo <9){
            eval('slide'+pageNo+'change()');
            if (pageNo === 6 || pageNo === 8){
                myPopup.style.lineHeight = 2;
            }else{
                myPopup.style.lineHeight = 1.7;
            }
        } else if (pageNo > 11){
            closePopup();
        }
        if (longPages.includes(pageNo)){
            myPopup.style.textIndent = '4em';
            myPopup.style.textAlign = 'justify'
        }else{
            myPopup.style.textIndent = '0';
            myPopup.style.textAlign = 'center'
        }
    }
}

document.addEventListener("keydown", function(event){
    if (event.key === "ArrowRight" || event.key === "PgUp"){
        forwardB.click();
    }else if (event.key === "ArrowLeft" || event.key === "PgDn"){
        backB.click();
    }else if (event.key === "Delete"){
        closeB.click();
    }
});

infoB.addEventListener('mouseover', ()=> {
    infoC.style.display = 'block'
})

infoB.addEventListener('mouseleave', ()=> {
    setTimeout(()=>{
        infoC.style.display = 'none'
    }, 7000)
})

infoC.addEventListener('mouseleave', ()=> {
    infoC.style.display = 'none'
})

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
