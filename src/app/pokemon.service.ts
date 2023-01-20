import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  private pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';

  fetchKantoPokemon(){
    fetch(this.pokeApiUrl)
    .then(response => response.json())
    .then((allPokemon => allPokemon.results.forEach((pokemon: any) => {
      this.fetchPokemonData(pokemon);
    })))
  }

  fetchPokemonData(pokemon: any){
    let url = pokemon.url
    fetch(url)
    .then(response => response.json())
    .then(pokeData => this.renderPokemon(pokeData));
  }

  renderPokemon(pokeData: any){
    let allPokemonContainer = document.getElementById('poke-container');

    //div will be used to hold the details for each pokemon
    let pokeContainer = document.createElement("div"); 

    this.createPokeImage(pokeData.id, pokeContainer);

    let pokeName = document.createElement('h4');

    pokeName.innerText = pokeData.name;

    let pokeNumber = document.createElement('p');

    //ul list will hold the pokemon types
    let pokeTypes = document.createElement('ul');

    //helper function to go through the types array and create li tags for each
    this.createTypes(pokeData.types, pokeTypes);

    //appends all details to pokeContainer div
    pokeContainer.append(pokeName, pokeNumber, pokeTypes);

    //appends the pokeContainer div to the main div which holds all the pokemon cards
    allPokemonContainer?.appendChild(pokeContainer);
  }

  createTypes(types: any[], ul: { append: (arg0: HTMLLIElement) => void; }){
    types.forEach(type => {
      let typeLi = document.createElement('li');
      typeLi.innerText = type['type']['name'];
      ul.append(typeLi);
    })
  }

  createPokeImage(pokeId: any, containerDiv: any){
    let pokeImgContainer = document.createElement('div')
    pokeImgContainer.classList.add('image')

    let pokeImage = document.createElement('img')
    pokeImage.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`

    pokeImgContainer.append(pokeImage);
    containerDiv.append(pokeImgContainer);
  }
}
