import {useEffect, useState} from 'react'
import data from '/src/data.json';
import './App.css'

function App() {
    const [houses, setHouses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [minRooms, setMinRooms] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000000);

    useEffect(() => {
        // From json file
        setHouses(data);
    }, []);

    const filteredHouses = houses.filter((house) => {
        const matchesSearchTerm = house.house.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMinRooms = house.rooms >= minRooms;
        const matchesPrice = house.price >= minPrice && house.price <= maxPrice;
        return matchesSearchTerm && matchesMinRooms && matchesPrice;
    });

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleMinRoomsChange = (e) => {
        setMinRooms(parseInt(e.target.value, 10));
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(parseInt(e.target.value, 10));
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(parseInt(e.target.value, 10));
    };

    function sortByPrice() {
        const sortedHouses = [...houses].sort((a, b) => a.price - b.price);
        setHouses(sortedHouses);
    }

    function sortByRooms() {
        const sortedHouses = [...houses].sort((a, b) => a.rooms - b.rooms);
        setHouses(sortedHouses);
    }

    return <>
        <div>
            <div>
                <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{height: '30px'}}
                />
                <button onClick={handleSearch} style={{margin: '10px'}}>Search</button>
            </div>
            <div style={{padding: '10px'}}>
                <a style={{margin: '10px', color: 'White'}}>Price</a>
                <input
                    type="number"
                    id="roomsF"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    style={{height: '30px', width: '100px'}}
                />
                <a style={{margin: '10px', color: 'White'}}>Min</a>
                <input
                    type="number"
                    id="roomsF"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    style={{height: '30px', width: '100px'}}
                />
                <a style={{margin: '10px', color: 'White'}}>Max</a>
            </div>
            <div>
                <a style={{margin: '10px', color: 'White'}}>Min Rooms</a>
                <input
                    type="number"
                    id="rooms"
                    value={minRooms}
                    onChange={handleMinRoomsChange}
                    style={{height: '30px', width: '40px'}}
                />
            </div>
            <div>
                <button onClick={sortByPrice} style={{margin: '10px'}}>Sort by Price</button>
                <button onClick={sortByRooms} style={{margin: '10px'}}>Sort by Rooms</button>
            </div>
            <h2>Houses</h2>
            <div style={{padding: '10px'}}>
                <center>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>House</th>
                            <th>Rooms</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredHouses.map((house) => (
                            <tr key={house.id}>
                                <td>{house.id}</td>
                                <td>{house.house}</td>
                                <td>{house.rooms}</td>
                                <td>${house.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </center>
            </div>
        </div>
    </>
}

export default App
