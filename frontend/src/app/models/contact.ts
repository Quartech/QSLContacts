export class Contact {
  public name: String;
  public title: String;
  public phone: string;
  public email: String;
  public organization: String;

  constructor(contact) {
    this.name = contact.name;
    this.title = contact.title;
    this.email = contact.email;
    this.organization = contact.organization;
    this.phone = contact.phone;
  }
}
