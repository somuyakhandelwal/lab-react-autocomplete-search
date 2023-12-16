import { useState } from 'react';
import './App.css';
import countryData from "./resources/countryData.json";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);

  const handleInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setAutocompleteVisible(term.length > 0);
  }

  const executeSearch = (term) => {
    setSearchTerm(term);
    setAutocompleteVisible(false);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      console.log("Escape key pressed");
      setAutocompleteVisible(false);
    } else {
      setAutocompleteVisible(searchTerm.length > 0);
    }
  }

  const filteredItems = countryData.filter((item) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const name = item.name.toLowerCase();
    return name.startsWith(lowerCaseTerm);
  });

  const handleSearchButtonClick = () => {
    console.log("Search button clicked");
    executeSearch(searchTerm);
  }

  return (
    <>
      <div className='Body'>
         <div>
           <input type="text" value={searchTerm} onChange={handleInputChange} onKeyDown={handleKeyPress} />
           <button onClick={handleSearchButtonClick}>Search</button>
         </div>
         <div id='autocomplete' style={{ display: autocompleteVisible ? 'block' : 'none' }}>
           {filteredItems.length > 0 ? (
             <ul>
               {filteredItems.map((item) => (
                 <li key={item.name} onClick={() => executeSearch(item.name)}>
                   {item.name}
                 </li>
               ))}
             </ul>
           ) : (
             <p>No Results Found</p>
           )}
         </div>
      </div>
    </>
  )
}

export default App;
