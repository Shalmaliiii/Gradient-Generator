var bss = document.querySelector(".zero");
var css = document.querySelector(".first");
var dss = document.querySelector(".second");
var ess = document.querySelector(".third");
var fss = document.querySelector(".fourth");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var color3 = document.querySelector(".color3");
var body = document.getElementById("gradient");

function hexToRGBA(hex, opacity) {
    return 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }).join(',') + ')';
}

function getContrastYIQ(hexcolor){
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}

function init(color) { 
    document.getElementById("gradient").style.color = color;
}

function hexToHSL(hex,flag) {
    hex = hex.replace(/#/g, '');
    if (hex.length === 3) {
        hex = hex.split('').map(function (hex) {
            return hex + hex;
        }).join('');
    }
    var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
    if (!result) {
        return null;
    }
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
    }
    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);
    var str = "(" + h.toString() + "," + s.toString() + "%" +  "," + l.toString() +  "%)";
    if(flag===1) return str;
    else return l;
}

function setGradient() {
    // init(getContrastYIQ(color2.value));
	body.style.background = "linear-gradient(to right," + color1.value + "," + color2.value + ","+ color3.value +")";
    bss.textContent = "COLOR CODES: ";
    css.textContent =  "HEX values : " ;
    css.textContent +=  color1.value  + " , " + color2.value + " , " + color3.value;
    dss.textContent = "HSL values :  ";
    dss.textContent += hexToHSL(color1.value,1) + "," + hexToHSL(color2.value,1) + "," +hexToHSL(color3.value,1);
    ess.textContent = "RGB values :  ";
    ess.textContent += hexToRGBA(color1.value) + ", " + hexToRGBA(color2.value) + ", " +hexToRGBA(color3.value);
    fss.textContent = "CSS :" + body.style.background + ";";
    body.style.color = "blue";

}

color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
color3.addEventListener("input", setGradient);

