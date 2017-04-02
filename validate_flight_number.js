var flight_data = inputs.paramerters

try	{
	return resolve(JSON.parse(fight_data));
}
catch(e) {
	return resolve({"error": "Invalid JSON Input", "code":"500"}) 
}

