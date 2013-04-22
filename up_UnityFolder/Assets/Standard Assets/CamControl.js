#pragma strict

private var targetRot:float = 0;
private var targetFOV:float;
private var cam:Camera;
private var rotCount = 0;

public var PlaneSound:AudioClip;
public var AirSound:AudioClip;
public var CloudSound:AudioClip;
public var StormSound:AudioClip;
public var WaterfallSound:AudioClip;
public var ParadiseSound:AudioClip;
private var rots: int;

function Start () {
	cam = GetComponent("Camera");
	targetFOV = cam.fieldOfView;
}

function adjustRotation(dx:float, rotsby:int) {
	targetRot = dx;
	rots = rotsby;
}

function setFOV(x:float) {
	targetFOV = x;
}

function playPlane() {
	AudioSource.PlayClipAtPoint(PlaneSound, transform.position);
	AudioSource.PlayClipAtPoint(AirSound, transform.position);
}

function playClouds() {
	AudioSource.PlayClipAtPoint(CloudSound, transform.position);
}

function playStorm() {
	AudioSource.PlayClipAtPoint(StormSound, transform.position);
}

function playFalls() {
	AudioSource.PlayClipAtPoint(WaterfallSound, transform.position);
	AudioSource.PlayClipAtPoint(ParadiseSound, transform.position);
}

function Update () {
	if (targetRot > 0 && rotCount < rots) {
		transform.Rotate(Vector3(.25, 0, 0));
		rotCount++;
	}
	
	if (targetRot < 0 && rotCount < rots) {
		transform.Rotate(Vector3(-.25, 0, 0));
		rotCount++;
	}
	
	if (rotCount == 20) {
		targetRot = 0;
		rotCount = 0;
	}
	
	if (cam.fieldOfView - targetFOV < -1) {
		cam.fieldOfView += .5;
	}
	
	else if (cam.fieldOfView - targetFOV > 1) {
		cam.fieldOfView -= .5;
	}
}