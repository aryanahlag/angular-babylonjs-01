import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
} from '@angular/core'
import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'


@Component({
  selector: 'app-edge-clicks',
  templateUrl: './edge-clicks.component.html',
  styleUrls: ['./edge-clicks.component.scss'],
})
export class EdgeClicksComponent implements OnInit {
  @ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>

  private engine = BABYLON.Engine
  private scene = BABYLON.Scene

  constructor() {
  }

  ngOnInit(): void {
    const engine = new BABYLON.Engine(this.canvas.nativeElement, true)
    const scene = new BABYLON.Scene(engine)

    // creating camera
    const camera = this.createCamera(scene, this.canvas.nativeElement)

    // allow mouse deplacement
    camera.attachControl(this.canvas.nativeElement, true)

    // creating minimal scean
    this.createScene(scene, this.canvas.nativeElement)

    // running babylonJS
    engine.runRenderLoop(() => {
      scene.render()
    })
  }

  createCamera(scene: BABYLON.Scene, canvas: HTMLCanvasElement) {
    const camera = new BABYLON.ArcRotateCamera(
      'Camera1',
      0,
      10,
      10,
      new BABYLON.Vector3(15, 30, -5),
      scene
    )

    camera.setTarget(BABYLON.Vector3.Zero())
    camera.attachControl(canvas, true)

    return camera
  }

  createScene(scene: BABYLON.Scene, canvas: HTMLCanvasElement) {
    const light = new BABYLON.HemisphericLight(
      'light',
      new BABYLON.Vector3(3, 6, 10),
      scene
    )
    light.intensity = 0.7

    const box = BABYLON.MeshBuilder.CreateBox(
      'Box',
      {width: 5, height: 5, depth: 5},
      scene
    )
    box.position.x = 0
    box.position.y = 0
    box.position.z = 0

    const sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 6, scene)
    sphere.position.x = -10
    sphere.position.y = 0
    sphere.position.z = -10

    // GUI PANEL
    const nextTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')
    const panel = new GUI.StackPanel()
    panel.width = '300px'
    panel.height = '300px'
    panel.paddingTop = '30px'
    panel.fontSize = '14px'
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
    nextTexture.addControl(panel)

    let statusMesh = ''
    const header = new GUI.TextBlock()
    header.text = 'scalling'
    header.height = "40px"
    header.color = "green"
    header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    panel.addControl(header)
    const slider = new GUI.Slider()
    slider.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    slider.minimum = 1
    slider.maximum = 5
    slider.value = 0
    slider.color = 'green'
    slider.height = '20px'
    slider.width = '200px'

    box.actionManager = new BABYLON.ActionManager(scene)
    box.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickUpTrigger,
        function () {
          box.enableEdgesRendering()
          box.edgesWidth = 10.0
          box.edgesColor = new BABYLON.Color4(0, 0, 1, 1)
          sphere.renderOutline = false
          statusMesh = 'box'
          console.log(statusMesh)
          header.text = 'scalling box'
          slider.value = box.scaling.x
        }
      )
    )

    sphere.actionManager = new BABYLON.ActionManager(scene)
    sphere.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickUpTrigger,
        function () {
          box.disableEdgesRendering()
          sphere.renderOutline = true
          statusMesh = 'sphere'
          console.log(statusMesh)
          header.text = 'scalling sphere'
          slider.value = sphere.scaling.x
        }
      )
    )

    slider.onValueChangedObservable.add((v) => {
      if (statusMesh == 'sphere') {
        sphere.scaling.x = v
      } else if (statusMesh == 'box') {
        box.scaling.x = v
      }
    })
    panel.addControl(slider)

    // let params = [
    //   {name: 'Scalling'},
    //   {name: 'PositionX'},
    //   {name: 'PositionY'},
    //   {name: 'RotationX'},
    //   {name: 'RotationY'},
    // ]
    //
    // params.forEach((params) => {
    //   const header = new GUI.TextBlock()
    //   header.text = params.name
    //   // header.paddingBottom = "37px"
    //   header.height = "40px"
    //   header.color = "green"
    //   header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    //   panel.addControl(header)
    //   const slider = new GUI.Slider()
    //   slider.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    //   slider.minimum = 1
    //   slider.maximum = 5
    //   slider.color = 'green'
    //   slider.value = 0
    //   slider.height = '20px'
    //   slider.width = '200px'
    //   slider.onValueChangedObservable.add((v) => {
    //     if (statusMesh == 'sphere') {
    //       sphere.scaling.x = v
    //     } else if (statusMesh == 'box') {
    //       box.scaling.x = v
    //     }
    //   })
    //   panel.addControl(slider)
    // })

  }
}
