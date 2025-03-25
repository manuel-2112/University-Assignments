void setup()

{
pinMode(A0,INPUT);
pinMode(A1,INPUT);
Serial.begin(9600);
}
void loop()
{
int sv0=analogRead(A0);
int sv1=analogRead(A1);
Serial.print(sv0);
Serial.print(",");
Serial.print(sv1);
Serial.println("");

delay(100);
}
