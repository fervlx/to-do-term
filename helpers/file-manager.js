const fs = require('fs');

const file = './data/tasks.json';

const saveTasks = ( data = [] ) => {
    fs.writeFileSync( file, JSON.stringify( data ));
};

const readTasks = () => {
    if ( !fs.existsSync( file )) {
        return null;
    }

    const data = fs.readFileSync( file, { encoding: 'utf-8' });
    return JSON.parse( data );
}

module.exports = {
    saveTasks,
    readTasks
}