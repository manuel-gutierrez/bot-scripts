var inent = inputs.intent_data;
var parameters

try {
  intent = JSON.parse(intent)
  if (intent.parameters.poi_desc ) {
  parameters = intent.parameters.poi_desc    
  resolve(parameters.trim());
  }else {
    resolve(false)
  }
}
catch(err) {
    resolve(false)
}