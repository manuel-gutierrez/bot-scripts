var url = "https://graph.facebook.com/v2.6/me/messages?access_token=EAAQCVOZCNq3oBAGo0Lr3CehnBNwPlq8sndJAUVcDnAC10J5HqEzMmrHCz255H8ZBA0ARR7rG3p7s0k260CMZCdxtHQeCCkpeFDkw7ErB5xIVCQRAB1MiBXerGSIO8dfdMwzjoU84HMjdPByLIAjVAB1XMZA5AqEjfxYOMEd0dQZDZD"
var mark_seen_request
var typing_on_request
var mark_seen_request_finished = false 
var typing_on_request_finished = false 

function mark_seen() {
 var opts = {
       method: 'POST',
       url: url,
       headers : {"Content-type": "application/json"},
       body : JSON.stringify ( {"recipient": { "id" : inputs.user }, "sender_action":"mark_seen" } )
    }
  mark_seen_request = new Promise(function(resolve,reject) {
    utils.request(opts,  function (err, res, body) { 
      if (err) {
        reject(body)
      } else {
        resolve(body)
      }
    });
  }) 
  
}


function send_typing_on() {

 var opts = {
       method: 'POST',
       url: url,
       headers : {"Content-type": "application/json"},
       body : JSON.stringify ( {"recipient": { "id" : inputs.user }, "sender_action":"typing_on" } )
    }

  typing_on_request = new Promise(function(resolve,reject) {
    utils.request(opts,  function (err, res, body) { 
      if (err) {
        reject(body)
      } else {
        resolve(body)
      }
    });
  }) 
}
function is_finished() {
  if (mark_seen_request_finished  && typing_on_request_finished) {
   return(true)
  } 
}


mark_seen()
send_typing_on()

mark_seen_request.then(function (result) {
  mark_seen_request_finished = true
  if (is_finished()) {resolve(true)}
})
.catch(
  function(err) {
  reject(err)
})

typing_on_request.then(function (result) {
  typing_on_request_finished = true
  if (is_finished()) {resolve(true)}
})
.catch(
  function(err) {
  reject(err)
})