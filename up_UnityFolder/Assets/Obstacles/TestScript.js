#pragma strict

public var isRandom:boolean = true;
public var destroyTwo:boolean = true;
public var myNumber : int;

private var i;

function Start () {
	var randNum;
	i = myNumber;
	
	if (isRandom){
	
		randNum = Random.Range(1,4);
			
		//Debug.Log(randNum);
			
		switch(randNum) {
			case 1:
				Destroy(GameObject.Find("Generator"+i+"/B2"));
				if (destroyTwo)Destroy(GameObject.Find("Generator"+i+"/B3"));
				break;
			case 2:
				Destroy(GameObject.Find("Generator"+i+"/B1"));
				if(destroyTwo)Destroy(GameObject.Find("Generator"+i+"/B3"));
				break;
			case 3:
				Destroy(GameObject.Find("Generator"+i+"/B1"));
				if(destroyTwo)Destroy(GameObject.Find("Generator"+i+"/B2"));
				break;
		}
	}
}

function Update () {
}