var check  ;
var result = false;
var c; 

//test outside
//var user_lat = -104.9909364;
//var user_long = 39.7531799;

//test c
//var user_lat = -104.673697;
//var user_long = 39.863123;

//test b
//var user_lat = -104.6739706;
//var user_long = 39.8592143 39.853854919;


//test a
var user_long = -104.67321592794;
var user_lat = 39.853896275439;
{"long": {{location_recieved.metadata__long}}, "lat": {{location_recieved.metadata__lat}}}
// test main
 // var user_long = -104.6741561;
 // var user_lat = 39.8487904;


var user_lat = inputs.lat;
var user_long = inputs.long;


let c_m = [];
c_m["l" ]= -104.681971; // Main left Latitude
c_m["r"] = -104.664514; // Main right Latitude
c_m["t"] = 39.852764 ; // Main top   Longitude 
c_m["b"] = 39.845681;  // Main bottom Longitude

let c_a =  [];
c_a["l"] = -104.681971; // Concourse A  left   Latitude
c_a["r"] = -104.664514; // Concourse A  right  Latitude
c_a["t"] = 39.856410 ;  // Concourse A  top    Longitude 
c_a["b"] = 39.852765 ;  // Concourse A  bottom Longitude


let c_b = [];
c_b["l"] = -104.681971; // Concourse B left   Latitude
c_b["r"] = -104.664514; // Concourse B rigth  Latitude
c_b["t"] = 39.861011;   // Concourse B top    Longitude 
c_b["b"] = 39.856411;   // Concourse B bottom Longitude


let c_c = [];
c_c["l"] = -104.681971; // Concourse C left   Latitude
c_c["r"] = -104.664514; // Concourse C right  Latitude
c_c["t"]= 39.864668; // Concourse C top    Longitude 
c_c["b"] = 39.861010; // Concourse C bottom Longitude
 

let concourse = [c_a, c_b, c_c,c_m];
let concourse_name  = ["concourse_a","concourse_b","concourse_c","terminal"] ;

function is_inside(cord, user_lat, user_long,index) {
  
  var lat = false;
  var lon = false;

  // console.log("comparing..");
  // console.log("left : "+cord["l"]+" right: "+cord["r"]+" usr: "+user_lat);
  // console.log("bottom : "+cord["b"]+" top : "+cord["t"]+" usr: "+user_long);


  if ((cord["b"] < user_lat ) && (user_lat < cord["t"])){
    lat = true;
    // console.log("left : "+cord["l"]+" right: "+cord["r"]+" usr: "+user_lat);
  };

  if ((cord["l"] < user_long) && ( user_long < cord["r"])) {
    lon = true;
    // console.log("bottom : "+cord["b"]+" top : "+cord["t"]+" usr: "+user_long);
  };
  
  if (lon && lat) {
    return true;
  } else {
    return false;
  }
 
  // console.log("user_long: "+Math.abs(user_long)+"---"+"bottom,:"+Math.abs(cord["b"]));
  // console.log("user_long: "+Math.abs(user_long)+"---"+"top:"+Math.abs(cord["t"]));
  // console.log("index: "+index+"=>"lat + "--" + lon);



}
  function check_location(user_lat,user_long) {
    var index = 0; 
    
      concourse.forEach(function(element) {
      //console.log(element);
      check = is_inside(element,user_lat,user_long,index)
      //console.log(check);
      if (check) {
        result = concourse_name[index];
        //console.log("result: "+result);
      }
      index++;
    });
    if (result){
    return result
    } else {
    return false
    }
    
  }

resolve(check_location(user_lat,user_long));
