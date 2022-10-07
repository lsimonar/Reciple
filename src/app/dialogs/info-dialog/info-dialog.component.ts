import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSettings } from 'src/app/store';
import { RecipleSettings } from 'src/app/store/reciple.reducer';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  isHighContrast: boolean = false;

  example1Icons=['🐄', '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/pasta.png" alt="Pasta"/>', '🧀', '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/sauces.png" alt="Sauces"/>', '🍅']
  example2Icons=['<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/flour.svg" alt="Flour"/>',
   '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/water.png" alt="Water"/>', '<img style="width:1.3em; margin-top: 0.5em;" src = "../assets/food-icons/yeast.png" alt="Yeast"/>', '🍅', '🧀']

  constructor(
    private store : Store,
    public sanitizer: DomSanitizer
  ) { 
    this.store.select(selectSettings).subscribe((settings: RecipleSettings) => {
      this.isHighContrast = settings.isHighContrast;
    });
  }

  ngOnInit(): void {
  }

}
