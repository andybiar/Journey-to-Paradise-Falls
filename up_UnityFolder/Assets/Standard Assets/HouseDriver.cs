using UnityEngine;
using System.Collections;

public class HouseDriver : MonoBehaviour {
	// SET THESE IN THE INSPECTOR
	public float lr_speed;
	public float forward_speed;
	public float up_speed;
	public float max_height;
	
	private float base_speed;
    private Vector3 moveDirection = Vector3.zero;
	public CharacterController controller;
	
	private float xmov;
	private int prevInput = 0;
	private int newInput = 0;

	// Use this for initialization
	void Start () {
		base_speed = forward_speed;
	}
	
	public void NewSteeringInput(int input) {
		Debug.Log ("House driver received: " + input);
		prevInput = newInput;
		newInput = input;
	}
 
	// Update is called once per frame
	void Update () {
		xmov = (newInput - prevInput) * Time.deltaTime;
		
		// Change the forward speed
		if (Input.GetKey (KeyCode.Alpha1)) {
			forward_speed = base_speed;
		}
		if (Input.GetKey (KeyCode.Alpha2)) {
			forward_speed = base_speed * 2.0f;
		}
		if (Input.GetKey (KeyCode.Alpha3)) {
			forward_speed = base_speed * 2.6f;
		}
		
		///////// X Axis - Controlled by user input
		if ( Input.GetKey (KeyCode.D) ) {
			xmov += lr_speed * Time.deltaTime;
		}
		if ( Input.GetKey (KeyCode.A) ) {
			xmov -= lr_speed * Time.deltaTime;
		}
		
		//////// Built In (up/down balloon movement) Z on the jank
		if (transform.position.y < max_height) {
			transform.position += Vector3.up * up_speed * Time.deltaTime;
		}
		
		//////// forward motion, affected by powerups/obstacles) -Y on the jank
		transform.position += Vector3.forward * forward_speed * Time.deltaTime;
		
		Vector3 movdir = new Vector3(xmov, 0, 0);
		controller.Move(movdir);
	}
}
