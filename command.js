
var inventory=[];

var room1 = {};
var room2 = {};
var room3 = {};
var room4 = {};

var position = room1;

room1.description = 'You are in a cold dark room that smells of old socks. You are reminded'+
  ' of those horrible days of gym class. You see a door to the north. It looks flimsy and you'+
  ' bet that it would not last long against a sturdy weapon. A hallway leads to the east.';
room1.northDoor={};
room1.northDoor.status='locked';
room1.northDoor.room= room4;
room1.eastDoor={};
room1.eastDoor.status='unlocked';
room1.eastDoor.room = room2
room1.inventory=[];

room2.description="The room has lost of dirt on the floor, ground to a pulp from frequent"+
  " use by the previous residents. A table with a chair sits neatly in the corner with an"+
  " old book sitting on the table. There is a door to the north with a small window. You can see"+
  " light peaking through from the next room. There is a hallway to the west where an offensive smell"+
  " lurks.";
room2.westDoor={};
room2.westDoor.status='unlocked';
room2.westDoor.room = room1;
room2.northDoor={};
room2.northDoor.status='locked';
room2.northDoor.room=room3;
room2.inventory = [
    {
      name:'book',
      use:function(target){
        if(target == null){
            return "The old tome reads: Speak friend and enter.";
        }
        else{
          if (target.hasOwnProperty('name')){
            return 'You throw the book at the '+target.name+" and nothing happens.";
          }
          else{
            return 'It\'s a book. That\'s not how it is used.';
          }
        }
      }
    },
    {
      name:'chair',
      use:function(target){
        if(target == null){
            return "You sit down on the chair and start to comtemplate on life. You "+
            "notice how cold, dark, and depressing this dungeon is and decide that those"+
            " princesses aren\'t going to rescue themselves or else some other guy wearing"+
            " green and some overalls will do it.";
        }
        else{
          if (target.hasOwnProperty('name')){
            return 'You smack the '+target.name+" with the chair with rage like you are"+
            " facing your greatest foe in the ring with the crowd shouting \'USE THE CHAIR\',"+
            " but alas no one is around to notice your victory over the "+target.name+".";
          }
          else{
            return 'It\'s a book. That\'s not how it is used.';
          }
        }
      }
    }
  ];

room3.description="The room is lit up with a spectacular light radiating from a glorius "+
  "sword protruding out of the ground. A plaque against the wall reads: It is dangerous to"+
  " go alone, take this. There is a door that leads to the south.";
room3.southDoor={};
room3.southDoor.status='unlocked';
room3.southDoor.room=room2;
room3.inventory=[
    {
      name:'sword',
      use:function(target){
        if(target == null){
            return "The sword is somehow glowing despite this dark depressing dungeon."+
            " You feel heroic and courageous by just wielding the mighty blade.";
        }
        else{
          if (target.hasOwnProperty('name')){
            if(target.name == 'door' && position.hasOwnProperty('northDoor') && position.northDoor.status == 'locked'){
              position.northDoor.status = 'unlocked';
              room1.description = 'You are in a cold dark room that smells of old socks. You are reminded'+
              ' of those horrible days of gym class. The door to the north is smashed to bits, revealing another room. A hallway leads to the east.';
              return 'You hack the door to pieces clearing the way into the room to the north.';

            }
            return 'The '+target.name+" is threatened by your sword. Although it is inannimate,"+
            " its fear is palpable in the air.";
          }
          else{
            return 'I don\'t know what to do here.';
          }
        }
      }
    }
  ];

room4.description = "Upon entering the room, you hear a loud \'BANG\' as steel bars fall"+
  " covering the doorway you just came through. You see no other exit from the room."+
  " The room is dimly lit by a single candle on a strawberry cake standing"+
  " on a table in the center of the room. A note is on the table next to the cake.";
room4.inventory=[
    {
      name:'note',
      use:function(target){
        playing = false;
        return 'The note reads: Here is the cake as promised.\nThanks for playing!\n'+
        " _____   ___  ___  ___ _____ \n"+
        "|  __ \\ / _ \\ |  \\/  ||  ___| \n"+
        "| |  \\// /_\\ \\| .  . || |__  \n"+
        "| | __ |  _  || |\\/| ||  __|  \n"+
        "| |_\\ \\| | | || |  | || |___ \n"+
        " \\____/\\_| |_/\\_|  |_/\\____/ \n"+
        "   _____  _   _ ___________ \n"+
        " |  _  || | | |  ___| ___ \\\n"+
        " | | | || | | | |__ | |_/ /\n"+
        " | | | || | | |  __||    /\n"+
        " \\ \\_/ /\ \\_/ / |___| |\\ \\\n"+
        " \\___/  \\___/\\____/\\_| \\_| \n";
      }
    }
  ]

function doCommand(tokens){

  if(tokens.length>0){
    var token = tokens[0];

    if(token.type == 'GO'){
      doGo(tokens);
    }

    else if(token.type == 'HELP'){
      showHelp(tokens);
    }

    else if(token.type == 'USE'){
      doUse(tokens);
    }

    else if(token.type == 'TAKE'){
      doTake(tokens);
    }

    else if(token.type == 'SAY'){
      doSay(tokens);
    }

    else if(token.type == 'INFO'){
      showRoomInfo(tokens);
    }

    else if(token.type == 'INVENTORY'){
      showInventory(tokens);
    }

    else{
      addNewLine('I don\'t know what you are trying to do.');
    }
  }

}

