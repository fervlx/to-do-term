const Task = require("./task");
const TaskStatus = require('../helpers/task-status');

class Tasks {

    _list = {}

    get list() {
        
        const arr = [];

        Object.keys( this._list ).forEach( key => { 
            arr.push( this._list[key] )
        });

        return arr;
    }

    constructor() {
        this._list = {};
    }


    createTask( description = '' ) {
        const task = new Task( description );
        this._list[task.id] = task;
    }


    loadTasks( tasks = [] ) {
        tasks.forEach( task => {
            this._list[task.id] = task;
        });
    }


    showTasks( status = TaskStatus.ALL ) {

        let array = [];

        switch( status ) {
            case TaskStatus.ALL:
                array = this.list; 
                break;
            case TaskStatus.COMPLETED:
                array = this.list.filter( task => task.completed );
                break;
            case TaskStatus.PENDING:
                array = this.list.filter( task => !task.completed );
                break;
        }

        if ( array.length === 0 ) {
            switch( status ) {
                case TaskStatus.ALL:
                    console.log(` There are no tasks.`);
                    break;
                case TaskStatus.COMPLETED:
                    console.log('There are no completed tasks.');
                    break;
                case TaskStatus.PENDING:
                    console.log(' There are no pending tasks.');
                    break;
            }
            return;
        }

        array.forEach(( task, index ) => { 
            
            const idx = `${ index + 1 }.`.green;
            const { description, completed } = task;
            const status = ( completed ) ? 'Completed'.green : 'Pending'.red;

            console.log( `${idx} ${description}  ::  ${status}`);
            //console.log(` ${idx}. ${task.description}  ::  ${ task.completed !== null ? "completed".green : "pending".red }`);
        });
    }


    deleteTask( id = '' ) {
        if ( this._list[id] ) {
            delete this._list[id];
            console.log('Task deleted.'.red);
        }
    }


    markAsDone( ids = [] ) {

        if ( ids.length > 0 ) {
        
            ids.forEach( id => {
                const task = this._list[id]; //by reference

                if ( !task.completed ) {
                    task.completed = new Date().toISOString();
                }
            });

            this.list.forEach( task => {
                
                if ( !ids.includes( task.id )) {
                    this._list[task.id].completed = null;
                }
            })
        }
    }
}

module.exports = Tasks;