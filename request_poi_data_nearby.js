var query = inputs.query;
var offset = inputs.offset;
var location = JSON.parse(inputs.location);
var user_long = location.long;
var user_lat  = location.lat;
var user_floor = inputs.floor;


function get_poi_data(user_long,user_lat,user_floor, query, offset) {

  var opts = {
    method: 'GET',
    url: "https://concierge.airportdigital.com/wp-json/content/v1/poi/den/search/"+query+"?sort=distance&lat="+user_lat+"&lng="+user_long+"&floor="+user_floor+"&offset="+offset
  }
  

  utils.request(opts, function(err, res, body) {
     callback(err, res, body);
  });

}

function callback(error, response, body) {
 
  if (response.statusCode == 200) {
    var r = JSON.parse(body);
    resolve(r);
  }

  if (response.statusCode != 200) {

    var e = {
      "error": response.statusCode,
      "body": body
    };
    resolve(e);
  }
}


get_poi_data(query,offset);




