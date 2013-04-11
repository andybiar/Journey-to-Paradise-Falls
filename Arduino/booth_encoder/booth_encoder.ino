/*
  Neil Abcouwer and Andy Biar
 
  Uno Encoder
  SigEp Booth 2013
  2013-04-10
  
  Wiring Instructions
  BLACK->GND
  WHITE->5V
  YELLOW(A)->Pin2
  RED(B)->Pin3
 */

#define ENCODER_PIN_A 2 //Yellow Line
#define ENCODER_PIN_B 3 //Red Line
#define ENCODER_TICKS_PER_REV 128  // The encoder will increase 128 ticks per revolution
#define UPDATE_INTERVAL 40 // The serial will send a new value every X millis
#define SECS_IN_MINUTE 60 
#define DEGREES_IN_REV 360
#define MILLIS_IN_SECOND 1000
#define BAUD_RATE 9600

volatile long encoderPos = 0;  // For unsigned positions, make unsigned long. MUST BE VOLATILE
long lastPos = 0; // For unsigned positions, make unsigned long
long degreePos = 0; // Position in degrees
double tickSpeed = 0; // Speed in ticks/sec
double rpmSpeed = 0; // Speed in RPM


/* Read Serial
 *
 * Allows the program to accept serial. 
 * This will zero out the encoder when a 'z' is recieved. 
 * Other commands can be added
 */
void read_serial(){
  char command;
  int value;

  if(Serial.available() > 0){
    command = Serial.read();
    value = Serial.parseInt();
    Serial.read();
    
    switch(command){
      case 'z':
        encoderPos = 0; 
    }
  }
}

/* Setup
 *
 * This runs when the Arduino starts.
 *
 * Setup Pins and Interrupts for the encoder.
 */
void setup() 
{
  pinMode(ENCODER_PIN_A, INPUT); 
  pinMode(ENCODER_PIN_B, INPUT); 
  
  //turn on pullups to make encoder work
  digitalWrite(ENCODER_PIN_A, HIGH);
  digitalWrite(ENCODER_PIN_B, HIGH);

  // encoder pin on interrupt 0 (pin 2)
  attachInterrupt(0, doEncoderA, CHANGE);

  // encoder pin on interrupt 1 (pin 3)
  attachInterrupt(1, doEncoderB, CHANGE);  

  Serial.begin (BAUD_RATE);
}

/* Loop
 *
 * This runs after Setup and Loops forever.
 *
 * Reports position every update interval
 * Can add other position formats or speed info
 */
void loop()
{
  read_serial(); //Check for serial commands
//  lastPos = encoderPos;
  delay(UPDATE_INTERVAL);
  degreePos = (encoderPos * DEGREES_IN_REV) / ENCODER_TICKS_PER_REV;
//  tickSpeed = ((encoderPos - lastPos)*MILLIS_IN_SECOND)/UPDATE_INTERVAL;
//  rpmSpeed = (tickSpeed * SECS_IN_MINUTE) / ENCODER_TICKS_PER_REV;

    Serial.print(long(encoderPos)); 
//  Serial.print("\t"); 
//  Serial.print(degreePos); 
//  Serial.print("\t"); 
//  Serial.print(tickSpeed); 
//  Serial.print("\t"); 
//  Serial.print(rpmSpeed); 
    Serial.println(); 
}

/* doEncoderA
 *
 * This interrupt is attatched to the encoder pin A and updates encoderPos
 */
void doEncoderA(){   
  if (digitalRead(ENCODER_PIN_A) == HIGH) { // look for a low-to-high on channel A
    if (digitalRead(ENCODER_PIN_B) == LOW) // check channel B to see which way encoder is turning
      encoderPos = encoderPos - 1;         // CW
    else
      encoderPos = encoderPos + 1;         // CCW
  }
  else{ // must be a high-to-low edge on channel A                                       
    if (digitalRead(ENCODER_PIN_B) == HIGH)      // check channel B to see which way encoder is turning   
      encoderPos = encoderPos - 1;          // CW
    else 
      encoderPos = encoderPos + 1;          // CCW
  }
}

/* doEncoderB
 *
 * This interrupt is attatched to the encoder pin B and updates encoderPos
 */
void doEncoderB(){
  if (digitalRead(ENCODER_PIN_B) == HIGH) {   // look for a low-to-high on channel B
    if (digitalRead(ENCODER_PIN_A) == HIGH)       // check channel A to see which way encoder is turning
      encoderPos = encoderPos - 1;         // CW
    else
      encoderPos = encoderPos + 1;         // CCW
  }
  else {   // Look for a high-to-low on channel B
    if (digitalRead(ENCODER_PIN_A) == LOW)       // check channel B to see which way encoder is turning  
      encoderPos = encoderPos - 1;          // CW
    else
      encoderPos = encoderPos + 1;          // CCW
  }
} 

