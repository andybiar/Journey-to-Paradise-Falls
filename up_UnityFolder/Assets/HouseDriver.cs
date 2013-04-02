using UnityEngine;
using System.Collections;

public class HouseDriver : MonoBehaviour {
	public float lr_speed = 5.0f;
	public float forward_speed = 20.0f;
	public float up_speed = 5.0f;
	public float max_height = 180.0f;

	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {		
		// X Axis - Controlled by user input
		if ( Input.GetKey (KeyCode.D) ) {
			transform.position += transform.right * lr_speed * Time.deltaTime;
		}
		if ( Input.GetKey (KeyCode.A) ) {
			transform.position -=  transform.right * lr_speed * Time.deltaTime;
		}
		
		// Y Axis - Built In (up/down balloon movement)
		if (transform.position.y < max_height) {
			transform.position += transform.up * up_speed * Time.deltaTime;
		}
		
		// Z Axis - Built In (forward motion, affected by powerups/obstacles)
		transform.position += transform.forward * forward_speed * Time.deltaTime;
	}
}
