var r_url = inputs.url;
let r =[];
var request_body = {"doc": {"last_session" : inputs.session_id}}; 



function update_user(request_body) {

  var opts = {
    method: 'POST',
    url: r_url,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(request_body)
  }

  utils.request(opts, function(err, res, body) {
    callback(err, res, body);
  }).auth('elastic', 'EzKLeeKMmLKjqlvDURb6QRbc', false);

}

function callback(error, response, body) {
  r =  JSON.parse(body);
  if (response.statusCode == 200) {
    if (r.result == "updated" || r.result == "noop" ) { 
      resolve(true);
    } else  {
      var e = {
      "result" : "false",
      "error": r.result+"--"+response.statusCode,
      "body": body
      };
      resolve(e);
    }
    
  }


if (response.statusCode != 200) {

  var e = {
    "error": response.statusCode,
    "body": body
  };
  resolve(e);
 }
}

update_user(request_body);
