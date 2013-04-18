#pragma strict

public var cam:Camera;

function setCam(newcam:Camera) {
	cam = newcam;
}

function Update () {
	transform.LookAt(cam.transform);
	var euler:Vector3 = transform.rotation.eulerAngles;
	euler.z = 0;
	euler.y = 0;
	transform.rotation = Quaternion.Euler(euler);
}