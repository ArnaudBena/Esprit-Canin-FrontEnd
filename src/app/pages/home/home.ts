import { Component, OnInit, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  http = inject(HttpClient);
  listRace = signal<Race[]>([])

  ngOnInit() {

    this.http
      .get<Race[]>("http://localhost:8080/race/list")
      .subscribe(listeRace => this.listRace.set(listeRace));
  }
}
