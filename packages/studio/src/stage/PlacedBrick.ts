import { BrickType } from "../presets";
import { Brick } from "./Brick";

export class PlacedBrick extends Brick {
  id: string;

  constructor(type: BrickType, id: string) {
    super(type);
    this.id = id;
  }
}
