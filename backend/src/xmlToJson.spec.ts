import('mocha');
import * as chai from 'chai';
import * as xmlToJson from './xmlToJson';
describe('xmlToJson', function() {
  describe('#getBcGovPersonsFromXml()', function() {
    it('should throw an exception if passed undefined', function() {
      chai.expect( () => xmlToJson.getBcGovPersonsFromXml(undefined) ).to.throw(TypeError);
    });
    it('should return a name with all expected fields if passed correct xml', () => {
        const xml = '\
        <DIRECTORY xmlns="http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1 http://pub.data.gov.bc.ca/schemas/bcgov_directory/2012/1/bcgov_directory_2012_1.xsd">\
            <ORGANIZATION NAME="Agricultural Land Commission">\
                <ORGUNIT>\
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
            organization: 'Agricultural Land Commission'
        };
        chai.expect([expectedPerson]).eql(xmlToJson.getBcGovPersonsFromXml(xml));
    });
  });
});