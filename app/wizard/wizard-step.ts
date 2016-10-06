export class WizardStep {

  private visible: boolean;

  constructor() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  toggleVisible() {
    this.visible = !this.visible;
  }

}
