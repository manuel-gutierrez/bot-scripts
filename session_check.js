
var session_id ; 
var session_date ;
var session_url; 
var elastic_endpoint; 
var user_id ; 


// ----- callbacks ----- // 

// http callback  // 

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
       // Handle success
  } 

if (response.statusCode != 200) {
   send_typing_off(); 
   var e ={"error":response.statusCode ,"body": body } ;
   resolve(e);
   // Handle error
  }
}

// ----- functions ----- // 

// get request

function get_request(r_url) {

 var opts = {
       method: 'GET',
       url: r_url,
       headers : {"Content-type": "application/json"}
       auth: {
              'user': 'ec',
              'pass': 'perps28\Toco',
              'sendImmediately': false
            }
  }
 
  utils.request(opts,  function (err, res, body) {
     callback (err, res, body);
   });

}
// post request
function post_request(r_url,r_body) {

 var opts = {
       method: 'POST',
       url: r_url,
       headers : {"Content-type": "application/json"},
       body : JSON.stringify ( r_body )
    }
 
  utils.request(opts,  function (err, res, body) {
     callback (err, res, body);
   });

}

// get session from elastic search request

function get_session (user_id) {

}
// Compare sessions 

var now_timestamp = Date.now();
var last_session_timestamp = now_timestamp - 3600000;
var hourDiff = now_timestamp - last_session_timestamp;
var diffHrs = Math.floor((hourDiff % 86400000) / 3600000);
var s = new Date(last_session_timestamp).toISOString();
var e = Date.parse(s)

function update_session(session_id) {

}

// Create a new session and update or Stay with the same. 


// Resolve session


var now_timestamp = Date.now();
var last_session_timestamp ; 
var diff; 
var diff_in_hrs;  

// Review if there is a session stored
if ({{main_flow_catch_all.attributes__session_timestamp}}) {
 last_session_timestamp = {{main_flow_catch_all.attributes__session_timestamp}}
 diff =   now_timestamp - last_session_timestamp;
 diff_in_hrs = Math.floor((diff % 86400000) / 3600000);
 
} else {
  return false; 
}

 // Return false if session needs to be updated true to continue.
if (diff_in_hrs >= 1) {
  return false
} else {
  return true
}


