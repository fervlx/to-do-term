require('colors');
const { saveTasks, readTasks } = require('./helpers/file-manager');
const { menu, pause, read, create, confirm, check } = require('./helpers/menu');
const Tasks = require('./models/tasks');
const TaskStatus = require('./helpers/task-status');

//const { menu, pause } = require('./helpers/messages');

const main = async() => {
    
    let option = '';

    const tasks = new Tasks();
    const data = readTasks(); // return null or [{...}]

    if ( data ) {
        tasks.loadTasks( data );
    }

    do {

        option = await menu();
        console.log('\n');

        switch( option ) {
            case '1' : 
                const description = await read('Enter a description.');
                tasks.createTask( description );
                break;
            case '2' :
                tasks.showTasks( TaskStatus.ALL );
                break;
            case '3' : 
                tasks.showTasks( TaskStatus.COMPLETED );
                break;
            case '4' : 
                tasks.showTasks( TaskStatus.PENDING );
                break;
            case '5' : 
                const ids = await check( tasks.list );
                tasks.markAsDone( ids );
                break;
            case '6' : 
                const id = await create( tasks.list );

                if ( id !== 0 ) {
                    const approved = await confirm( ' delete task?' );
    
                    if ( approved ) {
                        tasks.deleteTask( id );
                    }
                }

                break;
        }

        saveTasks( tasks.list );

        if ( option !== '7' ) {
            await pause();
        }

    } while ( option !== '7' );
}

main();