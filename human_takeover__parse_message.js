var data = inputs.data
try {
  data = JSON.parse(data)
  resolve (return_message(data))
}
catch(err) {
	resolve(false)
}

function return_message(data) {
  var _case = ""
  if (data.intent_data !== undefined) {
    _case = "intent"
  }
  if (data.message !== undefined) {
    _case = "message"
  }
  switch(_case) {
      case "intent" :
          data.intent_data=JSON.parse(data.intent_data)
          if (data.intent_data.query){
            return data.intent_data.query
          } else {
            return false
          }
          break;
      case "message":
      		if (data.message) {
      		 return data.message	
      		} else {
      		 return false
      		}
            
          break;
      default:
         return false
  }
}