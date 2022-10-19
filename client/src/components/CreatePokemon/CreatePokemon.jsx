import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon, clear, sendOnePokemon } from '../../actions/index.js'
import Nav from '../Nav/Nav.jsx';
import Spinner from '../Spinner/Spinner.jsx';
import s from './CreatePokemon.module.css'

export default function CreatePokemon(props) {
    const dispatch = useDispatch();
    const types = useSelector(state => state.types);
    const responseDB = useSelector(state => state.responseDB);
    const [img, setImg] = useState(0);
    const [error, setError] = useState('');
    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        img: require(`./../../Images/CreatePokemon/${img}.png`).default,  //agregar azar de imagenes
        types: [],
    });

    let idx = `db-${Math.floor(Math.random() * 1000)}`;

    let validate = (input.name.length > 0 && input.name.length <= 20) &&
        (input.hp > 0 && input.hp <= 200) &&
        (input.attack > 0 && input.attack <= 200) &&
        (input.defense > 0 && input.defense <= 200) &&
        (input.speed > 0 && input.speed <= 200) &&
        (input.height > 0 && input.height <= 200) &&
        (input.weight > 0 && input.weight <= 10000) &&
        (input.types.length > 0) && (/^[a-zA-Zñ\s]{1,20}$/.test(input.name))
        ? false : true

    

    const handleOnChange = (e) => {
        if(e.target.name === 'name') {
            if(!(input.name.length > 0 && input.name.length <= 20)) {
                setError('El nombre debe tener una longitud mínima de 20 caracteres.')
            } 
            if (!e.target.value.length) {
                setError('')
            }
        }

        if (e.target.name === 'img') {
            setImg(e.target.value)
            setInput({
                ...input,
                img: require(`./../../Images/CreatePokemon/${e.target.value}.png`).default
            })
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleOnCheckbox = async (e) => {
        if (input.types.includes(e.target.value)) {
            setInput({
                ...input,
                types: input.types.filter(el => el !== e.target.value)
            })
        } else {
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            });
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(sendOnePokemon({
            id: idx,
            name: input.name.toLowerCase(),
            ...input,
        }))
        let add = {
            id: idx,
            name: input.name,
            hp: parseInt(input.hp),
            attack: parseInt(input.attack),
            defense: parseInt(input.defense),
            speed: parseInt(input.speed),
            height: parseInt(input.height),
            weight: parseInt(input.weight),
            img: require(`./../../Images/CreatePokemon/${img}.png`).default,
            created: true,
            types: types.filter(el => {
                let map = input.types.map(el => parseInt(el))
                if (map.includes(el.id)) return el
            })
        };
        dispatch(addPokemon(add));
        // window.location.reload()
        setInput({
            name: '',
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            img: require(`./../../Images/CreatePokemon/${img}.png`).default,  //agregar azar de imagenes
            types: [],
        })
        setImg(0);
        document.getElementById("myForm").reset();
    }

    useEffect(() => {
        return () => dispatch(clear())
    }, [dispatch]);
    return (
        <React.Fragment>
            <Nav />
            <main className={s.container}>
                <h1 className={s.title}>Crea tu propio Pokemon</h1>
                <form onSubmit={onSubmit} id='myForm' className={s.form}>
                    <div className={s.formContainerLeft} >
                        <label className={s.labelLeft}>Nombre:
                            <input
                                value={input.name}
                                type="text"
                                name='name'
                                onChange={handleOnChange}
                                className={s.inputtext}
                            /></label>
                            <span>{error? error : null}</span>

                        <label className={s.labelLeft}>Salud:
                            <input
                                value={input.hp}
                                type="number"
                                name='hp'
                                onChange={handleOnChange}
                                className={s.inputnumber1}

                            /></label>

                        <label className={s.labelLeft}>Ataque:
                            <input
                                value={input.attack}
                                type="number"
                                name='attack'
                                onChange={handleOnChange}
                                className={s.inputnumber2}
                            /></label>

                        <label className={s.labelLeft}>Defensa:
                            <input
                                value={input.defense}
                                type="number"
                                name='defense'
                                onChange={handleOnChange}
                                className={s.inputnumber3}
                            /></label>

                        <label className={s.labelLeft}>Velocidad:
                            <input
                                value={input.speed}
                                type="number"
                                name='speed'
                                onChange={handleOnChange}
                                className={s.inputnumber4}
                            /></label>

                        <label className={s.labelLeft}>Tamaño:
                            <input
                                value={input.height}
                                type="number"
                                name='height'
                                onChange={handleOnChange}
                                className={s.inputnumber5}
                            /></label>

                        <label className={s.labelLeft}>Peso:
                            <input
                                value={input.weight}
                                type="number"
                                name='weight'
                                onChange={handleOnChange}
                                className={s.inputnumber6}
                            /></label>

                    </div>

                    <div className={s.formContainerRigth}>
                        <div className={s.wrapimg}>
                            <div className={s.inputimg}>
                                <label>Imagen:
                                </label>
                                <input
                                    value={img}
                                    type="range"
                                    min='0'
                                    max='10'
                                    name='img'
                                    onChange={handleOnChange}
                                    className={s.inputrange}
                                />
                            </div>
                            <img src={require(`./../../Images/CreatePokemon/${img}.png`).default} alt='Img selected' className={s.imgselected} />
                        </div>
                        <div className={s.checkbox}>
                            <label>Types: </label>
                            <label>{'(seleccionar 1 o 2 tipos como máximo)'}</label>
                            {!types ? <Spinner /> : types.map(el => {
                                let nameSplit = el.name.split('')
                                let first = nameSplit.shift().toUpperCase();
                                nameSplit.unshift(first);
                                let nameUpper = nameSplit.join('');
                                return (
                                    <label key={el.id} className={s.labelcheckbox}>
                                        <input
                                            type="checkbox"
                                            name={el.name}
                                            value={el.id}
                                            onChange={handleOnCheckbox}
                                            className={s.inputcheckbox}
                                            disabled={input.types.length === 2 ? true : false}
                                        />{nameUpper}
                                    </label>
                                )
                            })}
                        </div>
                        <span>
                            {Object.entries(responseDB).length === 0 ?
                                ''
                                :
                                responseDB.description
                            }
                        </span>
                        <input
                            type="submit"
                            value="Crear"
                            className={s.inputsubmit}
                            disabled={validate}
                            style={validate ? { cursor: 'not-allowed', backgroundColor: '#acadad' } : { cursor: 'pointer' }}
                        />
                    </div>
                    {console.log(input)}

                </form>
            </main >
        </React.Fragment>
    )
}