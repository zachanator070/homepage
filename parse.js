function parse(command){

  var values = command.split(/[ ,]+/);

  var tokens = [];

  values.forEach(function(value){

    value = value.toLowerCase();

    if(value == 'go'){
      tokens.push({type:'GO'});
    }

    else{
      tokens.push({type:'VALUE',value:value});
    }

  });

  return tokens;

}
