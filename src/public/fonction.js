/******************************************************************************************* */
/********************************   PARTIE CLASSES  ******************************************/
/*********************************************************************************************/


/*
 * Ce fichier contient les classes deduit à partir
 * du modele objet donné.
 */

class Sensor {
  constructor(id, nom) {
    this.id = id + '';
    this.name = nom || '';
  }
  get Id() {
    return this.id || '';
  }
  set Id(val) {
    this.id = val;
  }
  get Name() {
    return this.name || '';
  }
  set Name(val) {
    this.name = val;
  }

}

class Temperature extends Sensor
{
  constructor(Id, Nom) {
    super(Id, Nom);
    this.type = 'Temperature';
  }
  get Type() {
    return this.type || '';
  }
  set Type(val) {
    this.type = val;
  }

}
class Humidity extends Sensor
{
  constructor(Id, Nom) {
    super(Id, Nom);
    this.type = 'Humidity';
  }

  get Type() {
    return this.type || '';
  }
  set Type(val) {
    this.type = val;
  }
}

class Light extends Sensor
{
  constructor(Id, Nom) {
    super(Id, Nom);
    this.type = 'Light';
  }

  get Type() {
    return this.type || '';
  }
  set Type(val) {
    this.type = val;
  }
}

class Door extends Sensor
{
  constructor(Id, Nom) {
    super(Id, Nom);
    this.type = 'Door';
  }

  get Type() {
    return this.type || '';
  }
  set Type(val) {
    this.type = val;
  }
}

class FanSpeed extends Sensor
{
  constructor(Id, Nom) {
    super(Id, Nom);
    this.type = 'Fan_Speed';
  }

  get Type() {
    return this.type || '';
  }
  set Type(val) {
    this.type = val;
  }
}

class POSITIVE_NUMBER extends Sensor
{
  constructor(Id, Nom) {
    super(Id, Nom);
    this.type = 'POSITIVE_NUMBER';
  }

  get Type() {
    return this.type || '';
  }
  set Type(val) {
    this.type = val;
  }
}

class PERCENT extends Sensor
{
  constructor(Id, Nom) {
    super(Id, Nom);
    this.type = 'PERCENT';
  }

  get Type() {
    return this.type || '';
  }
  set Type(val) {
    this.type = val;
  }
}
class ON_OFF extends Sensor
{
  constructor(Id, Nom) {
    super(Id, Nom);
    this.type = 'ON_OFF';
  }

  get Type() {
    return this.type || '';
  }
  set Type(val) {
    this.type = val;
  }
}

class OPEN_CLOSE extends Sensor
{
  constructor(Id, Nom) {
    super(Id, Nom);
    this.type = 'OPEN_CLOSE';
  }

  get Type() {
    return this.type || '';
  }
  set Type(val) {
    this.type = val;
  }
}

// la classe Data contient un objet de la classe sensors
class Data
{
  constructor(sensor) {
    this.sensor = sensor;
  }
  get SensorId() {
    return this.sensor.Id;
  }
  get SensorName() {
    return this.sensor.Name;
  }

  get SensorType() {
    return this.sensor.Type;
  }

  set SensorId(val) {
    this.sensor.Id = val;
  }
  set SensorName(val) {
    this.sensor.Name = val;
  }

  set SensorType(val) {
    this.sensor.Type = val;
  }

}

class TimeSeries extends Data
{
  constructor(Values, Labels, sensor) {
    super(sensor);
    this.values = Values || [];
    this.labels = Labels || [];
  }

  get Values() {
    return this.values || [];
  }
  set Values(val) {
    this.values = val;
  }

  get Labels() {
    return this.labels || '';
  }
  set Labels(val) {
    this.labels = val;
  }
}

class Datum extends Data
{
  constructor(valeur, sensor) {
    super(sensor);
    this.value = valeur.toString() || '';
  }

