import expect from 'expect';

import { Data,
          Datum,
          TimeSeries,
          Sensor,
          Temperature,
          Door,
          Humidity,
          FanSpeed,
          Light } from '../../src/model/index';
import { data } from './sensors_data';
import { main } from '../../src/model/main';

// Recuperer les donnees du fichier sensors_data et instancier les objets
var Donnees = main(data);

// Commencer les tests : Appliquer les tests sur les donnees recuperéesdu fichier Json
describe('Sensor model tests', () => {
  describe('test sur type', () => {
    it('le type de l"identifiant ', () => {
      for (let i = 0; i < Donnees[0].length; i++) {
        var t = Donnees[0][i];
        expect(t.Id).toBeA('string');
      }
    });

    it('le type du nom ', () => {
      for (let i = 0; i < Donnees[0].length; i++) {
        var t = Donnees[0][i];
        expect(typeof (t.Name)).toEqual('string');
      }
    });

    it('le type du type ', () => {
      for (let i = 0; i < Donnees[0].length; i++) {
        var t = Donnees[0][i];
        expect(typeof (t.Type)).toEqual('string');
      }
    });
  });
});

describe('Data model tests', () => {
  describe('test sur type', () => {
    it('le type du valeur ', () => {
      for (let i = 0; i < Donnees[1].length; i++) {
        var t = Donnees[1][i];
        if (t.constructor.name === 'Datum') {
          expect(typeof (t.Value)).toEqual('string');
        }
      }
    });

    it('le type du Labels est string', () => {
      for (let i = 0; i < Donnees[1].length; i++) {
        var t = Donnees[1][i];
        if (t.constructor.name === 'TimeSeries') {
          for (let j = 0; j < t.labels.length; j++) {
            expect(typeof (t.Labels[j])).toEqual('string');
          }
        }
      }
    });

    it('le type du Values est number', () => {
      for (let i = 0; i < Donnees[1].length; i++) {
        var t = Donnees[1][i];
        if (t.constructor.name === 'TimeSeries') {
          for (let j = 0; j < t.values.length; j++) {
            expect(typeof (t.Values[j])).toEqual('number');
          }
        }
      }
    });
  });

/*  describe('test sur la conversion à un entier', () => {
    it('La valeur de \'value\' ne peut pas etre convertit à une valeur', () => {
      const d = [
        {
          id: 'coucou',
          name: 'Porte du Salon',
          type: 'DOOR',
          data: {
            value: 'd124efrsd21',
          },
        },
      ];
      expect(() => {
        const truc = main(d);
        console.log(truc);
      }).toThrow(Error, 'On ne peut pas convertir des lettres en un entier');
    });
  });*/

  describe('test sur le nombre de valeurs et labels', () => {
    it('le nombre des valeurs egale au nombre de labels ', () => {
      for (let i = 0; i < Donnees[1].length; i++) {
        var t = Donnees[1][i];
        if (t.constructor.name === 'TimeSeries') {
          expect(t.Labels.length).toEqual(t.Values.length);
        }
      }
    });
  });

  describe('test sur les types d"un sensors', () => {
    it('Ce type n\'existe pas', () => {
      const d = [
        {
          id: 'coucou',
          name: 'Porte du Salon',
          type: 'dfgfdR',
          data: {
            value: '1',
          },
        },
      ];
      expect(
        () => {
          const truc = main(d);
          console.log(truc);
        }).toThrow(Error, 'Ce type n\'existe pas');
    });
  });
});
