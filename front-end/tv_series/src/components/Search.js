import React, { Component } from 'react';
import Axios from 'axios';

import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

import '../css/search.css';

class Search extends Component {

    constructor(props){
        super(props);

        // Declare states of query input and TVseries output result
        this.state = {
            query: '',
            TVSeries : []
        }
    }

    // When user type something in the search input, get the input value and keep it in the 'query' 
    handleOnInputChange = (e) => {
        const query = e.target.value;
        console.warn(query);
        this.setState({query:query})
    }

    // After clicking search button search through the data file 
    handleOnInputSubmit = (e) => {
        e.preventDefault();

        const {query} = this.state;
        this.setState({query:query})
        this.state.TVSeries = [];
        console.log({query})

        Axios.get('http://localhost:5000/search', {params: {query: query} })
            .then(res => {
                this.setState({
                    TVSeries: res.data
                });
            })
          .catch((error) => {
            console.log(error);
          }) 
    }
                       
    render() {
        const {query} = this.state;
        const {TVSeries} = this.state;
        var TVSeriesCount = TVSeries.length;
        
        return (
            <>
            <div className="jumbotron">
                <h1 id="title">TV Series Search Engine</h1>
                {/* Search Input */}
                <Form onSubmit={this.handleOnInputSubmit} style={{margin: '0px 50px'}}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search your favorite TV series..."
                            aria-label="TV series name"
                            aria-describedby="basic-addon2"
                            type="text"
                            value= {query}
                            onChange = {this.handleOnInputChange}
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
                    {TVSeries.map((TVShowName) => {
                        for(let i=0; i< Math.min(TVSeriesCount,3); i++){
                            if(this.state.TVSeries[i] == TVShowName){
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
        )
    }
}

export default Search

