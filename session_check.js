var session_timestamp = inputs.session_timestamp;

function create_session() {
  var session ; 
  // UUID v4 generation. Based on https://gist.github.com/jed/982883 

  function b(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)}
  session = {"session_id" : b(), "session_timestamp" : Date.now() };
  return(session);
}

function is_session_expired(session_timestamp) {  
  var now_timestamp = Date.now();
  var last_session_timestamp ; 
  var diff; 
  var diff_in_hrs; 
  var session_live = 1; // 1 hour

  // review and compare time difference
  if (session_timestamp) {
   diff = now_timestamp -  session_timestamp;
   diff_in_hrs = Math.floor((diff % 86400000) / 3600000);
   if (diff_in_hrs < session_live) {
     return false 
   } else {
     return true;
   }
  } else {
    return(false); 
  }
}

if (is_session_expired(session_timestamp)) {
  resolve(create_session());
} else
{
  resolve(false);
}