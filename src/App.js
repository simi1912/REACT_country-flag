import './App.css';
import {Component} from "react";
import Guesser from "./guesser/Guesser";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
                randomCountries: [],
                currentCountry: 0,
                message: "Guess!",
            }

        this.onGuess = this.onGuess.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    componentDidMount() {
        this.resetGame();
    }

    resetGame() {
        const dataUrl = "https://restcountries.eu/rest/v2/all";

        fetch(dataUrl)
            .then( data => data.json(), error => console.log(error) )
            .then( data => {
                const randomIndexes = this.generateRandomIndexes(data.length);
                const currentCountryIndex = Math.floor(Math.random() * 4);

                this.setState({
                    randomCountries: [
                        data[randomIndexes[0]],
                        data[randomIndexes[1]],
                        data[randomIndexes[2]],
                        data[randomIndexes[3]],
                    ],
                    currentCountryIndex: currentCountryIndex,
                    message: "Guess!",
                })

            });
    }

    generateRandomIndexes(upToIndex){
        let index1 = Math.floor(Math.random() * upToIndex);

        let index2 = Math.floor(Math.random() * upToIndex);
        while (index2 === index1)
            index2 = Math.floor(Math.random() * upToIndex);

        let index3 = Math.floor(Math.random() * upToIndex);
        while (index3 === index1)
            index2 = Math.floor(Math.random() * upToIndex);

        let index4 = Math.floor(Math.random() * upToIndex);
        while (index4 === index1)
            index2 = Math.floor(Math.random() * upToIndex);

        return [index1, index2, index3, index4];
    }

    render() {
        let guesser = (<div>Loading</div>)

        if(this.state.randomCountries.length === 4)
            guesser = (<Guesser
                randomCountries={this.state.randomCountries}
                currentCountryIndex={this.state.currentCountryIndex}
                onGuess={this.onGuess}/>)

        return (
            <div className="App">
                <header className="header">
                    <img src="https://raw.githubusercontent.com/rithmschool/udemy_course_exercises/master/react/flags/src/world.jpg"
                         className="world-map" alt="logo" />
                    <h1 className={"title"}>Guess The Flag</h1>
                </header>
                <div className="content">
                    {guesser}
                    <p>
                        {this.state.message}
                    </p>
                </div>

            </div>
        );
    }

    onGuess(e){
        e.preventDefault();

        const checkedCountry = this.getCheckedIndex(e);
        const currentCountryIndex = this.state.currentCountryIndex;

        if(checkedCountry === currentCountryIndex){
            this.setState({
                ...this.state,
                message: "Congratulations!"
            })
            setTimeout( () => {
                this.resetGame();
                e.target[checkedCountry].checked = false;
            }, 1000);
        } else {
            this.setState({
                ...this.state,
                message: "Try again!"
            })
        }

    }

    getCheckedIndex(e) {
        let checkedIndex;

        for (let i = 0; i < 4; i++)
            if(e.target[i].checked)
                checkedIndex = i;

        return checkedIndex;
    }

}

export default App;
