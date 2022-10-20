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
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
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
        (input.types.length > 0) && (/^[a-zA-ZñÑ\s]{1,20}$/.test(input.name))
        ? false : true



    const handleOnChange = (e) => {
        if (e.target.name === 'name') {
            if (input.name.length >= 20) {
                setError('El nombre debe tener una longitud máxima de 20 caracteres.')
            } else {
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
            name: input.name,
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
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            img: require(`./../../Images/CreatePokemon/${img}.png`).default,  //agregar azar de imagenes
            types: [],
        })
        setImg(0);
        document.getElementById("myForm").reset();
    }

    useEffect(() => {
        return () => dispatch(clear())
    }, [dispatch]);
    console.log(input.name.length)
    return (
        <React.Fragment>
            <Nav />
            <main className={s.container}>
                <h1 className={s.title}>Crea tu propio Pokemon</h1>
                <form onSubmit={onSubmit} id='myForm' className={s.form}>
                    <div className={s.formContainerLeft} >
                        <label className={s.labelLeft}>
                            <div className={s.labelLeftDiv}>
                                <span>Nombre:</span>
                                <img
                                    src={require(`./../../Images/CreatePokemon/name.png`).default}
                                    alt={`icon name`}
                                    className={s.iconimg}
                                />
                                <input
                                    value={input.name.toLowerCase()}
                                    type="text"
                                    name='name'
                                    onChange={handleOnChange}
                                    className={s.inputtext}
                                />
                            </div>
                            <span className={s.error}>{error ? error : null}</span>
                        </label>

                        <label className={s.labelLeft}>{`Salud: ${input.hp}`}
                            <img
                                src={require(`./../../Images/CreatePokemon/hp.png`).default}
                                alt={`icon hp`}
                                className={s.iconimgrange}
                            />
                            <input
                                value={input.hp}
                                type="range"
                                min='0'
                                max='200'
                                name='hp'
                                onChange={handleOnChange}
                                className={s.inputrange}

                            /></label>

                        <label className={s.labelLeft}>{`Ataque: ${input.attack}`}
                            <img
                                src={require(`./../../Images/CreatePokemon/attack.png`).default}
                                alt={`icon hp`}
                                className={s.iconimgrange}
                            />
                            <input
                                value={input.attack}
                                type="range"
                                min='0'
                                max='200'
                                name='attack'
                                onChange={handleOnChange}
                                className={s.inputrange}
                            /></label>

                        <label className={s.labelLeft}>{`Defensa: ${input.defense}`}
                            <img
                                src={require(`./../../Images/CreatePokemon/defense.png`).default}
                                alt={`icon hp`}
                                className={s.iconimgrange}
                            />
                            <input
                                value={input.defense}
                                type="range"
                                min='0'
                                max='200'
                                name='defense'
                                onChange={handleOnChange}
                                className={s.inputrange}
                            /></label>

                        <label className={s.labelLeft}>{`Velocidad: ${input.speed}`}
                            <img
                                src={require(`./../../Images/CreatePokemon/speed.png`).default}
                                alt={`icon hp`}
                                className={s.iconimgrange}
                            />
                            <input
                                value={input.speed}
                                type="range"
                                min='0'
                                max='200'
                                name='speed'
                                onChange={handleOnChange}
                                className={s.inputrange}
                            /></label>

                        <label className={s.labelLeft}>{`Tamaño: ${input.height} cm.`}
                            <img
                                src={require(`./../../Images/CreatePokemon/height.png`).default}
                                alt={`icon hp`}
                                className={s.iconimgrange}
                            />
                            <input
                                value={input.height}
                                type="range"
                                min='0'
                                max='200'
                                name='height'
                                onChange={handleOnChange}
                                className={s.inputrange}
                            /></label>

                        <label className={s.labelLeft}>{`Peso: ${input.weight} kg.`}
                            <img
                                src={require(`./../../Images/CreatePokemon/weight.png`).default}
                                alt={`icon hp`}
                                className={s.iconimgrange}
                            />
                            <input
                                value={input.weight}
                                type="range"
                                min='0'
                                max='1000'
                                name='weight'
                                onChange={handleOnChange}
                                className={s.inputrange}
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
                            <label className={s.labelfirst}>Tipos: </label>
                            <label className={s.labelsecond}>{'(seleccionar 1 o 2 tipos como máximo)'}</label>
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
                        <span className={s.message}>
                            {Object.entries(responseDB).length === 0 ?
                                ''
                                :
                                responseDB.description
                            }
                        </span>
                        <input
                            type="submit"
                            value="Crear Pokemon"
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