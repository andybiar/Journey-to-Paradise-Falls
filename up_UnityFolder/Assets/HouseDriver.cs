using UnityEngine;
using System.Collections;

public class HouseDriver : MonoBehaviour {
	// SET THESE IN THE INSPECTOR
	public float lr_speed;
	public float forward_speed;
	public float up_speed;
	public float max_height;
	
	private float base_speed;

	// Use this for initialization
	void Start () {
		base_speed = forward_speed;
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
		
		
		// Timed speedups - pull the sails / storm winds
		if (Input.GetKey (KeyCode.Alpha1)) {
			forward_speed = base_speed;
		}
		if (Input.GetKey (KeyCode.Alpha2)) {
			forward_speed = base_speed * 2.0f;
		}
		if (Input.GetKey (KeyCode.Alpha3)) {
			forward_speed = base_speed * 2.6f;
		}
	}
}
