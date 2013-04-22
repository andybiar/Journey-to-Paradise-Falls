#pragma strict

public var target: GameObject;
public var upspeedMultiplier: float = 1.0f;
public var fspeedMultiplier: float = 1.0f;
public var newMaxHeight: float = -1.0f;
public var changeCam: boolean = false;
public var useExteriorCam:boolean = false;
public var exteriorCam: GameObject;
public var bayWindowObj: GameObject;
public var downViewObj: GameObject;
public var tweakCurrentCam: boolean = false;
public var newFieldOfView = -1;
public var xRotDiff = -1;
public var rots:float;
public var targetCam: GameObject;
public var ifPlane:boolean = false;
public var planeSpawn: GameObject;
public var toClouds:boolean=false;
public var changeSkybox: boolean=false;
public var newSkybox:Material;
public var toStorm:boolean;
public var endLevel:boolean=false;
public var oscrecobj:GameObject;

private var houseDriver: HouseDriver;
private var bayWindow: Camera;
private var downView: Camera;
private static var currentCamera: Camera;
private static var otherCamera: Camera;
private var camCont: CamControl;
private var extCam: Camera;
private var planeCont: PlaneControl;
private var balloonTracker: FaceCurrentCam;
private var oscrec:UnityOSCReceiver;

private var passed: boolean = false;

function Awake() {
	houseDriver = target.GetComponent("HouseDriver");
	balloonTracker = (target.GetComponentsInChildren(FaceCurrentCam))[0];
	if (endLevel) oscrec = oscrecobj.GetComponent("UnityOSCReceiver");
	if (changeCam) {
		if (useExteriorCam) extCam = exteriorCam.GetComponent("Camera");
		bayWindow = bayWindowObj.GetComponent("Camera");
		downView = downViewObj.GetComponent("Camera");
	
		currentCamera = bayWindow;
		otherCamera = downView;		
	}
	
	camCont = targetCam.GetComponent("CamControl");
	
	if (ifPlane) {
		planeCont = planeSpawn.GetComponent("PlaneControl");
	}
}

function Update() {
	if (!passed && target.transform.position.z > transform.position.z) {
		houseDriver.up_speed *= upspeedMultiplier;
		houseDriver.forward_speed *= fspeedMultiplier;
		
		if (newMaxHeight > 0) houseDriver.max_height = newMaxHeight;
		
		if (changeCam) {
			currentCamera.enabled = false;
			var temp = currentCamera;
			
			if (useExteriorCam) {
				extCam.enabled = true;
				currentCamera = extCam;
				
			}
			else {
				otherCamera.enabled = true;
				currentCamera = otherCamera;
			}
			balloonTracker.setCam(currentCamera);
		}
		
		if (tweakCurrentCam) {
			if (newFieldOfView > 0) camCont.setFOV(newFieldOfView);
			camCont.adjustRotation(xRotDiff, rots);
		}
		
		if (ifPlane) {
			planeCont.go = true;
			camCont.playPlane();
		}
		
		if (toClouds) {
			camCont.playClouds();
		}
		
		if (changeSkybox) {
			RenderSettings.skybox = newSkybox;
			if (toStorm) {
				RenderSettings.fogColor = Color.black;
				RenderSettings.fogDensity = .1;
				RenderSettings.fogMode = FogMode.Linear;
				RenderSettings.fogEndDistance = 400;
				RenderSettings.fogStartDistance = 1;
				camCont.playStorm();
			}
			else {
				RenderSettings.fogColor = Color.gray;
				RenderSettings.fogDensity = .01;
				RenderSettings.fogEndDistance = 700;
				RenderSettings.fogStartDistance = 120;
				camCont.playFalls();
			}
		}
		
		if (endLevel) {
		 	oscrec.disconnect();
		 	Application.LoadLevel(0);
		 }
		
		passed = true;
		
	}
}