import React, {useState, useEffect} from 'react'
import {firebase} from '../firebase'

const VerUsuarios = () => {

    const [user, setuser] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(() => {
        
        obtenerDatos()
    }, [])

    const obtenerDatos = async () => {
        try {
            const db = firebase.firestore()
            const data = await db.collection('usuarios').get()
            
            const arrayData = await data.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            console.log(arrayData);
            setuser(arrayData)
            setloading(false)
        } catch (error) {
            console.log('este',error);
        }
        
    }
    

    return (
        <div>
            <h3>Ver usuarios</h3>
            <div className="row">
                <div className="col-6">
                    {
                        loading ?
                        <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                        </div>
                        :
                            <ul className="list-group">
                                {
                                    user.map(i => (
                                    <li className="list-group-item" key={i.id}>{i.nombre} - {i.fecha}</li>
                                    ))
                                }
                            </ul>
                    }
                        
                </div>
            </div>
        </div>
    )
}

export default VerUsuarios
