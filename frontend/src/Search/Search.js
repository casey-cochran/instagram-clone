import './Search.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {BsSearch} from 'react-icons/bs';
import searchReducer from '../store/search';


const Search = () => {
    const dispatch = useDispatch();
    const [searchVal, setSearchVal] = useState('');
    const [menu, setMenu] = useState(false)
    const searchResults = useSelector((state) => state.searchReducer)

    useEffect(() => {
        dispatch(searchReducer(searchVal))
    },[searchVal])

    return (
        <>
            <BsSearch />
            <input
                type='search'
                onChange={((e) => setSearchVal(e.target.value))}
                value={searchVal}
                />
        </>
    )
}



export default Search;
