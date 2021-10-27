import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  name: string;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  acessar(){
    localStorage.setItem('user', this.name)
    this.route.navigate(['/home'])
    
  }

}
