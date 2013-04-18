#pragma strict

public var speed: float;
public var go: boolean = false;
//private var aud:AudioSource;

function Start () {
	//aud = GetComponent("AudioSource");
	//if(aud == null) Debug.Log("wtf mate");
}

function Update () {
	if (go) {
		transform.position += (Vector3.forward * -1) * speed * Time.deltaTime;
	}
}