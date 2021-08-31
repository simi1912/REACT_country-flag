import {Component} from "react";
import "./Guesser.css";

class Guesser extends Component {

    render() {
        const randomCountries = this.props.randomCountries;
        const currentCountryIndex = this.props.currentCountryIndex;
        const randomCountriesElements = randomCountries.map( (country, index) => (
            <li key={index}>
                <input name="country" id={index} type="radio" value={index}/>
                <label htmlFor={index}>{country.name}</label>
            </li>
        ))
        return (
            <div id="guesser">
                <form onSubmit={this.props.onGuess}>
                    <ul>
                        {randomCountriesElements}
                    </ul>
                    <button type="submit">GUESS</button>
                </form>
                <div>
                    <img src={randomCountries[currentCountryIndex].flag} alt="Country flag to guess."/>
                </div>
            </div>
        )
    }

}

export default Guesser;
