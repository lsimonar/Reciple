import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isDarkMode : boolean = false;

  constructor(
    private service : AppService,
  ) { }

  ngOnInit(): void {
  }

  openSettingsDialog(){
    this.service.openSettingsDialog();
  }

  openStatisticsDialog(){
    this.service.openStatisticsDialog();
  }

  openInfoDialog(){
    this.service.openInfoDialog();
  }

  openContactDialog(){
    this.service.openContactDialog();
  }

}
