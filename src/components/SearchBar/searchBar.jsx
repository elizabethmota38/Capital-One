import React from 'react';
import { tsConstructSignatureDeclaration } from '@babel/types';


export class SearchBar extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        triviaQAs: [],
        userInput: "",
        dropDownOption: "random",
        results: []
      };
      this.findData = this.findData.bind(this);
      this.categoryApi = this.categoryApi.bind(this);
      this.dateApi = this.dateApi.bind(this);
      this.difficultyApi = this.difficultyApi.bind(this);
      this.findClues = this.findClues.bind(this);
   }

    handleOnClick =(event) =>{  
        event.preventDefault()
        this.findData()
}
    handleUserInputOnChange =(event) =>{  
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
            
    })
}
   handleChange =(event) =>{  
    this.setState({
        dropDownOption: event.target.value,
    })
}

async categoryApi () {

    var id = -1;
    const baseUrl = 'http://jservice.io/api/categories?offset=';
    var finUrl = 'http://jservice.io/api/category?id=';
    var offset = 0;

    do {
        var url = baseUrl+offset.toString()+'&count=100';
        console.log(offset.toString());
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        for(var i = 0; i < 100; i++) {
            try {
                if (data[i].title.includes(this.state.userInput)) {
                    id = data[i].id;
                    console.log(id);
                    console.log(data[i].title);
                    finUrl = finUrl+id.toString();
                    console.log(finUrl);
                    return finUrl;
                }
            } catch (error) {
                console.log(error);
                return;
            }   
        }
        
        offset = offset + 100;
    } while (id !== -1);
    
}

async findClues (url) {
    debugger;
    var results = [];
    const finResponse = await fetch(url);
    var jsonResult = await finResponse.json();
    results = jsonResult.clues;
    console.log(results);
    return results; 
}

async dateApi () {
    var count = 0;
    var results = [];
    do {
        const url = "http://jservice.io/api/random?count=100";
        const response = await fetch(url);
        const data = await response.json();
        for(var i = 0; i < 100; i++) {
            if (data[i].airdate.includes(this.state.userInput)) {
                results.push(data[i]);
                count++;
            }
        }
    } while (count < 10);
    return results;
}

async difficultyApi (){
    var count = 0;
    var results = [];
    while (count < 10) {
        const url = "http://jservice.io/api/random?count=100";
        const response = await fetch(url);
        const data = await response.json();
        for(var i = 0; i < 100; i++) {
            if (this.state.userInput === data[i].value) {
                results.push(data[i]);
                count++;
            }
        }
    } 
    return results;
}

async findData () {

    var output = [];
    if (this.state.dropDownOption === 'category') {
        var url = this.categoryApi();
        output = this.findClues(url);
        this.setState({results: output})
    }
    else if (this.state.dropDownOption === 'date') {
        output = this.dateApi();
        this.setState({results: output})
    }
    else if (this.state.dropDownOption === 'difficulty') {
        output = this.difficultyApi();
        this.setState({results: output})
    }
    else {
        const url = "http://jservice.io/api/random?count=10";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({results: data})
        console.log(this.state.results);
        
    }
    // this.setState({
    //         results: output,
    // })
    // console.log(this.state.results);
}

    printResults() {
        if (this.state.results.length !== 0) {
            console.log(this.state.results)
            // return (
            //     this.state.results[0].question
                

                
            // )
        }
    }


    render () {
        return(
    <React.Fragment>

        <select style = {{marginLeft: '200px'}} onChange ={this.handleChange}>
                <option value="random">Random</option>
                <option value="category">Trivia Category</option> 
                <option value="date">Date</option>
                <option value="difficulty">Level of Difficulty</option>
            </select>
          <div className="container">
            <nav className="header">
                
            </nav>
            <section style = {{ marginTop: '71px'}} className="search-box" >
              <i className="fas fa-search" style = {{color: 'grey', fontSize: '35px'}} onClick={this.handleOnClick}> </i>
              <input className="search-txt" type="text" name="userInput" placeholder="Search Jeopardy" 
              onChange={this.handleUserInputOnChange} />
            </section>
          </div>
          <div>
                {this.printResults()}
            </div>
        </React.Fragment>
        ); 
      }
    }
    export default SearchBar;