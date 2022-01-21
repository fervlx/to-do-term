require('colors');

 const menu = () => {

    return new Promise( resolve => {

        console.clear();
        console.log("===============================".green);
        console.log("select an option".green);
        console.log("===============================\n".green);
    
        console.log(`${"1".green}. New task`);
        console.log(`${"2".green}. Show all tasks`);
        console.log(`${"3".green}. Show completed tasks`);
        console.log(`${"4".green}. Show pending tasks`);
        console.log(`${"5".green}. Mark as completed`);
        console.log(`${"6".green}. Delete task`);
        console.log(`${"7".green}. Exit \n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('type option: ', ( opt ) => {
            readline.close();
            resolve( opt );
        });
    });
 };


 const pause = () => {

    return new Promise( resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
    
        readline.question(` Press ${"ENTER".green} to continue.`, ( opt ) => {
            readline.close();
            resolve( opt );
        });
    });
    
 }

 module.exports = {
     menu, 
     pause
 }