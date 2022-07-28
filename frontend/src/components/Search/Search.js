import "./Search.css";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { searchUser } from "../../store/search";


const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchVal, setSearchVal] = useState('');
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(0)
  const searchResults = useSelector((state) => Object.values(state.searchReducer.Search));
  const navRef = useRef(null);
  const inputRef = useRef(null);
  const [allowFocus, setAllowFocus] = useState(true);


  const keyDown = (e) => {
    if(e.keyCode === 38 && active === 0){
      inputRef.current.focus();
    }
    if(e.keyCode === 38 && active > 0){
      e.stopPropagation()
      setActive(active - 1)
      navRef.current.focus()
    }else if(e.keyCode === 40 && active < searchResults.length - 1){
      e.stopPropagation()
      if(active === 0 && navRef.current && allowFocus){
        navRef.current.focus()
        setAllowFocus(false)
        return;
      }
      setActive(active + 1)
      navRef.current.focus()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDown)
    return () => window.removeEventListener('keydown', keyDown)
  },[searchResults])


  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!searchVal){
      window.location.reload()
    }else{
       history.push(`/users/${searchResults[0]?.id}`)
    }
  }

  useEffect(() => {
    if (!menu) return;
    const closeMenu = () => {
      setActive(0)
      setAllowFocus(true)
      setMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [menu]);

  useEffect(() => {
      if(searchVal.length > 0){
          setMenu(true)
          setAllowFocus(true)
          dispatch(searchUser(searchVal));
      }
      if(searchVal.length === 0) {
        setMenu(false)
      }
  }, [searchVal]);

  return (
    <>
      <BsSearch className="search-icon" />
      <form onSubmit={handleSubmit}>
      <input
        onClick={() => setMenu(true)}w
        ref={inputRef}
        className="search-input"
        autoFocus
        onKeyDown={keyDown}
        type="search"
        placeholder="Search"
        onChange={(e) => setSearchVal(e.target.value)}
        value={searchVal}
      />
      </form>
      {menu && (
        <div className="search-cont">
          {searchResults.length > 0 ? (
            searchResults.map((ele, i) => {
              return (
                <NavLink ref={active === i ? navRef : null}  onClick={(() => {setSearchVal('')})} key={i}  className="spot-links" to={`/users/${ele.id}`}>
                  <div
                    className="search-results-list"
                  >
                    {ele.username}
                  </div>
                </NavLink>
              );
            })
          ) : (
            <div className="search-results-list">No search results found</div>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
