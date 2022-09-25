import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSettings } from 'src/app/store';
import { RecipleSettings } from 'src/app/store/reciple.reducer';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  isHighContrast: boolean = false;

  example1Icons=['🍝', '🍅', '🥩', '🧅', '🧀']
  example2Icons=['🥩', '🍝', '🧀', '🥛', '🍅']
  example3Icons=['🥩', '🍝', '🧀', '🥛', '🍅']
  constructor(
    private store : Store,
  ) { 
    this.store.select(selectSettings).subscribe((settings: RecipleSettings) => {
      this.isHighContrast = settings.isHighContrast;
    });
  }

  ngOnInit(): void {
  }

}
