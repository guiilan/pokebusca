import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonModel } from 'src/app/models/PokemonModel';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  id : number 
  pokemonDetails: any;
  
  constructor(
    private route: ActivatedRoute,
    private pokerService: PokemonsService,
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')
    
    this.pokerService.getDetail(this.id).subscribe((res) => {
      console.log(res)
      this.pokemonDetails = res
    })
  }

}
