import vCard from 'vcards-js';
import { Person } from './xmlToJson';

/**
 * Parses a person into a vcard formatted string.
 * @param {Person} person a 'last, first' name string.
 * @return {vCard} a Names object.
 */
export function createVCard(person: Person): vCard {
  const vcard = vCard();

  vcard.version = '3.0';

  vcard.title = person.title;

  const name = parseName(person.name);
  vcard.firstName = name.first;
  vcard.lastName = name.last;

  vcard.workPhone = person.phone;
  vcard.organization = person.organization;
  vcard.email = person.email;

  return vcard;
}

/**
 * @interface Names
 */
interface Names {
  first: string;
  last: string;
}

/**
 * Parses a persons 'last, first' string into an object with first and last name fields.
 * @param {string} contactName a 'last, first' name string.
 * @return {Names} a Names object.
 */
function parseName (contactName: string): Names {
  if (!contactName) {
    return { first: '', last: '' };
  }
  const parts = contactName.split(',').map(part => part.trim());
  return { first: parts[1], last: parts[0] };
};
