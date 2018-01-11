import { Component, OnInit, Input, HostListener } from '@angular/core';
import { BoardElement } from '../board-element'
import { EditableElement } from '../editable-element';

let DEFAULT_SIZE = 32;

@Component({
  selector: '[app-edit-button]',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.css']
})
export class EditButtonComponent extends BoardElement implements OnInit {
  @Input() editable: EditableElement;
  scale: number = 1;
  borderVisible: boolean = false;

  ngOnInit() {
    let currentSize = this.min(this.elemWidth, this.elemHeight) ;
    this.scale = currentSize / DEFAULT_SIZE;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.borderVisible = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.borderVisible = false;
  }

  @HostListener('click')
  onClick() {
    this.editable.startEditing();
  }

  min(a: number, b: number): number {
    return a < b ? a : b;
  }

}
