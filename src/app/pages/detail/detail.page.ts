import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import Song from 'src/song.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  song: any = {};
  songId: any;

  constructor(
    private firestoreSrv: FirestoreService,
    private route: ActivatedRoute,
    public alertCtrl: AlertController,
    public router: Router
  ) {}

  ngOnInit() {
    this.songId = this.route.snapshot.paramMap.get('id');
    this.songInfo();
  }

  async songInfo() {
    this.song = (await this.firestoreSrv.getSongDetail(this.songId)).data();
  }

  async deleteSong(song: Song) {
    this.song.id = this.songId;
    const alert = await this.alertCtrl.create({
      message: '¿Está seguro de eliminar la canción?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cerrar alert');
          },
        },
        {
          text: 'Confirmar',
          handler: async () => {
            await this.firestoreSrv.deleteSong(song);
            this.router.navigateByUrl('')
          }
        }
      ],
    });
    await alert.present()
  }
}
