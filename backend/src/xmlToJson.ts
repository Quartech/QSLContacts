import * as xml from 'xml-js';
import logger from './lib/logger';

export interface Person {
  name: string;
  title: string;
  phone: string;
  email: string;
  organization: string;
  organizationUnit: string;
}

/**
 * Convert the list of BC Government xml contacts into a flat list of Person objects.
 * @param xmlData a string containing the xml contact list.
 */
export function getBcGovPersonsFromXml(xmlData: string): Person[] {
  logger.debug('Starting xml parse');
  // TODO: evaluate performance impact of removing compact.
  const jsonObject: Object = xml.xml2js(xmlData, { compact: true });
  logger.debug('Finished parsing xml, building person list.');

  const persons = recurseBuildPersons(jsonObject, [], false, '', false, '');
  logger.debug('Finished building person list');
  return persons;
}

/**
 * Recurse through the JSON, adding all person JSON to the global persons object.
 * @param jsonData JSON translation of response containing all BC Gov contact information.
 * @param persons The current list of persons built up to this level of recursion.
 * @param isOrg true if the jsonData at this level of recursion is an organization.
 * @param organization the name of the organization at this level of recursion.
 * @param isOrgUnit true if the jsonData at this level of recursion is an organization unit.
 * @param organizationUnit the name of the organization unit at this level of recursion.
 */
function recurseBuildPersons(jsonData: any, persons: Person[], isOrg: boolean, organization: string, isOrgUnit: boolean, organizationUnit: string): Person[] {
  try {
    if (isOrg) {
      organization = getOrgName(jsonData);
      isOrg = false;
    } else if (isOrgUnit) {
      organizationUnit = getOrgName(jsonData);
      isOrgUnit = false;
    }
    Object.keys(jsonData).forEach((key: string) => {
      isOrg = key === 'ORGANIZATION';
      isOrgUnit = key === 'ORGUNIT';

      if (Array.isArray(jsonData[key])) {
        if (key === 'PERSON') {
          jsonData[key].forEach((personJson: Object) => {
            const person: Person = getPerson(personJson, organization, organizationUnit);
            if (person != undefined) persons.push(person);
          });
        }
        jsonData[key].forEach((jsonArrayElem: any) => {
          recurseBuildPersons(jsonArrayElem, persons, isOrg, organization, isOrgUnit, organizationUnit);
        });
      } else if (typeof jsonData[key] === 'object') {
        if (key === 'PERSON') {
          const person: Person = getPerson(jsonData[key], organization, organizationUnit);
          if (person != undefined) persons.push(person);
        }
        recurseBuildPersons(jsonData[key], persons, isOrg, organization, isOrgUnit, organizationUnit);
      }
    });
  } catch (err) {
    logger.error('Failed to parse JSON at current level of recursion with data:\n ' + jsonData + '\nand error: ' + err);
  }
  return persons;
}

/**
 *
 * @param jsonPersonData
 * @param organization The name of the organization at the current level of recursion.
 * @param organizationUnit The name of the organization unit at the current level of recursion.
 */
function getPerson(jsonPersonData: any, organization: string, organizationUnit: string): Person {
  try {
    return {
      name: getName(jsonPersonData['NAME']),
      title: getTitle(jsonPersonData['TITLE']),
      phone: getContactField(jsonPersonData['CONTACT'], 'telephone'),
      email: getContactField(jsonPersonData['CONTACT'], 'email'),
      organization: organization,
      organizationUnit: organizationUnit
    };
  } catch (err) {
    // TODO: reconsider this as logging happens every time the xml is translated.
    logger.verbose('\nfailed to parse person with error: ' + err + ' for person data:\n' + JSON.stringify(jsonPersonData) + '\n\n');
  }
}

/**
 * Get the name text value from the name JSON data. Filters for vacant name and returns ''.
 * @param nameJson JSON object containing Person name fields.
 * @throws if nameJson is undefined.
 */
function getName(nameJson: any): string {
  if (nameJson == undefined) {
    throw new Error('undefined person name field');
  }
  const name: string = nameJson['_text'];
  if (name.toLowerCase().includes('vacant, vacant') || name.toLocaleLowerCase() === 'vacant' || name.toLowerCase().includes('(vacant)')) {
    throw 'ignoring person named vacant';
  }
  return name || '';
}

/**
 * Get the title text value from the title JSON data, or ''.
 * @param titleJson
 */
function getTitle(titleJson: any): string {
  if (titleJson == undefined) {
    return '';
  }
  return titleJson['_text'] || '';
}

/**
 * Get the desired contact field from the contacts JSON data.
 * @param contactJson All of the JSON contact data for this person.
 * @param fieldName The 'TYPE' of contact data that should be returned.
 * @throws If contactJson is undefined.
 */
function getContactField(contactJson: any, fieldName: string): string {
  if (contactJson == undefined) {
    throw new Error('no contact data for person');
  } else if (Array.isArray(contactJson)) {
    let text: string = '';
    contactJson.forEach((contactInfo: any) => {
      if (contactInfo['_attributes']['TYPE'] === fieldName) {
        text = contactInfo['_text'];
      }
    });
    return text;
  } else {
    let text: string = '';
    if (contactJson['_attributes']['TYPE'] === fieldName) {
      text = contactJson['_text'];
    }
    return text;
  }
}

/**
 * Get the name attribute from the passed JSON data if the passed data is an organization or orgunit.
 * @param jsonData JSON object.
 */
function getOrgName(orgJson: any): string {
  if (orgJson == undefined) {
    return '';
  }
  const orgAttr: any = orgJson['_attributes'];
  if (orgAttr != undefined) {
    const orgName: string = orgAttr['NAME'];
    if (orgName != undefined) {
      return orgName;
    }
  }
  return '';
}
