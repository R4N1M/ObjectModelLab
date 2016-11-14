/*
 * Ce fichier contient les classes deduit à partir
 * du modele objet donné.
 */

export class Sensor {
  constructor(id, nom) {
    this.id = id + '';
    this.name = nom;
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

export class Temperature extends Sensor
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
export class Humidity extends Sensor
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

export class Light extends Sensor
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

export class Door extends Sensor
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

export class FanSpeed extends Sensor
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

// la classe Data contient un objet de la classe sensors
export class Data
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

export class TimeSeries extends Data
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

export class Datum extends Data
{
  constructor(valeur, sensor) {
    super(sensor);
    this.value = parseInt(valeur) || 0;
  }

  get Value() {
    return this.value || 0;
  }
  set Value(val) {
    this.value = val;
  }
}
