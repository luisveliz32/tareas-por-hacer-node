const fs = require('fs');


let listadoporhacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoporhacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('Nose pudo grabar', err);
    });
}

const cargarDB = () => {

    try {
        listadoporhacer = require('../db/data.json');
    } catch (error) {
        listadoporhacer = []
    }



}

const crear = (descripcion) => {

    cargarDB();

    let porhacer = {
        descripcion,
        completado: false
    }
    listadoporhacer.push(porhacer);
    guardarDB();
    return porhacer;
}

const getListado = () => {
    cargarDB();
    return listadoporhacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoporhacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoporhacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}


const borrar = (descripcion) => {
    cargarDB();
    let nuevolistado = listadoporhacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    })
    if (listadoporhacer.length === nuevolistado.length) {
        return false;
    } else {
        listadoporhacer = nuevolistado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}