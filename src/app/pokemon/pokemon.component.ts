import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit{
  constructor(private pokemonService: PokemonService){}

  ngOnInit(): void {
      
  }

  getPokemon(): void {
    this.pokemonService.fetchKantoPokemon();
  }

}
