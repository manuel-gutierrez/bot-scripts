var keywords = [
  {"keyword" :"poi_", "trigger" : "_poi"},
  {"keyword" :"navigation_", "trigger" : "_navigation"},
  {"keyword" :"building_","trigger" : "_building"},
  {"keyword" :"floor_","trigger" : ""},
  {"keyword" :"subscribe_flights", "trigger" : "_subscriptions"},
]

var message = inputs.message; 
var state_params = {
"navigation_incomplete" : inputs.navigation_state, 
"poi_search_incomplete" : inputs.poi_search_state,
"flight_search_incomplete" : inputs.flight_search_state, 
}

/**
 * Find if the mesage contains a keyword substring 
 */
function filterKeyword(message) {
    return keywords.filter(function(keyword) {
       if (message.indexOf(keyword.keyword) !== -1){
         return keyword;
       }
    })
}

/**
 * Resolve action. 
 */
function resolveAction(filter) {
  if (filter.length > 0 ) {
    filter[0].message = message;
    switch (filter[0].keyword) {
    case "floor_":
         if(state_params.navigation_incomplete === "true") {
          filter[0].trigger = "_navigation"
         }
         if(state_params.poi_search_incomplete === "true") {
          filter[0].trigger = "_poi"
         }
         break;
    default:
        filter[0].message = message;
        break;
   }
 
  return  filter[0]
  } else {
   return  false
  }
}

resolve (resolveAction(filterKeyword(message)))



