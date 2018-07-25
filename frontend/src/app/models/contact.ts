export class Contact {
  public name: String;
  public title: String;
  public phone: string;
  public email: string;
  public organization: string;
  public organizationUnit: string;

  constructor(contact) {
    this.name = (contact && contact.name) || '';
    this.title = (contact && contact.title) || '';
    this.email = (contact && contact.email) || '';
    this.organization = (contact && contact.organization) || '';
    this.organizationUnit = (contact && contact.organizationUnit) || '';
    this.phone = (contact && contact.phone) || '';
  }

  /**
   * Builds a string containing organization and/or organizationUnit, contingent on the values being non-empty.
   * If the non-empty organization/organizationUnit are equal, return only the organization.
   * @return a string containing the organization and/or organizationUnit, or empty-string if both values are empty.
   */
  getCombinedOrganization(): string {
    let combinedOrg = '';
    if (this.organization && this.organizationUnit) {
      if (this.organization === this.organizationUnit) {
        combinedOrg = this.organization;
      } else {
        combinedOrg = `${this.organization} - ${this.organizationUnit}`;
      }
    } else if (this.organization) {
      combinedOrg = this.organizationUnit;
    } else if (this.organizationUnit) {
      combinedOrg = this.organizationUnit;
    }
    return combinedOrg;
  }
}
