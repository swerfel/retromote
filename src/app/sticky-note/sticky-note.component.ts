import { Component, Input} from '@angular/core';
import { Bounds } from '../bounds/bounds';
import { PositionChange } from '../position-change';

@Component({
  selector: '[app-sticky-note]',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.css']
})
export class StickyNoteComponent {
  @Input() text: string = '';
  @Input() bounds: Bounds;

  locationChanged(change: PositionChange) {
    this.bounds = this.bounds.movedBy(change);
  }
}
