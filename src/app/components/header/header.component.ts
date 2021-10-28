import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonModel } from 'src/app/models/PokemonModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route: Router) { }

  userName: string

  ngOnInit(): void {
    this.userName = localStorage.getItem("user")
  }

  clearSection(){
    localStorage.clear()
    this.route.navigate([''])
  }


  goToHome(){
    this.route.navigate(['home'])
  }

}
