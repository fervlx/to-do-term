require('colors');
const inquirer = require('inquirer');

const questions = [{
    type: 'list',
    name: 'option',
    message: 'what would you like to do?',
    choices: [
        {
            value: '1',
            name: `${"1".green}. New task`
        },
        {
            value: '2',
            name: `${"2".green}. Show all tasks`
        },
        {
            value: '3',
            name: `${"3".green}. Show completed tasks`
        },
        {
            value: '4',
            name: `${"4".green}. Show pending tasks`
        },
        {
            value: '5',
            name: `${"5".green}. Mark as completed`
        },
        {
            value: '6',
            name: `${"6".green}. Delete task`
        },
        {
            value: '7',
            name: `${"7".green}. Exit`
        },
        
    ]
}];


const menu = async() => {

    console.clear();
    console.log("===============================".green);
    console.log("select an option".white);
    console.log("===============================\n".green);

    const { option } = await inquirer.prompt( questions );
    return option;
}


const pause = async () => {

    const question = [
        {
            type: 'input',
            name: 'confirm',
            message: ` Press ${"Enter".green} to continue`
        }
    ]
    console.log('\n');
    await inquirer.prompt( question );
}


const read = async ( message ) => {
    const question =  [
        {
            type: 'input',
            name: 'description',
            message,
            validate( value ) {
                if ( value.length === 0 ) {
                    return 'please, enter a description.'
                }

                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt( question );
    return description;
}


const confirm = async( message = '' ) => {
    
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt( question );
    return ok;
}


const create = async( tasks = [] ) => {

    const choices = tasks.map(( task, index ) => { 
        const idx = `${ index + 1}.`.green;
        return {
          value: task.id,
          name: `${idx} ${task.description}`,
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.green + ' cancel '
    });

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'delete',
            choices
        }
    ];

    const { id } = await inquirer.prompt( question );
    return id;
}


const check = async( tasks = [] ) => {

    const choices = tasks.map(( task, index ) => { 
        const idx = `${ index + 1}.`.green;
        return {
          value: task.id,
          name: `${idx} ${task.description}`,
          checked: task.completed !== null
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Choose',
            choices
        }
    ];

    const { ids } = await inquirer.prompt( question );
    return ids;
}

module.exports = {
    menu,
    pause, 
    read,
    create, 
    confirm,
    check
}