import 'mocha';
import * as chai from 'chai';
import * as xmlToJson from './xmlToJson';
import * as fs from 'fs-extra';
const inFile = './tests/mocks/mockInput.xml';
const outFile = './tests/mocks/mockOutput.json';

describe('xmlToJson', function() {
  describe('#getBcGovPersonsFromXml()', function() {
    it('should throw an exception if passed undefined', function() {
      chai.expect(() => xmlToJson.getBcGovPersonsFromXml(undefined)).to.throw(TypeError);
    });

    it('should produce an empty list when there are no persons', () => {
      const xml = '\
        <DIRECTORY xmlns="http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1 http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1/bcgov_directory_2012_1.xsd">\
            <ORGANIZATION NAME="Agricultural Land Commission">\
                <ORGUNIT>\
                </ORGUNIT>\
            </ORGANIZATION>\
        </DIRECTORY>';
      chai.expect(xmlToJson.getBcGovPersonsFromXml(xml)).eql([]);
    });

    it('should return a name with all expected fields if passed correct xml', () => {
      const xml = '\
        <DIRECTORY xmlns="http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1 http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1/bcgov_directory_2012_1.xsd">\
            <ORGANIZATION NAME="Agricultural Land Commission">\
                <ORGUNIT NAME="Agricultural Land Commission Unit">\
                    <PERSON>\
                        <TITLE>faker</TITLE>\
                        <NAME>Fake, Fakerson</NAME>\
                        <CONTACT TYPE="telephone">604 660-7007</CONTACT>\
                        <CONTACT TYPE="email">Fake.Fakerson@gov.bc.ca</CONTACT>\
                    </PERSON>\
                </ORGUNIT>\
            </ORGANIZATION>\
        </DIRECTORY>';
      const expectedPerson = {
        name: 'Fake, Fakerson',
        title: 'faker',
        phone: '604 660-7007',
        email: 'Fake.Fakerson@gov.bc.ca',
        organization: 'Agricultural Land Commission',
        organizationUnit: 'Agricultural Land Commission Unit'
      };
      chai.expect(xmlToJson.getBcGovPersonsFromXml(xml)).eql([expectedPerson]);
    });

    it('should ignore persons with no name', () => {
      const xml = '\
      <DIRECTORY xmlns="http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1 http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1/bcgov_directory_2012_1.xsd">\
          <ORGANIZATION NAME="Agricultural Land Commission">\
              <ORGUNIT NAME="Agricultural Land Commission Unit">\
                  <PERSON>\
                      <TITLE>faker</TITLE>\
                      <NAME>Fake, Fakerson</NAME>\
                      <CONTACT TYPE="telephone">604 660-7007</CONTACT>\
                      <CONTACT TYPE="email">Fake.Fakerson@gov.bc.ca</CONTACT>\
                  </PERSON>\
                  <PERSON>\
                      <TITLE>invalid</TITLE>\
                      <CONTACT TYPE="telephone">604 660-7007</CONTACT>\
                      <CONTACT TYPE="email">invalid.invalid@gov.bc.ca</CONTACT>\
                  </PERSON>\
              </ORGUNIT>\
          </ORGANIZATION>\
      </DIRECTORY>';
      const expectedPerson = {
        name: 'Fake, Fakerson',
        title: 'faker',
        phone: '604 660-7007',
        email: 'Fake.Fakerson@gov.bc.ca',
        organization: 'Agricultural Land Commission',
        organizationUnit: 'Agricultural Land Commission Unit'
      };
      chai.expect(xmlToJson.getBcGovPersonsFromXml(xml)).eql([expectedPerson]);
    });

    it('should ignore persons with no contacts', () => {
      const xml = '\
      <DIRECTORY xmlns="http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1 http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1/bcgov_directory_2012_1.xsd">\
          <ORGANIZATION NAME="Agricultural Land Commission">\
              <ORGUNIT NAME="Agricultural Land Commission Unit">\
                  <PERSON>\
                      <TITLE>faker</TITLE>\
                      <NAME>Fake, Fakerson</NAME>\
                      <CONTACT TYPE="telephone">604 660-7007</CONTACT>\
                      <CONTACT TYPE="email">Fake.Fakerson@gov.bc.ca</CONTACT>\
                  </PERSON>\
                  <PERSON>\
                      <NAME>invalid, invalid</NAME>\
                      <TITLE>invalid</TITLE>\
                  </PERSON>\
              </ORGUNIT>\
          </ORGANIZATION>\
      </DIRECTORY>';
      const expectedPerson = {
        name: 'Fake, Fakerson',
        title: 'faker',
        phone: '604 660-7007',
        email: 'Fake.Fakerson@gov.bc.ca',
        organization: 'Agricultural Land Commission',
        organizationUnit: 'Agricultural Land Commission Unit'
      };
      chai.expect(xmlToJson.getBcGovPersonsFromXml(xml)).eql([expectedPerson]);
    });

    it('should ignore vacant persons', () => {
      const xml = '\
      <DIRECTORY xmlns="http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1 http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1/bcgov_directory_2012_1.xsd">\
          <ORGANIZATION NAME="Agricultural Land Commission">\
              <ORGUNIT NAME="Agricultural Land Commission Unit">\
                  <PERSON>\
                      <TITLE>faker</TITLE>\
                      <NAME>vacant</NAME>\
                      <CONTACT TYPE="telephone">604 660-7007</CONTACT>\
                      <CONTACT TYPE="email">Fake.Fakerson@gov.bc.ca</CONTACT>\
                  </PERSON>\
                  <PERSON>\
                      <TITLE>faker</TITLE>\
                      <NAME>(vacant)</NAME>\
                      <CONTACT TYPE="telephone">604 660-7007</CONTACT>\
                      <CONTACT TYPE="email">Fake.Fakerson@gov.bc.ca</CONTACT>\
                  </PERSON>\
                  <PERSON>\
                      <TITLE>faker</TITLE>\
                      <NAME>vacant, vacant</NAME>\
                      <CONTACT TYPE="telephone">604 660-7007</CONTACT>\
                      <CONTACT TYPE="email">Fake.Fakerson@gov.bc.ca</CONTACT>\
                  </PERSON>\
              </ORGUNIT>\
          </ORGANIZATION>\
      </DIRECTORY>';
      chai.expect([]).eql(xmlToJson.getBcGovPersonsFromXml(xml));
    });

    it('should produce the expected json output when passed a large input xml', () => {
      const inputXml = fs.readFileSync(inFile).toString();
      const outputJson = fs.readJsonSync(outFile);

      chai.expect(xmlToJson.getBcGovPersonsFromXml(inputXml)).eql(outputJson.persons);
    });
  });
});
