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
  const [active, setActive] = useState(-1)
  const searchResults = useSelector((state) => Object.values(state.searchReducer.Search));
  const testRef = useRef(null);



  const keyDown = (e) => {
    if(e.keyCode === 38 && active > 0){
      setActive(active - 1)
      testRef.current.focus()
      testRef.current.style.margin = '100px'
      console.log('am i in here ?')
    }else if(e.keyCode === 40 && active < searchResults.length - 1){
      setActive(active + 1)
      console.log(active)
      testRef.current.focus()
      testRef.current.style.color = 'black'
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDown)
    return () => window.removeEventListener('keydown', keyDown)
  },[keyDown])



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
      setMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [menu]);

  useEffect(() => {
      if(searchVal.length > 0){
          setMenu(true)
          dispatch(searchUser(searchVal));
      }
      if(searchVal.length === 0) {
        setActive(0)
        setMenu(false)
      }
  }, [searchVal]);

  return (
    <>
      <BsSearch className="search-icon" />
      <form onSubmit={handleSubmit}>
      <input
        onClick={() => setMenu(true)}
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
                <NavLink ref={active === i ? testRef : null}  onClick={(() => {setSearchVal('')})} key={i}  className="spot-links" to={`/users/${ele.id}`}>
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
