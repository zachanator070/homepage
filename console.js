
var lines = ['>'];

function addChar(event){

  var code = event.which || event.keyCode;

  var key = String.fromCharCode(code);

  var lastLine = lines[lines.length-1];

  // if any key was pressed, and the cursor was showing, delete it
  if(lastLine[lastLine.length-1] == "|"){
    lines[lines.length-1] = lastLine.substring(0, lastLine.length - 1);
  }

  // if enter was pressed then process command
  if(key == "\r"){
    runCommand(lastLine);

    addNewLine(">");
  }
  // if backspace was pressed, then delete a character
  else if(code == 8){
    if(lastLine.length > 1){
      lines[lines.length-1] = lastLine.substring(0, lastLine.length - 1);
    }
  }
  // else we just need to add a new character
  else{

    // if shift key was not pressed we need to make the letter lowercase
    if(!event.shiftKey && code >= 65 && code <= 90){
      code += 32;
      key = String.fromCharCode(code);
    }

    // if we went over the max charactters per line, add a new line
    if(lastLine.length == 20){
      addNewLine("");
    }
    lines[lines.length-1] += key;

  }

  // update with the new info
  updateConsole();

}

function addNewLine(line){

  if(lines.length<10){
    lines.push(line);
  }
  else{
    lines.splice(0,1);
    lines.push(line);
  }

}

function updateConsole(){

  var content = '';
  lines.forEach(function(value, index){

    // if the async call added a cursor, and it is not the last line, delete
    // the cursor
    if(index != lines.length-1 && value[value.length-1] == "|"){
      lines[lines.length-1] = lastLine.substring(0, lastLine.length - 1);
    }

    content += value + "\r\n";

  });

  var console = document.getElementById('console');
  console.focus();
  console.innerHTML = content;

}

function parse(command){


}

function runCommand(command){

  var tokens = parse(command);

}

// add a blinking cursor effect
function blink(){
  var lastLine = lines[lines.length-1];
  // add a cursor, or delete it
  if(lastLine[lastLine.length-1] != "|"){
    lines[lines.length-1] += "|";
  }
  else{
    lines[lines.length-1] = lastLine.substring(0, lastLine.length - 1);
  }

  updateConsole();
}
