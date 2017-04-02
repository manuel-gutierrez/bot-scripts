try	var p = inputs.param;

try {
  p = JSON.parse(p); 
  resolve(p.poi_desc);
}
catch(err) {
    resolve (false)
}