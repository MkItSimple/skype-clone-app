import { useApp } from "../context/AppContext";

const SearchComponent = () => {
  const { setOpenSearchComponent } = useApp();
  return (
    <SearchComponentContainer>
      <div className="search__container">
        <input
          type="text"
          className="chat__search__input"
          placeholder="Search People, Chat..."
        />
        <div className="exit__search">
          <ExitIcon onClickFunction={() => setOpenSearchComponent(false)} />
        </div>
      </div>
      <div className="search__tabs">
        <div className="tab">
          <div className="text">All</div>
        </div>
        <div className="tab">
          <div className="text">People</div>
        </div>
        <div className="tab">
          <div className="text">Messages</div>
        </div>
        <div className="tab">
          <div className="text">Group</div>
        </div>
      </div>
      <div className="search__results">
        <h3>
          Search functionality <br />
          not yet implemented.
        </h3>
      </div>
    </SearchComponentContainer>
  );
};

export default SearchComponent;
import styled from "styled-components";
import { ExitIcon } from "./svg/Icons";
const SearchComponentContainer = styled.div`
  .search__container {
    background-image: linear-gradient(
      to right,
      var(--sky600),
      var(--sky500),
      var(--sky300)
    );
    padding: 1em 1em;
    position: relative;
  }

  .chat__search__input {
    border: none;
    background-color: transparent;
    font-size: 18px;
    font-family: "Gilroy Bold";
    outline: none;
    color: white;
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
      font-weight: 700;
    }
  }

  .exit__search {
    position: absolute;
    right: 10px;
    top: 15px;
    color: white;
    svg {
      height: 25px;
      width: 25px;
    }
    &:hover {
      cursor: pointer;
    }
  }

  .search__tabs {
    display: flex;
    justify-content: center;
    /* gap: 1.3em; */
  }
  .tab {
    /* background-color: #eee; */
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 13px;
    color: var(--color500);

    border-bottom: 2px solid transparent;
    position: relative;
    .text {
      width: auto;
      box-sizing: border-box;
      padding-top: 1em;
      padding-bottom: 1em;
      border-bottom: 2px solid transparent;
      &:hover {
        font-weight: 500;
        color: var(--sky400);
        cursor: pointer;
        border-color: var(--sky400);
      }
    }
    /* &:hover {
      font-weight: 500;
      color: var(--sky400);
      cursor: pointer;

      &::before {
        content: "";
        position: absolute;
        top: 100%;
        width: 100%;
        left: 0;
        height: 3px;
        border-radius: 2px;
        background: green;
      }
    } */
  }

  .search__results {
    padding: 0em 1em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .gif__container {
    height: 50px;
    width: 50px;
    position: relative;
    margin-right: 0.5em;
  }
  h3 {
    color: var(--color400);
    font-size: 20px;
  }
`;
