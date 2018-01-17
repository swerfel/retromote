import { Component, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2,  OnInit, OnDestroy } from '@angular/core';
import { Draggable } from './draggable';
import { PositionChange } from '../transformation/position-change';
import { SvgTransformerService } from '../transformation/svg-transformer.service';
import { PositionService } from '../position.service'


@Component({
  selector: '[app-draggable]',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.css'],
  providers: [PositionService]
})
export class DraggableComponent implements OnInit, OnDestroy {
  isDrag = false;
  startX: number;
  startY: number;
  connection;
  @Input('drag-enabled') dragEnabled: boolean;
  @Output() positionChanged = new EventEmitter<PositionChange>();
  @Input('draggabe-element') draggableElement: Draggable;

  constructor(private el: ElementRef, private transformer: SvgTransformerService, private positions: PositionService) {}

  ngOnInit() {
    this.connection = this.positions.positionChanges().subscribe((positionChange: PositionChange) => {
      this.positionChanged.emit(positionChange);
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent){
    if (this.dragEnabled) {
      this.preventDefaultDragAndDrop(event);
      this.isDrag = true;
      this.startX = event.screenX;
      this.startY = event.screenY;
      this.draggableElement.onDragStart();
    }
  }

  preventDefaultDragAndDrop(event: MouseEvent) {
    if (event.preventDefault)
      event.preventDefault();
    else
      event.returnValue = false;
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent){
    if (this.isDrag) {
      this.isDrag = false;
      this.transformer.clearTranslate(this.el);
      let change = this.computeChangeDimension(event);
      this.positionChanged.emit(change);
      this.positions.positionChanged(change);
      this.draggableElement.onDragFinish();
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent){
    if (this.isDrag) {
      let change = this.computeChangeDimension(event);
      // TODO if outside the bounds move back inside the board
      this.transformer.setTranslateTo(this.el, change);
      this.draggableElement.onDragLocationChange();
    }
  }

  computeChangeDimension(event: MouseEvent): PositionChange {
    return new PositionChange(event.screenX - this.startX, event.screenY - this.startY);
  }

}
