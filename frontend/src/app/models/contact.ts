export class Contact {
  public name: String;
  public title: String;
  public phone: string;
  public email: string;
  public organization: string;

  constructor(contact) {
    this.name = (contact && contact.name) || '';
    this.title = (contact && contact.title) || '';
    this.email = (contact && contact.email) || '';
    this.organization = (contact && this.getCombinedOrganization(contact.organization, contact.organizationUnit)) || '';
    this.phone = (contact && contact.phone) || '';
  }

  /**
   * Builds a string containing organization and/or organizationUnit, contingent on the values being non-empty.
   * If the non-empty organization/organizationUnit are equal, return only the organization.
   * @return a string containing the organization and/or organizationUnit, or empty-string if both values are empty.
   */
  getCombinedOrganization(org, orgUnit): string {
    let combinedOrg = '';
    if (org && orgUnit) {
      if (org === orgUnit) {
        combinedOrg = org;
      } else {
        combinedOrg = `${org} - ${orgUnit}`;
      }
    } else if (org) {
      combinedOrg = org;
    } else if (orgUnit) {
      combinedOrg = orgUnit;
    }
    return combinedOrg;
  }
}
