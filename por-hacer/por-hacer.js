const fs = require('fs');

let listadoPorHacer = [];

const cargarDB = () => {
    
    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];

    }
}

const getListado = () => {

    try {
        listadoPorHacer = require('../db/data.json');
        return listadoPorHacer;
    } catch (error) {
        console.log(error);
    }
}

const actualizar = (descripcion, completado ) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });
    if(index >= 0){
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } 
    else{
        return false;
    }
}

const guardarDB = () => {
    let dataT = JSON.stringify(listadoPorHacer);

    const data = new Uint8Array(Buffer.from(dataT));
    fs.writeFile(`db/data.json`, data, (err) => {
        if(err) throw new Error('No se pudo guardar la data');
    });
}

const borrarTarea = (descripcion) =>{
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    })
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}

const cerar = (descripcion) => {


    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

module.exports = {
    cerar,
    getListado,
    actualizar,
    borrarTarea
}