
import { PositionChange } from './position-change';

export class PositionChangeMessage {
  constructor(public clientId: string, public elementId: string, public change: PositionChange) {}
}