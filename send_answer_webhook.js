var url = inputs.url;
var answer = inputs.message; 
answer = answer.replace(/<(?:.|\n)*?>/gm, '');
var ms = {
  "text" : answer
}

//-- Callback --
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {     
        send_typing_off() ;
        resolve(true);
 } 

if (response.statusCode != 200) {
   send_typing_off(); 
   var e ={"error":response.statusCode ,"body": body } ;
   resolve(e);
  }


}


//-- Send Message --
function send_message(ms) {


 var opts = {
       method: 'POST',
       url: url,
       headers : {"Content-type": "application/json"},
       body : JSON.stringify ( {"recipient": { "id" : inputs.user }, "message" : ms } )
    }
 
  utils.request(opts,  function (err, res, body) {
     callback (err, res, body);
   });

}

//-- Send Typing On --
function send_typing_on() {

 var opts = {
       method: 'POST',
       url: url,
       headers : {"Content-type": "application/json"},
       body : JSON.stringify ( {"recipient": { "id" : inputs.user }, "sender_action":"typing_on" } )
    }

  utils.request(opts,  function (err, res, body) {
     // do somenthing here, still not  clear what to do.
   });

}

//-- Send Typing Off --
function send_typing_off() {

 var opts = {
       method: 'POST',
       url: url,
       headers : {"Content-type": "application/json"},
       body : JSON.stringify ( {"recipient": { "id" : inputs.user }, "sender_action":"typing_off" } )
    }

     utils.request(opts,  function (err, res, body) {
     // do somenthing here, still not  clear what to do.
   });

}

send_typing_on() ;
send_message(ms);
send_typing_off() ;
