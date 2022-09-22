import { exit } from 'node:process'
import categories from './categories.js'
import price from './price.js'
import Categories from '../models/category.model.js'
import Price from '../models/price.model.js'
import db from '../config/db.js'



const importarDatos = async () => {
    try {
        // Autoenticar
        await db.authenticate()

        // Generar las Columnas
        await db.sync()

        // Borrar datos
        // await Categories.delete(categories);
        // await Price.delete(price);
        // console.log('Datos Borrados Correctamente')

        // Insertar los datos
            // En este caso se inserta categorias y cuando termina se inserta precio. En el caso de que una tabla dependa de la otra es correcto hacer de esta manera.
        // await Categories.bulkCreate(categories)
        // await Price.bulkCreate(price)
        
            // En el caso de que las tablas no dependan una de la otra. La inserción se puede hacer a la vez. Para ello utilizamos una Promesa
        await Promise.all([
            Categories.bulkCreate(categories),
            Price.bulkCreate(price)
        ])

        console.log('Datos Importados Correctamente')
        exit()

    } catch (error) {
        console.log(error)
        exit(1)
    }
}

const eliminarDatos = async () => {
    try {
        await Promise.all([
            Categories.destroy({where: {}, truncate: true}),
            Price.destroy({where: {}, truncate: true})
        ])
        console.log('Datos Eliminados Correctamente')
        exit()

    } catch (error) {
        console.log(error)
        exit(1)
    }
}


if (process.argv[2] === "-i") {
    importarDatos()
}

if (process.argv[2] === "-e") {
    eliminarDatos()
}