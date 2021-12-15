import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
} from '@angular/core';
import * as BABYLON from 'babylonjs';

@Component({
  selector: 'app-edge-clicks',
  templateUrl: './edge-clicks.component.html',
  styleUrls: ['./edge-clicks.component.scss'],
})
export class EdgeClicksComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  private engine = BABYLON.Engine;
  private scene = BABYLON.Scene;

  constructor() {}

  ngOnInit(): void {
    var engine = new BABYLON.Engine(this.canvas.nativeElement, true);
    var scene = new BABYLON.Scene(engine);

    // creating camera
    var camera = this.createCamera(scene, this.canvas.nativeElement);

    // allow mouse deplacement
    camera.attachControl(this.canvas.nativeElement, true);

    // creating minimal scean
    this.createScene(scene, this.canvas.nativeElement);

    // running babylonJS
    engine.runRenderLoop(() => {
      scene.render();
    });
  }

  createCamera(scene: BABYLON.Scene, canvas: HTMLCanvasElement) {
    const camera = new BABYLON.ArcRotateCamera(
      'Camera1',
      0,
      10,
      10,
      new BABYLON.Vector3(0, 13, 15),
      scene
    );

    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    return camera;
  }

  createScene(scene: BABYLON.Scene, canvas: HTMLCanvasElement) {
    const light = new BABYLON.HemisphericLight(
      'light',
      new BABYLON.Vector3(3, 6, 10),
      scene
    );
    light.intensity = 0.7;

    var box = BABYLON.MeshBuilder.CreateBox(
      'Box',
      { width: 5, height: 5, depth: 5 },
      scene
    );
    box.position = new BABYLON.Vector3(0, 0, 0);

    var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 6, scene);
    sphere.position.x = -10;

    box.actionManager = new BABYLON.ActionManager(scene);
    box.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickUpTrigger,
        function () {
          box.enableEdgesRendering();
          box.edgesWidth = 10.0;
          box.edgesColor = new BABYLON.Color4(0, 0, 1, 1);
        }
      )
    );

    sphere.actionManager = new BABYLON.ActionManager(scene);
    sphere.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickUpTrigger,
        function () {
          // sphere.enableEdgesRendering();
          sphere.renderOutline = true;
        }
      )
    );
  }
}
