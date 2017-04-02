var r_url = inputs.url;
let r = [];
var user_id = {{get_user_data.user_id}};
var mx_score ;

function search_user(user_id) {

  var opts = {
    method: 'GET',
    url: r_url + user_id,
    headers: {
      "Content-type": "application/json",
    }
  }

  utils.request(opts, function(err, res, body) {
    callback(err, res, body);
  }).auth('elastic', 'EzKLeeKMmLKjqlvDURb6QRbc', false);

}

function callback(error, response, body) {

  if (response.statusCode == 200) {
    r = JSON.parse(body);
 
   if (r.hits.total >= 1) {
      if (r.hits.max_score == 1) {
        resolve(r.hits.hits[0]._id);
      } else {
        resolve(false);
      }
    } else {
      resolve(false);
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

search_user(user_id);
