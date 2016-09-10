function parse(command){

  var values = command.split(" ");

  var tokens = [];

  values.forEach(function(value){

    value = value.toLowerCase();

    if(value == 'go'){
      tokens.push({type:'GO'});
    }

    else if(value == 'info'){
      tokens.push({type:'INFO'});
    }

    else if(value == 'use' || value == 'read' || value == 'attack'){
      tokens.push({type:'USE',value:value});
    }

    else if(value == 'with' || value == 'on' || value == 'for'){
      tokens.push({type:'WITH'});
    }

    else if(value == 'help' || value == "?"){
      tokens.push({type:'HELP'});
    }

    else if(value == 'take' || value == "grab"){
      tokens.push({type:'TAKE'});
    }

    else if(value == 'inventory' || value == 'inv'){
      tokens.push({type:'INVENTORY'});
    }

    else{
      tokens.push({type:'VALUE',value:value});
    }

  });

  return tokens;

}
