#pragma strict

public var target: GameObject;
public var upspeedMultiplier: float = 1.0f;
public var newMaxHeight: float = -1.0f;

private var houseDriver: HouseDriver;

private var passed: boolean = false;

function Awake() {
	houseDriver = target.GetComponent("HouseDriver");
}

function Update() {
	if (!passed && target.transform.position.z > transform.position.z) {
		houseDriver.up_speed *= upspeedMultiplier;
		if (newMaxHeight > 0) houseDriver.max_height = newMaxHeight;
		passed = true;
	}
}