  get Value() {
    return this.value || '';
  }
  set Value(val) {
    this.value = val.toString();
  }
}


/************************************************************************************************************************** */
/********************************   PARTIE  fonctions            *********************************************************/
/****************************************************************************************************************************/


/* Cette fonction recupere les donnees du fichier Json et les stocke
 * sous forme des objets instanciés dans un tableau qui contient deux tableau:
 * le premier pour les objets de la classe Sensor et le deuxieme pour les objets de
 * la classe Data
 */
function instancier(data) {
  var Sensors = ''; // Tableau des sensors
  var Data = ''; // tableau des data

    /*  Instancier les donnees  */
  switch (data[1].type) {
    case 'TEMPERATURE':
      Sensors = new Temperature(data[0].ID);
      Data = new Datum(data[1].value, Sensors);
      break;

    case 'DOOR':
      Sensors = new Door(data[0].ID);
      Data = new Datum(data[1].value, Sensors);
      break;

    case 'FAN_SPEED':
      Sensors = new FanSpeed(data[0].ID);
      Data = new Datum(data[1].value, Sensors);
      break;

    case 'HUMIDITY':
      Sensors = new Humidity(data[0].ID);
      Data = new Datum(data[1].value, Sensors);
      break;

    case 'LIGHT':
      Sensors = new Light(data[0].ID);
      Data = new Datum(data[1].value, Sensors);
      break;

    case 'POSITIVE_NUMBER':
      Sensors = new POSITIVE_NUMBER(data[0].ID);
      Data = new Datum(data[1].value, Sensors);
      break;

    case 'PERCENT':
      Sensors = new PERCENT(data[0].ID);
      Data = new Datum(data[1].value, Sensors);
      break;

    case 'ON_OFF':
      Sensors = new ON_OFF(data[0].ID);
      Data = new Datum(data[1].value, Sensors);
      break;

    case 'OPEN_CLOSE':
      Sensors = new OPEN_CLOSE(data[0].ID);
      Data = new Datum(data[1].value, Sensors);
      break;

    default:
      throw Error('Ce type n\'existe pas');
      break;
  }

  const Donnees = []; // Tableau des donnees contient les deux tableaux Sensors et Data
  Donnees[0] = Sensors;
  Donnees[1] = Data;
  return Donnees;
}

// Convertir le fichier JSON
function construireFichierJSON(topic, message) {
  var t = topic.split('/');
  var donnee = '';
  var string = "[ {\"ID\": \""+t[1]+"\"} ,"+message+"]" ;
  donnee = JSON.parse(string);
  return (donnee);
}

/************************************************************************************************************************** */
/******************************** CODE PRINCIPALE                 *********************************************************/
/****************************************************************************************************************************/

// Connexion au serveur MQTT
var clientMQTT = mqtt.connect('mqtt://localhost:8080');
clientMQTT.subscribe("#");
clientMQTT.on("message", function (topic, message) {

  //convertir les donnees  sous forme d'un JSON
  var d = construireFichierJSON(topic.toString(), message.toString());

  // Instancier les sensors
  var instance = instancier(d);

  /* Recuperer les donnees deja envoyèes et tester si l'identifiant existe deja: */
  /* si oui on change juste la valeur sinon on affiche le nouveau sensors  */
  try {
    var tabid = document.querySelector('#'+instance[0].Id);
    tabid.textContent = instance[1].Value;

  } catch (e) {
    const tr = document.createElement('tr');
    const tdID = document.createElement('td');
    const tdType = document.createElement('td');
    const tdValue = document.createElement('td');
    tdValue.setAttribute('id', instance[0].Id);

    tdID.textContent = instance[0].Id;
    tdType.textContent = instance[0].Type;
    tdValue.textContent = instance[1].Value;

    tr.appendChild(tdID);
    tr.appendChild(tdType);
    tr.appendChild(tdValue);

    document.querySelector('#tableau').appendChild(tr);
  }
});
