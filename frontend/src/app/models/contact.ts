export class Contact {
  public name: String;
  public title: String;
  public phone: string;
  public email: String;
  public organization: String;

  constructor(contact) {
    this.name = contact && contact.name || '';
    this.title = contact && contact.title || '';
    this.email = contact && contact.email || '';
    this.organization = contact && contact.organization || '';
    this.phone = contact && contact.phone || '';
  }
}
