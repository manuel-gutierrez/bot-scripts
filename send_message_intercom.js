var user_id = inputs.user_id;
var user_platform_id = inputs.platform_id;
var close_conversation_body = { "admin_id": 1048582, "message_type": "close", "body": "Conversation Closed by the user", "type": "admin"}
close_conversation_body = JSON.stringify(close_conversation_body);


function get_last_conversation_id(user_id, user_platform_id) {

  var opts = {
    method: 'GET',
    url: "https://api.intercom.io/conversations?type=user&user_id="+user_platform_id+"::"+user_id,
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json",
      "Authorization" : "Bearer dG9rOjViZTVmZDJlX2JkNjBfNDBlYl85OTFjXzZmOGQ5NzJlZWJjNzoxOjA="
    }
  }


  utils.request(opts, function(err, res, body) {
     last_conversation_callback(err, res, body);
  });

}

function last_conversation_callback(error, response, body) {
  
  if (response.statusCode == 200) {
    var r = JSON.parse(body);
    close_conversation(r.conversations[0].id);
  }

  if (response.statusCode != 200) {

    var e = {
      "error": response.statusCode,
      "body": body
    };
    resolve(e);
  }
}

function close_conversation(conversation_id) {

  var opts = {
    method: 'POST',
    url: "https://api.intercom.io/conversations/"+conversation_id+"/reply",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json",
      "Authorization" : "Bearer dG9rOjViZTVmZDJlX2JkNjBfNDBlYl85OTFjXzZmOGQ5NzJlZWJjNzoxOjA="
    }, 
    body: close_conversation_body
  }
  utils.request(opts, function(err, res, body) {
    close_conversation_callback(err, res, body);
  });
}

function close_conversation_callback(error, response, body) {

  if (response.statusCode == 200) {
    var r = JSON.parse(body);
    resolve (r)
  }

  if (response.statusCode != 200) {

    var e = {
      "error": response.statusCode,
      "body": body
    };
    resolve(e);
  }
}

get_last_conversation_id(user_id, user_platform_id);