function showRoomInfo(tokens){
  if(tokens.length > 1){
    addNewLine('Too many arguments given.');
  }
  else{
    addNewLine(position.description);
  }
}

function showInventory(tokens){
  if(tokens.length > 1){
    addNewLine('Too many arguments given.');
  }
  else{
    addNewLine("You have in your inventory:");
    inventory.forEach(function(item){
      addNewLine(item.name);
    });
  }
}

function doGo(tokens){

  if(tokens.length != 2){
    addNewLine('Where are you going?');
  }
  else{
    // delete GO token
    tokens.splice(0,1);
    var direction = tokens[0].value;

    if(direction == 'north'){
      if(position.hasOwnProperty('northDoor')){
        if(position.northDoor.status == "unlocked"){
          position = position.northDoor.room;
          addNewLine(position.description);
        }
        else{
          addNewLine('The door is locked.')
        }
      }
      else{
        addNewLine('I cannot go that direction.');
      }
    }

    if(direction == 'south'){
      if(position.hasOwnProperty('southDoor')){
        if(position.southDoor.status == "unlocked"){
          position = position.southDoor.room;
          addNewLine(position.description);
        }
        else{
          addNewLine('The door is locked.')
        }
      }
      else{
        addNewLine('I cannot go that direction.');
      }
    }

    if(direction == 'east'){
      if(position.hasOwnProperty('eastDoor')){
        if(position.eastDoor.status == "unlocked"){
          position = position.eastDoor.room;
          addNewLine(position.description);
        }
        else{
          addNewLine('The door is locked.')
        }
      }
      else{
        addNewLine('I cannot go that direction.');
      }
    }

    if(direction == 'west'){
      if(position.hasOwnProperty('westDoor')){
        if(position.westDoor.status == "unlocked"){
          position = position.westDoor.room;
          addNewLine(position.description);
        }
        else{
          addNewLine('The door is locked.')
        }
      }
      else{
        addNewLine('I cannot go that direction.');
      }
    }

  }
}

function doUse(tokens){

  if(tokens.length == 2){
    var name = tokens[1].value;
    var item = findItem(name);
    if(item != null){
      var result = item.use(null);
      addNewLine(result);
    }
    else{
      addNewLine("You cannot find a "+name);
    }
  }
  else if(tokens.length == 4){

    var name1 = tokens[1].value;
    var item1 = findItem(name1);

    if(item1 != null){

      var name2 = tokens[3].value;
      var item2 = findItem(name2);

      if(item2 != null){
        var result = item1.use(item2);
        addNewLine(result);
      }
      else{
        addNewLine("You cannot find a "+name2);
      }
    }

    else{
      addNewLine("You cannot find a "+name1);
    }
  }
  else{
    addNewLine('You are tyring to use something, but are obviously lost on how to do so.');
  }

}

function doTake(tokens){

  if(tokens.length == 2){
    var name = tokens[1].value;
    var item = null;
    var index = -1;

    position.inventory.forEach(function(tempItem,tempIndex){
      if(tempItem.name == name){
        item = tempItem;
        index = tempIndex;
      }
    });

    if(item != null){
      position.inventory.splice(index,1);
      inventory.push(item);
      addNewLine("You pick up the "+name);
    }
    else{
      addNewLine("You cannot find a "+name);
    }
  }
  else{
    addNewLine('You are trying to pick something up, but lost on how to do so.');
  }

}

function doSay(tokens){

  var verb = tokens[0].value;

  // remove SAY token
  tokens.splice(0,1);

  if(tokens.length == 1 && (tokens[0].value == 'friend' || tokens[0].value == 'mellon') && position == room2){
    room2.northDoor.status = 'unlocked';
    addNewLine('Your knowledge of The Lord of the Rings lore has paid off. You hear the door unlock and glow with elvish runes.');
  }

  var sentence = '';

  tokens.forEach(function(value){
    sentence += value.value + " ";
  });

  addNewLine('You '+verb+": "+sentence);
}

function findItem(name){

  if(name == "door"){
    return {name:"door"};
  }

  var item = null;

  inventory.forEach(function(tempItem){
    if(tempItem.name == name){
      item = tempItem;
    }
  });

  position.inventory.forEach(function(tempItem){
    if(tempItem.name == name){
      item = tempItem;
    }
  });

  return item;
}

function showHelp(tokens){
  if(tokens.length == 1){
    addNewLine("Some available commands are:\n"+
    "GO [north | south | east | west]\n"+
    "USE [item]\n"+
    "USE [item>] WITH [item]\n"+
    "TAKE [item]\n"+
    "INVENTORY\n"+
    "INFO");
  }
  else{
    // delete HELP token
    tokens.splice(0,1);
    var token = tokens[0];
    if(token.type == 'GO'){
      addNewLine("Travel in some direction.\nEx: go east");
    }

    else if(token.type == 'USE'){
      addNewLine("Use an item by itself.\n\tEx: use lantern\n"+
      "Or use an item with another item.\n\tEx: use lantern with wood");
    }

    else if(token.type == 'TAKE'){
      addNewLine("Adds an item from the room to your personal inventory.\n"+
      "Ex: take book");
    }

    else if(token.type == 'INVENTORY'){
      addNewLine("Displays what is in the players inventory. Also can be called with \'inv\'.");
    }

    else if(token.type == 'INFO'){
      addNewLine("Displays the description of the current room.");
    }

    else{
      addNewLine('No help information exists for that.');
    }
  }
}
