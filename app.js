//const argv = require('yargs').argv;

const argv = require('./config/yargs').argv;
const { cerar, getListado, actualizar, borrarTarea  } = require('./por-hacer/por-hacer');
const colors = require('colors');

//console.log(argv);

let comando = argv._[0];

switch(comando){

    case 'crear':
        let tarea = cerar(argv.descripcion);
        console.log(tarea);
        break;
    
    case 'listar':
        let getListTarea = getListado();
        //console.log(getListTarea);

        
        for (const data of getListTarea) {
            let noC= '';
            if (data.completado == false) {
                 noC = 'Sin Completar';
            } 
            else {
                noC = 'COMPLETADO';
            }
            console.log('==== POR HACER  =====' .green);
            console.log( data.descripcion);
            console.log( data.completado);
            console.log( '====================' .green);
        }
        break;

    
    case 'actualizar':
         let actualizado = actualizar(argv.descripcion, argv.completado);
         console.log(actualizado);
        break;

    case 'borrar':
        let borrar = borrarTarea(argv.descripcion);
        console.log(borrar);
        break;
    
    default:
        console.log('Comando no reconocido');
        break
}