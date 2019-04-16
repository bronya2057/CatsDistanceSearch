define(function (require) {
// the location we want to GeoCode
var location = 'London';

// we are using MapQuest's Nominatim service
    var geocode = 'http://open.mapquestapi.com/geocoding/v1/address?key=lHHNEKDKrxdz6C69C9A3BuRKQ0VtNN87&location=Washington,DC'
    
    httpGetAsync(geocode, onGeoCodeRecieved);
    
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var messages = require('./messages');
    
    //Load library from LIB
    var geo = require('geolib')
    
    //DISTANCE example
    var dist = geo.getDistance(
    {latitude: 51.5103, longitude: 7.49347},
    {latitude: "51° 31' N", longitude: "7° 28' E"}
    );
    
    var convertedToMi = geo.convertUnit("mi", dist, 4);
    
    console.log("Meters: " + dist + " MI: " + convertedToMi)
    
    console.log(dist);
    
    //LOGIC
    var rootEl = document.documentElement;
    var el = findFirstChildByClass(rootEl, "address-line")
    console.log(el);
    
    var children = el.children;
    for (var i = 0; i < children.length; i++) {
      var tableChild = children[i];
    
      const re1 = new RegExp('/(A-Z)/g')
      console.log(tableChild.textContent.replace(/[ \n]/g, ""));//Replace newline chars and spaces if needed
    }
    
    document.body.onmouseover = document.body.onmouseout = handler;
    
});

function handler(event) {

  function str(el) {
    if (!el) return "null"
    return el.className || el.tagName;
  }

//var log = ""
//  log += event.type + ': ' +
//    'target=' + str(event.target) +
//    ', relatedTarget=' + str(event.relatedTarget) + "\n";
//    console.log(log);
//  log = log.scrollHeight;
//    console.log(log);
    if (str(event.target == "td"))
    {
            console.log(event);
            //console.log(event.path)
        
        var pathArray = event.path;
        console.log(pathArray);
//        var arraycontainsturtles = (pathArray.indexOf("td") > -1);
//        console.log(arraycontainsturtles);
        
        var found = false;
        for(var i = 0; i < pathArray.length; i++) {
            if (pathArray[i].nodeName == "TD")
                {
                    found = true;
                    console.log(pathArray[i].dataset)
                    var DOMStringMap = pathArray[i].dataset;
                    console.log(DOMStringMap.datagrid);
                    
                    if ('{"columnID":"location"}' == DOMStringMap.datagrid)
                        {
                            console.log("FOUND"); //HERE we found the NODE TD with DATAGRID == location
                        }
                }
            
//            if (pathArray[i].Name == 'Magenic') {
//                
//                break;
//            }
        }
    }



  if (event.type == 'mouseover') {
    event.target.style.background = 'pink'
  }
  if (event.type == 'mouseout') {
    event.target.style.background = ''
  }
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function onGeoCodeRecieved(text)
{
    console.log(text);
}

function findFirstChildByClass(element, className) {
        var foundElement = null, found;
        function recurse(element, className, found) {
            for (var i = 0; i < element.childNodes.length && !found; i++) {
                var el = element.childNodes[i];
                var classes = el.className != undefined? el.className.split(" ") : [];
                for (var j = 0, jl = classes.length; j < jl; j++) {
                    if (classes[j] == className) {
                        found = true;
                        foundElement = element.childNodes[i];
                        break;
                    }
                }
                if(found)
                    break;
                recurse(element.childNodes[i], className, found);
            }
        }
        recurse(element, className, false);
        return foundElement;
    }