import React, { useEffect, useState } from 'react';
import { AutoComplete } from "primereact/autocomplete";
import { Service } from "./service/Service";

export default function SearchBox() {
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);

    const search = (event) => {
        // Timeout to emulate a network connection
        setTimeout(() => {
            let _filteredData;

            if (!event.query.trim().length) {
                _filteredData = [...data];
            }
            else {
                _filteredData = data.filter((ele) => {
                    return ele.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setFilteredData(_filteredData);
        }, 250);
    }

    useEffect(() => {
        Service.getCountries().then((data) => setData(data));
    }, []);

    return (

        <div  >
            <h1 className='div'>Pick User</h1>
            <div className='card p -fluid'>
                <AutoComplete field="name" multiple value={selectedData} suggestions={filteredData} completeMethod={search} onChange={(e) => setSelectedData(e.value)} />

            </div>

        </div>
    )
}
