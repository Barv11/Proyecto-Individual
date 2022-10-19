import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { filterByType, filterByOrigin, orderByName, orderByStrength, clear } from '../../actions';
import s from './Filters.module.css';

export default function Filters(props) {

	const dispatch = useDispatch();
	const { types, setPage, setRender } = props;

	const handlerFilterType = (e) => {
		setPage(1);
		dispatch(filterByType(e.target.value));
	}

	const handlerFilterRender = (e) => {
		setPage(1);
		dispatch(filterByOrigin(e.target.value));
	};

	const hanlderOrderByName = (e) => {
		dispatch(orderByName(e.target.value));
		setPage(1);
		setRender(e.target.value)
	};

	const handlerOrderByStrength = (e) => {
		setPage(1);
		dispatch(orderByStrength(e.target.value));
		setRender(e.target.value);
	};
	

	return (
		<div className={s.wrap}>
			<div className={s.toggle}>
				<label>Filtrar por tipo: </label>
				<select onChange={handlerFilterType}>
					<option value="all">Por defecto</option>
					{(Object.entries(types).length > 0) && types.map((el, idx) => {
						let nameSplit = el.name.split('')
						let first = nameSplit.shift().toUpperCase();
						nameSplit.unshift(first);
						let nameUpper = nameSplit.join('');
						return (
							<option value={el.name} key={idx}>{nameUpper}</option>
						)
					})}
				</select>
			</div>
			<div className={s.toggle}>
				<label>Filtrar por origen: </label>
				<select onChange={(e) => handlerFilterRender(e)}>
					<option value="all">Por defecto: </option>
					<option value="db">Base de datos</option>
					<option value="api">Api</option>
				</select>
			</div>
			<div className={s.toggle}>
				<label>Ordenar por nombre: </label>
				<select onChange={(e) => hanlderOrderByName(e)}>
					<option value="all">Por defecto: </option>
					<option value="az">Nombres de A - Z</option>
					<option value="za">Nombres de Z - A</option>
				</select>
			</div>
			<div className={s.toggle}>
				<label>Ordenar por fuerza: </label>
				<select onChange={(e) => handlerOrderByStrength(e)}>
					<option value="all">Por defecto: </option>
					<option value="sw">Fuerte - Débil</option>
					<option value="ws">Débil - Fuerte</option>
				</select>
			</div>
		</div>
	)
}