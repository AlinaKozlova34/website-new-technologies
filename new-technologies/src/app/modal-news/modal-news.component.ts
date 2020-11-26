import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-news',
  templateUrl: './modal-news.component.html',
  styleUrls: ['./modal-news.component.css']
})
export class ModalNewsComponent implements OnInit {
  @Input() 
  header: string;

  @Input() 
  description: string;
	// @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.header);
    
  }

}

