var query = inputs.query;
var offset = inputs.offset;


function get_poi_data(query, offset) {

  var opts = {
    method: 'GET',
    url: "https://concierge.airportdigital.com/wp-json/content/v1/poi/den/search/"+query+"?sort=all&offset="+offset
  }


  utils.request(opts, function(err, res, body) {
     callback(err, res, body);
  });

}

function callback(error, response, body) { 
  
  if (response.statusCode == 200) {
    var r = JSON.parse(body);
    var data = { 
      "message" : r, 
      "load_more" : response.headers["x-wp-remaining-results"]
    } 
    resolve(data);
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




