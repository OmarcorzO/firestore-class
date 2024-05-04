import { Component } from '@angular/core';
import { FirestoreService } from '../services/data/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  songList: any = [];

  constructor(
    private firestoreSrv: FirestoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.firestoreSrv.getSongList().subscribe((songs) => {
      this.songList = songs
    })
  }
}
