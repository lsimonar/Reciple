import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  constructor(
    private router : Router,
    private service : AppService 
  ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.router.navigateByUrl("/", {skipLocationChange: false});
  }

}
