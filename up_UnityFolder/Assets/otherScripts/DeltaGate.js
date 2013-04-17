#pragma strict

public var target: GameObject;
public var upspeedMultiplier: float = 1.0f;
public var newMaxHeight: float = -1.0f;
public var changeCam: boolean = false;
public var bayWindowObj: GameObject;
public var downViewObj: GameObject;

private var houseDriver: HouseDriver;
private var bayWindow: Camera;
private var downView: Camera;
private static var currentCamera: Camera;
private static var otherCamera: Camera;

private var passed: boolean = false;

function Awake() {
	houseDriver = target.GetComponent("HouseDriver");
	if (changeCam) {
		bayWindow = bayWindowObj.GetComponent("Camera");
		downView = downViewObj.GetComponent("Camera");
	
		currentCamera = bayWindow;
		otherCamera = downView;
	}
}

function Update() {
	if (!passed && target.transform.position.z > transform.position.z) {
		houseDriver.up_speed *= upspeedMultiplier;
		
		if (newMaxHeight > 0) houseDriver.max_height = newMaxHeight;
		
		if (changeCam) {
			currentCamera.enabled = false;
			otherCamera.enabled = true;
		
			var temp = currentCamera;
			currentCamera = otherCamera;
			otherCamera = temp;
		}
		passed = true;
		
	}
}