var intent = inputs.intent_data;
try {
  intent = JSON.parse(intent)
  if (intent.intentId) { 
  resolve(intent.intentId);
  }else {
    resolve(false)
  }
}
catch(err) {
    resolve(false)
}