import React,  { useEffect, useState } from 'react';
import Axios from 'axios';

import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

import '../css/search.css';

function Search() {
	 const [TVSeries, setTVSeries] = useState([])
	 const [Query, setQuery] = useState("")

	 useEffect(() => {

        getTVSeries()

    }, [])

    const getTVSeries = () => {
        Axios.get('http://localhost:5000/get-TVSereies')
            .then(response => {
                if (response.data.success) {
                        setTVSeries(response.data.tvSeries)
                    } else {
                    alert('Failed to fectch datas')
                }
            })
    }

	 const handleOnInputChange = (e) => {
        setQuery(e.target.value) 
    }

    const handleOnInputSubmit = (e) => {

    	e.preventDefault();
    	setQuery(e.target.value) 

        getTVSeries()

    }

    var TVSeriesCount = TVSeries.length;

  return (
    <>
        <div className="jumbotron">
                <h1 id="title">TV Series Search Engine</h1>
                {/* Search Input */}
                <Form onSubmit={handleOnInputSubmit} style={{margin: '0px 50px'}}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search your favorite TV series..."
                            aria-label="TV series name"
                            aria-describedby="basic-addon2"
                            type="text"
                            value= {Query}
                            onChange = {handleOnInputChange}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-light" type='submit' style={{paddingLeft:'30px', paddingRight:'30px'}}>
                                <i class="fas fa-search" style={{ fontWeight:'bold'}}/>
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </div>

          {TVSeriesCount !== 0? 
                <div className="container">
                    {/* Display the results*/}
                    {TVSeries.map((TVShowName) => {
                        for(let i=0; i< TVSeries.length; i++){
                            if(TVSeries[i] == TVShowName){
                                return <h4 id="tv-show">{TVShowName}</h4>
                            }
                        }
                    })}
                </div>
            :
                <div className="container">
                    <h6>Search and enjoy your favorite TV series.... </h6>
                </div>
            }
    </>
  );
}

export default Search;