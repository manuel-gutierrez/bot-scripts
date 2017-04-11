const r_url = inputs.url
let request_body = {"doc": {"last_session" : inputs.session_id}}; 
let update_request


function update_user(request_body) {

  var opts = {
    method: 'POST',
    url: r_url,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(request_body)
  }

  update_request = new Promise(function(resolve,reject) {
    utils.request(opts, function(err, res, body) {
     if (!err) {
      resolve(body)
     } else {
      reject(err)
     }
    }).auth('elastic', 'EzKLeeKMmLKjqlvDURb6QRbc', false) 
  })
}

update_user(request_body)
update_request.then((val) => resolve(val))  
.catch((err) => resolve(err));