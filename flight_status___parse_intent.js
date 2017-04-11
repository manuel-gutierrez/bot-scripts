var intent = inputs.intent_data;
try {
  intent = JSON.parse(intent)
  if (intent.parameters) { 
    if (intent.parameters.flight_number) {
      intent.parameters.flight_number = intent.parameters.flight_number.replace(/\s+/g, '')
    }
  resolve(intent.parameters);
  }else {
    resolve(false)
  }
}
catch(err) {
    resolve(false)
}