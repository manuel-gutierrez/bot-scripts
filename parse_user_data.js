var user_data 
var user_exists = inputs.user_exists;
var session = "2f3d9564-c25a-4303-a0ea-3f4793436db7";

if (user_exists == "false") {
       
	user_data = {
		"user_first_name": "{{get_user_data.user_first_name}}", 
		"user_last_name": "{{get_user_data.user_last_name}}",
		"profile_pic": "{{request_user_data.data__profile_pic}}" ,
		"locale": "{{request_user_data.data__locale}}",
		"user_timezone":"{{request_user_data.data__timezone}}",
		"gender": "{{request_user_data.data__gender}}",
		"user_id": "{{get_user_data.user_id}}",
		"bot_language": "en",
		"bot_platform": "facebook",
		"bot_app": "DEN", 
		"country" : "",
		"first_session" : session,
		"last_session" : session, 
		"creation_timestamp" : ""
	}


	// get country from the locale data
	var c = user_data.locale.split("_");
	user_data.country =  c[1];


	//get time stamp

	var timestamp = Date.now();
	var ts = new Date(timestamp).toISOString();
	user_data.creation_timestamp = ts;


	resolve(user_data);

} else {

	user_data = {
		"profile_pic": "{{request_user_data.data__profile_pic}}" ,
		"locale": "{{request_user_data.data__locale}}",
		"user_timezone":"{{request_user_data.data__timezone}}",
		"bot_language": "en",
		"bot_platform": "facebook",
		"bot_app": "DEN", 
		"last_session" : session, 
	};
    
    // get country from the locale data
	var c = user_data.locale.split("_");
	user_data.country =  c[1];

	resolve(user_data);
}

