import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
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
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(10, 15, -30), scene)

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
    panel.height = '350px'
    panel.paddingTop = '10px'
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

    const sliderRotationX = new GUI.Slider()
    sliderRotationX.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    sliderRotationX.minimum = 0
    sliderRotationX.maximum = 5
    sliderRotationX.value = 0
    sliderRotationX.color = 'green'
    sliderRotationX.height = '20px'
    sliderRotationX.width = '200px'

    const sliderRotationY = new GUI.Slider()
    sliderRotationY.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    sliderRotationY.minimum = 0
    sliderRotationY.maximum = 5
    sliderRotationY.value = 0
    sliderRotationY.color = 'green'
    sliderRotationY.height = '20px'
    sliderRotationY.width = '200px'

    const sliderPositionX = new GUI.Slider()
    sliderPositionX.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    sliderPositionX.minimum = -10
    sliderPositionX.maximum = 5
    sliderPositionX.value = 0
    sliderPositionX.color = 'green'
    sliderPositionX.height = '20px'
    sliderPositionX.width = '200px'

    const sliderPositionY = new GUI.Slider()
    sliderPositionY.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    sliderPositionY.minimum = 0
    sliderPositionY.maximum = 5
    sliderPositionY.value = 0
    sliderPositionY.color = 'green'
    sliderPositionY.height = '20px'
    sliderPositionY.width = '200px'

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
          slider.value = box.scaling.x
          sliderRotationX.value = box.rotation.x
          sliderRotationY.value = box.rotation.y
          sliderPositionX.value = box.position.x
          sliderPositionY.value = box.position.y
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
          slider.value = sphere.scaling.x
          sliderRotationX.value = sphere.rotation.x
          sliderRotationY.value = sphere.rotation.y
          sliderPositionX.value = sphere.position.x
          sliderPositionY.value = sphere.position.y
        }
      )
    )

    slider.onValueChangedObservable.add((v) => {
      if (statusMesh == 'sphere') {
        sphere.scaling.x = v
        header.text = 'scalling: ' + sphere.scaling.x.toFixed(2)
      } else if (statusMesh == 'box') {
        box.scaling.x = v
        header.text = 'scalling: ' + box.scaling.x.toFixed(2)
      }
    })
    panel.addControl(slider)

    const headerRotationX = new GUI.TextBlock()
    headerRotationX.text = 'rotationX'
    headerRotationX.height = "40px"
    headerRotationX.color = "green"
    headerRotationX.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    panel.addControl(headerRotationX)
    sliderRotationX.onValueChangedObservable.add((v) => {
      if (statusMesh == 'sphere') {
        sphere.rotation.x = v
        headerRotationX.text = 'rotationX: ' + sphere.rotation.x.toFixed(2)
      } else if (statusMesh == 'box') {
        box.rotation.x = v
        headerRotationX.text = 'rotationX: ' + box.rotation.x.toFixed(2)
      }
    })
    panel.addControl(sliderRotationX)

    const headerRotationY = new GUI.TextBlock()
    headerRotationY.text = 'rotationY'
    headerRotationY.height = "40px"
    headerRotationY.color = "green"
    headerRotationY.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    panel.addControl(headerRotationY)
    sliderRotationY.onValueChangedObservable.add((v) => {
      if (statusMesh == 'sphere') {
        sphere.rotation.y = v
        headerRotationY.text = 'rotationY: ' + sphere.rotation.y.toFixed(2)
      } else if (statusMesh == 'box') {
        box.rotation.y = v
        headerRotationY.text = 'rotationY: ' + box.rotation.y.toFixed(2)
      }
    })
    panel.addControl(sliderRotationY)

    const headerPositionX = new GUI.TextBlock()
    headerPositionX.text = 'positionX'
    headerPositionX.height = "40px"
    headerPositionX.color = "green"
    headerPositionX.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    panel.addControl(headerPositionX)
    sliderPositionX.onValueChangedObservable.add((v) => {
      if (statusMesh == 'sphere') {
        sphere.position.x = v
        headerPositionX.text = 'positionX: ' + sphere.position.x.toFixed(2)
      } else if (statusMesh == 'box') {
        box.position.x = v
        headerPositionX.text = 'positionX: ' + box.position.x.toFixed(2)
      }
    })
    panel.addControl(sliderPositionX)

    const headerPositionY = new GUI.TextBlock()
    headerPositionY.text = 'positionY'
    headerPositionY.height = "40px"
    headerPositionY.color = "green"
    headerPositionY.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    panel.addControl(headerPositionY)
    sliderPositionY.onValueChangedObservable.add((v) => {
      if (statusMesh == 'sphere') {
        sphere.position.y = v
        headerPositionY.text = 'positionY: ' + sphere.position.y.toFixed(2)
      } else if (statusMesh == 'box') {
        box.position.y = v
        headerPositionY.text = 'positionY: ' + box.position.y.toFixed(2)
      }
    })
    panel.addControl(sliderPositionY)
  }
}
