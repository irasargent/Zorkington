const readline = require('readline');

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(questionText) {
    return new Promise((resolve, reject) => {
      readlineInterface.question(questionText, resolve);
    });
  }

let mainStreet = {
    label:"182 Main Street",
    intro:"You are standing on Main Street between Church and South Winooski.\n"
    +"There is a door here. A keypad sits on the handle.\n"
    +"On the door is a handwritten sign\n",
    sign:{ 
        read:"\nThe sign says \"Welcome to Burlington Code Academy!\n"
            +'Come on up to the third floor.\n'
            +'If the door is locked, use the code \'12345\'\"\n',
        take:'\nThat would be selfish. How will other students find their way?\n'
        },
    door:{
        status:'locked',
        locked:'\nThe door is locked. There is a keypad on the door handle\n',
        unlocked:'\nSuccess! The door opens. You enter the foyer and the door shuts behind you.',
        incorrect:'\n A red light flashes on the keypad. It looks like you entered the wrong code.'
    }

};

let foyer = {
    label:"the foyer",
    intro:"Or maybe it's an antechamber. Or a\n"+ 
    "vestibule. Or an entryway. Or an atrium. Or a narthex.\n"+
    "But let's forget all that fancy flatlander vocabulary,\n"+
    "and just call it a foyer. In Vermont, this is pronounced\n"+
    '"FO-ee-yurr".\n'+
    "A copy of Seven Days lies in a corner.\n"+
    "There's a fight of stairs in front of you.",
    upStairs:'You head up the stairs',
    sevenDays:"You pick up the paper and leaf through it looking for comics\n"+ 
    "and ignoring the articles, just like everybody else does.",
    goBack:"\nYou head back through the door onto Main St."

};

let hallway1 = {
    label:'the hallway at the top of the stairs',
    intro:"You reach the top of the stairs and find yourself in a hallway.\n"+
    "To your immediate right is a closed door.\n"+
    "To your left, further down the hallway, is a door with a sign on it that reads \"Burlington code Academy\""
}

let classRoom = {
    label:"the classroom",
    intro:""
     
};

let rooms = {
    room1:mainStreet,
    room2:foyer,
    room3:hallway1,
    room4:classRoom
};

let currentRoom = rooms.room1

let player = {
    location:currentRoom,
    inventory:"pretty much nothing",
    status:"a little tired"
}

let mainStreetFunction = async function(){
    let answer = await ask('\n>');

    if (answer.includes('read')){
        console.log(currentRoom.sign.read)
    }else if (answer.includes('take')){
        console.log(currentRoom.sign.take)
    }else if (answer.includes('open') && currentRoom.door.status.includes('locked')) { 
        console.log(currentRoom.door.locked)
    }else if (answer.includes('open') && currentRoom.door.status.includes('open')){
        console.log(currentRoom.door.unlocked)
        currentRoom = rooms.room2;
        player.location = currentRoom;
        enterRoom();
    }else if (answer.includes('12345')){
        currentRoom.door.status = 'open';
        console.log('You hear a buzzing coming from the lock.')
    }else if (answer.includes('enter')){
        console.log(currentRoom.door.incorrect)
    //}else if (answer.includes('inventory') && (player.inventory.includes('empty'))){
      //  console.log("Your inventory is currently empty")
    }else if (answer.includes('inventory')){
        console.log("Your inventory currently includes " + player.inventory)
    
    }else if (answer.includes('status')){
        console.log("You're currently feeling "+player.status)
    }
        else{
        console.log("\nSorry, I don't know how to " + answer +".\n")
    }
    mainStreetFunction();
}

let foyerFunction = async function(){
    let answer = await ask('\n>');

    if (answer.includes('up' && 'stairs')){
        console.log(currentRoom.upStairs);
        currentRoom=rooms.room3
        player.location = currentRoom;
        enterRoom();

   // } else if (answer.toLowerCase(answer.includes('seven days' || 'paper'))){
     //   console.log(currentRoom.sevenDays);
       // player.inventory = 'a recent copy of the Seven Days newspaper';

    } else if (answer.includes('back') || answer.includes('outside')){
        console.log(currentRoom.goBack);
        currentRoom = rooms.room1;
        player.location = currentRoom;
        enterRoom();

    }else if (answer.includes('inventory')){
        console.log("Your inventory currently includes " + player.inventory)
    
    }else if (answer.includes('status')){
        console.log("You're currently feeling "+player.status)
    }
        else{
        console.log("\nSorry, I don't know how to " + answer +".\n")
    }

    foyerFunction();
}

let hallwayFunction = async function(){
    let answer = await ask('\n>');

    if (answer.includes('')){
    }
        else{
        console.log("\nSorry, I don't know how to " + answer +".\n")
    }
    hallwayFunction();
}

let enterRoom = function(){
    console.log("\nWelcome to " + player.location.label + '\n')
    console.log(currentRoom.intro)
    //console.log("You are feeling " + player.status)
    if (player.location == mainStreet){
        mainStreetFunction();
    }else if (player.location == foyer){
        foyerFunction();
    }else if (player.locatio == hallway){
        hallwayFunction();
    }else if (player.location == classRoom){
        classRoomFunction();
    }
}

console.log('\n\nWelcome to Zorkington!\n'+
"Enter commands to proceed.\n"+
"Check your inventory by typing 'inventory'\n"+
"Check your status by typing 'status'\n")

enterRoom();