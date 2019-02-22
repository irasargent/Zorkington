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
  console.log('\n182 Main St.\n'
    +'You are standing on Main Street between Church and South Winooski.\n'
    +'There is a door here. A keypad sits on the handle.\n'
    +'On the door is a handwritten sign\n'
    )
async function start(){
  
let answer = await ask('');
if (answer.includes('read')){
    console.log('\nThe sign says \"Welcome to Burlington Code Academy!\n'
    +'Come on up to the third floor.\n'
    +'If the door is locked, use the code \'12345\'\"\n')
}else if (answer.includes('take')){
    console.log('\nThat would be selfish. How will other students find their way?\n')
}else if (answer.includes('open')) { 
    console.log('\nThe door is locked. There is a keypad on the door handle\n')
}
    else{
    console.log("\nSorry, I don't know how to " + answer +".\n")
}
start();
}

start();
