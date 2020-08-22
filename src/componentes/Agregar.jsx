import React, {useState, useEffect} from 'react'
import {firebase} from '../firebase'

const Agregar = () => {

    const [user, setuser] = useState([])
    const [datos, setdatos] = useState('')
    const [editar, seteditar] = useState(false)
    const [id, setid] = useState('')
    const [loading, setloading] = useState(true)

    useEffect(() => {
        
        const obtenerUser = async () => {
            try {
                const db = firebase.firestore() //llama a la base de datos
                const data = await db.collection('usuarios').get() // llama a la coleccion 
                
                const arrayData = await data.docs.map(doc => ({ //obtiene la coleccion y la guarda en la constante
                    id: doc.id,
                    ...doc.data()
                }))
                console.log(arrayData);
                setuser(arrayData) // array data modifica el estado del usuario
                setloading(false)
            } catch (error) {
                console.log('este',error);
            }
        }

        obtenerUser()
    }, [])

    const agregar = async (e)=> {
        e.preventDefault()
        console.log(datos);

        if(!datos.trim){
            console.log('vacio');
            return
        }

        try {
            const db = firebase.firestore()
            const nuevoUsuario = {
                nombre : datos,
                fecha : Date.now()
            }
            const data = await db.collection('usuarios').add(nuevoUsuario)
            setuser([
                ...user,
                {
                    ...nuevoUsuario, id: data.id
                }
            ])
            setdatos('')
        } catch (error) {
            console.log(error);
        }
    }

    const eliminar = async (id) => {
        try {
            const db = firebase.firestore()
            await db.collection('usuarios').doc(id).delete()

            const arrayFiltrado = user.filter(item => item.id !== id)
            setuser(arrayFiltrado)
        } catch (error) {
            console.log(error);
        }
    }

    const edicion = (item) => {
        seteditar(true)
        setdatos(item.nombre)
        setid(item.id)
        
    }

    const editarUser = async (e) => {
        e.preventDefault()
        if(!datos.trim()){
            console.log('vacio');
            return
        }
        try {
            const db = firebase.firestore()
            await db.collection('usuarios').doc(id).update({
                nombre: datos
            })
            const arrayEditado = user.map( item => (
                item.id === id ? {id: item.id, fecha: item.fecha, nombre: datos} :item
            ))
            setuser(arrayEditado)
            seteditar(false)
            setdatos('')
            setid('')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h3>{
                editar ? 'Editar usuario' : 'Agregar usuario'
                }</h3>
            <div className="row">
                <div className="col-6 mt-4 mb-3">
                    
                    <form onSubmit={editar ? editarUser : agregar}>
                        <input type="text"
                        placeholder="Ingresar usuario"
                        className="form-control"
                        onChange={e => setdatos(e.target.value)}
                        value={datos}
                        />
                        <button type="submit" 
                        className={editar ? "btn btn-warning btn-block text-white my-3" : "btn btn-primary btn-block text-white my-3"}>
                            {
                            editar ? 'Editar' : 'Agregar'
                            }
                        </button>
                    </form>
                </div>
                <div className="d-flex justify-content-center col-12">
                {
                        loading ?
                        <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                        </div>
                        :
                            <table className="table">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Fecha</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.map(item => (
                                    <tr key={item.id}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.nombre}</td>
                                        <td>{item.fecha}</td>
                                        <td><button type="button" 
                                        className="btn btn-warning text-white"
                                        onClick={() => edicion(item)}
                                        >Editar</button></td>
                                        <td><button type="button" className="btn btn-danger"
                                        onClick={() => eliminar(item.id)}
                                        >Eliminar</button></td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                    }
                
                </div>
            </div>
        </div>
    )
}

export default Agregar
