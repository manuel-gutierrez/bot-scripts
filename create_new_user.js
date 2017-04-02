var r_url = inputs.url;
var user_data = inputs.data;
let r =[];

function create_user(user_data) {

  var opts = {
    method: 'POST',
    url: r_url,
    headers: {
      "Content-type": "application/json",
    },
    body: user_data
  }

  utils.request(opts, function(err, res, body) {
    callback(err, res, body);
  }).auth('elastic', 'EzKLeeKMmLKjqlvDURb6QRbc', false);

}

function callback(error, response, body) {

  if (response.statusCode == 201) {
    r = JSON.parse(body);
    resolve(r._id);
  }


if (response.statusCode != 200) {

  var e = {
    "result" : "false",
    "error": response.statusCode,
    "body": body
  };
  resolve(e);
 }
}

create_user(user_data);
