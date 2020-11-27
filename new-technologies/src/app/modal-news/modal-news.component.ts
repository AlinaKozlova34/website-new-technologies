import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Data } from '../integration/models/data';

@Component({
  selector: 'app-modal-news',
  templateUrl: './modal-news.component.html',
  styleUrls: ['./modal-news.component.css']
})
export class ModalNewsComponent implements OnInit {
  @Input() 
  article: Data;
	@Output() isClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.article);
    
  }
  hideModal(): void {
    console.log("hideModal");
    this.isClosed.emit(true);

  }
}




