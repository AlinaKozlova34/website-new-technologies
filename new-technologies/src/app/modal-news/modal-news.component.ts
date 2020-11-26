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
	// @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.article);
    
  }

}

