#pragma strict

function Start () {
	var i : int;
	var randNum;
	
	for(i = 1; i < 8; i++) {
			randNum = Random.Range(1,4);
			
		Debug.Log(randNum);
			
		switch(randNum) {
			case 1:
				Destroy(GameObject.Find("Generator"+i+"/B2"));
				Destroy(GameObject.Find("Generator"+i+"/B3"));
				break;
			case 2:
				Destroy(GameObject.Find("Generator"+i+"/B1"));
				Destroy(GameObject.Find("Generator"+i+"/B3"));
				break;
			case 3:
				Destroy(GameObject.Find("Generator"+i+"/B1"));
				Destroy(GameObject.Find("Generator"+i+"/B2"));
				break;
		}
	}
}

function Update () {
}