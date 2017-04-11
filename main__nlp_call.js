var url = "https://api.api.ai/v1/query?v=20150910" // const
var query_meta = ""                                //let
var sessionId                                      //let
var query   = inputs.message                       //let
var faq_completed_flag  = false   //let
var func_completed_flag = false   //let 
var _intent = {}                  //let
var call_faq                      //let
var call_func                     //let 

// If the message is a referral load the referal message as the query.
if (inputs.ref && query === "start") {
  query = inputs.ref;
}
// Validate session.
if (inputs.is_a_new_session === "false") {
   sessionId = inputs.session_id
  } else {
   var session = JSON.parse(inputs.is_a_new_session)
   sessionId = session.session_id
}

//----------FAQ --------------------
// Query FAQ_EN Agent on API.ai
function query_faq_agent(query) {
 var opts = {
       method: 'POST',
       url: url,
       headers : {
        "Content-Type":   "application/json", 
        "Authorization" : "Bearer ddf5aebc3e5d4f36a7dff987e72ae4aa"
       },
       body : JSON.stringify ( {
        "query": query, 
        "lang":"en", 
        "sessionId" : sessionId 
      } )
    }
    call_faq = new Promise(function(resolve, reject) {  
       utils.request(opts,function (err, res, body) { 
         if (!err && (res.statusCode == 200)) {
          resolve(body);  // fulfilled successfully
        }
         else {
          reject(body);  // error, rejected
        }
      })
    })
}

function faq_agent_callback(body) {
  body = JSON.parse(body);
    if (body.result.action !== "faq_not_found") {
      var intent = {
          "type" : "faq",
          "query" : body.result.resolvedQuery,
          "action" : "_faq",
          "score" : body.result.score,
          "parameters" : body.result.parameters,
          "timestamp" : body.timestamp,
          "intentId" : body.result.metadata.intentId
      }  
        faq_completed_flag = true
        return(intent)
    }  else {
        faq_completed_flag = true
        return(false)
    }
}


// ---------FUNC -------------------
// Query FUNC_EN Agent on API.ai
function query_functionallity_agent(query) {
 var opts = {
       method: 'POST',
       url: url,
       headers : {
        "Content-Type":   "application/json", 
        "Authorization" : "Bearer fa21e325345c4f12a6c92d753cd8d265"
       },
       body : JSON.stringify ( {
        "query": query, 
        "lang":"en", 
        "sessionId" : sessionId
      })
    }
    call_func = new Promise(function(resolve, reject) {  
       utils.request(opts,function (err, res, body) { 
         if (!err && (res.statusCode == 200)) {
          resolve(body);  // fulfilled successfully
        }
         else {
          reject(body);  // error, rejected
        }
      })
    })
}
function functionallity_agent_callback(body) {
  body = JSON.parse(body);
    if (body.result.action !== "functionallity_not_found") {
        var intent = {
          "type" : "functionallity",
          "query" : body.result.resolvedQuery,
          "action" : body.result.action,
          "score" : body.result.score,
          "parameters" : body.result.parameters,
          "timestamp" : body.timestamp,
          "intentId" : body.result.metadata.intentId
        }  
        func_completed_flag = true
        return intent
    } else {
        func_completed_flag = true
        return false
    }
  }

function process_intent(intent) {
  if (!intent) {
    //Queries completed but not resolved.
    if (faq_completed_flag && func_completed_flag) {
      if (_intent.type !== undefined) {
        return(_intent)
      } else {
        _intent = {
          "type": "chat",
          "query": query,
          "action": "chat_with_an_agent",
          "score": 0,
          "parameters": "",
          "timestamp": new Date().toISOString(),
          "intentId": ""
        }
        return(_intent)
      }
    } else {
      // Intent returned False
      return false
    }
  /// Intent Detected 
  } else {
    //Faq Detected
    if (intent.type == "faq") {
      _intent = intent
      return(_intent)
    }
    //Functionality Detected
    if (intent.type == "functionallity") {
      if (faq_completed_flag) {
        _intent = intent
        return(_intent)
      } else {
        // Functionallity detected but FAQ not resolved yet. 
        _intent = intent
        return false
      }
    }
  }
}

// Query Endpoints
query_faq_agent(query)
query_functionallity_agent(query)

// Resolve Answers
call_faq.then(
  function(data) {
    //var finish = Date.now() - start
    var result = process_intent(faq_agent_callback(data))
    if (result) {
      resolve(result)
    }
  })
  .catch(
    function(error) {
      
      reject(error)
  })

call_func.then(
  function(data) {
    var result = process_intent(functionallity_agent_callback(data))
    if (result) {
      //var finish =  Date.now() - start
      resolve(result)
    }
  })
  .catch(function(error) {
      
      reject(error)
  })
