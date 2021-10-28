import { Component, OnInit } from '@angular/core';
import { PokemonModel } from 'src/app/models/PokemonModel';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { faFastForward } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemonList: PokemonModel[]
  pageSlice : any
  pageIndex : number;
  faFastForward = faFastForward;
  filtro: any;


  constructor(
    private pokerService: PokemonsService,
    private route: Router
  ) {
    this.pokemonList = []
    this.pageIndex = 5
    this.filtro = ""
  }

  ngOnInit(): void {

    this.obterEstadoInicial()
  }

  obterEstadoInicial(){
    this.pokerService.getPokemons().subscribe((res) => {
      this.pokemonList = res.results;
      this.pokemonList.map(obj => {
        obj.id = +obj.url.split('/')[6];
        obj.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${obj.id}.png`;
        this.pokerService.getDetail(obj.id).subscribe((res) => {
          obj.abilities = res.abilities
          obj.types = res.types
        })
      });
     this.pageSlice = this.pokemonList.slice(0, 5)
    })
  }

  changeImg(indice: number, id: number){
    if(this.pageSlice[indice].image == `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`){
        this.pageSlice[indice].image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
    }else{
      this.pageSlice[indice].image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    }
  }

  detalhes(pokemon: PokemonModel){
    this.route.navigate(['/details', pokemon.id])
  }


  filtrar(){
    if(this.filtro == ""){
      this.obterEstadoInicial()
    }else{
      this.pageSlice = this.pageSlice.filter(obj => {
        return obj.name.includes(`${this.filtro}`)
    })
    }
  }

  OnPageChange(event?: any){
    if(event == 's'){
      event = {previousPageIndex: 1, pageIndex: 0, pageSize: 5, length: 20} 
    }else if( event == 'e'){
      event = {previousPageIndex: 2, pageIndex: 3, pageSize: 5, length: 20}
    }
    const startIndex = event.pageIndex * event.pageSize
    let endIndex = startIndex + event.pageSize
    if(endIndex > this.pokemonList.length){
      endIndex = this.pokemonList.length
    }
    this.pageIndex = (event.pageIndex * 5) + 5
    this.pageSlice = this.pokemonList.slice(startIndex, endIndex)
  }



}
