import { Data,
          Datum,
          TimeSeries,
          Sensor,
          Temperature,
          Door,
          Humidity,
          FanSpeed,
          Light } from './index';


/* Cette fonction recupere les donnees du fichier Json et les stocke
 * sous forme des objets instanciés dans un tableau qui contient deux tableau:
 * le premier pour les objets de la classe Sensor et le deuxieme pour les objets de
 * la classe Data
 */
export function main(data) {
  var pas; // compteur de la boucle
  var Sensors = []; // Tableau des sensors
  var Data = []; // tableau des data

  // Parcouir le fichier sensors_data.js element par element
  for (pas = 0; pas < data.length; pas++) {
    /* Pour istancier les données, on s'interesse en premier lieu au type
     * et à partir de ce dernier on cree un objet de type(temperture, ...).
     * En dexieme lieu, on s'interesse à la partie data si elle contient un ou deux attributs :
     * si un seul attribut on crèe un objet de type Datum sinon de type TimeSeries
     */
    switch (data[pas].type) {
      case 'TEMPERATURE':
        Sensors[pas] = new Temperature(data[pas].id, data[pas].name);
        if (typeof data[pas].data.value === 'undefined') {
          Data[pas] = new TimeSeries(data[pas].data.values, data[pas].data.labels, Sensors[pas]);
        } else {
          if (isNaN(parseInt(data[pas].data.value))) {
            throw Error('On ne peut pas convertir des lettres en un entier');
          } else {
            Data[pas] = new Datum(data[pas].data.value, Sensors[pas]);
          }
        } break;

      case 'DOOR':
        Sensors[pas] = new Door(data[pas].id, data[pas].name);
        if (typeof data[pas].data.value === 'undefined') {
          Data[pas] = new TimeSeries(data[pas].data.values, data[pas].data.labels, Sensors[pas]);
        } else {
          if (isNaN(parseInt(data[pas].data.value))) {
            throw Error('On ne peut pas convertir des lettres en un entier');
          } else {
            Data[pas] = new Datum(data[pas].data.value, Sensors[pas]);
          }
        }
        break;
      case 'FAN_SPEED':
        Sensors[pas] = new FanSpeed(data[pas].id, data[pas].name);
        if (typeof data[pas].data.value === 'undefined') {
          Data[pas] = new TimeSeries(data[pas].data.values, data[pas].data.labels, Sensors[pas]);
        } else {
          if (isNaN(parseInt(data[pas].data.value))) {
            throw Error('On ne peut pas convertir des lettres en un entier');
          } else {
            Data[pas] = new Datum(data[pas].data.value, Sensors[pas]);
          }
        }
        break;
      case 'HUMIDITY':
        Sensors[pas] = new Humidity(data[pas].id, data[pas].name);
        if (typeof data[pas].data.value === 'undefined') {
          Data[pas] = new TimeSeries(data[pas].data.values, data[pas].data.labels, Sensors[pas]);
        } else {
          if (isNaN(parseInt(data[pas].data.value))) {
            throw Error('On ne peut pas convertir des lettres en un entier');
          } else {
            Data[pas] = new Datum(data[pas].data.value, Sensors[pas]);
          }
        }
        break;
      case 'LIGHT':
        Sensors[pas] = new Light(data[pas].id, data[pas].name);
        if (typeof data[pas].data.value === 'undefined') {
          Data[pas] = new TimeSeries(data[pas].data.values, data[pas].data.labels, Sensors[pas]);
        } else {
          if (isNaN(parseInt(data[pas].data.value))) {
            throw Error('On ne peut pas convertir des lettres en un entier');
          } else {
            Data[pas] = new Datum(data[pas].data.value, Sensors[pas]);
          }
        }
        break;

      default:
        throw Error('Ce type n\'existe pas');
        break;
    }

  /* // PARTIE AFFICHAGE DES DONNÉES :
    console.log(pas);
    console.log('id', Sensors[pas].Id);
    console.log('nom', Sensors[pas].Name);
    console.log('type', Sensors[pas].Type);
    console.log('');
    console.log('La partie data');
    console.log('id', Data[pas].SensorId);
    console.log('nom', Data[pas].SensorName);
    console.log('type', Data[pas].SensorType);

    if (typeof data[pas].data.value === 'undefined') {
      var i;
      for (i = 0; i < data[pas].data.values.length; i++) {
        console.log('values', Data[pas].Values[i]);
      }
      console.log();
      for (i = 0; i < data[pas].data.labels.length; i++) {
        console.log('labels', Data[pas].Labels[i]);
      }
    } else {
      console.log('valeur', Data[pas].Value);
      console.log('Type valeur', typeof (Data[pas].Value));
    }*/
  }
  const Donnees = []; // Tableau des donnees contient les deux tableaux Sensors et Data
  Donnees[0] = Sensors;
  Donnees[1] = Data;
  return Donnees;
}
