import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '@app/models/contact';

@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {
  transform(contactList: Array<Contact>, searchString: String): Array<Contact> {
    if (searchString) {
      // normalize search terms
      const searchTerms = searchString.split(' ').filter(term => {
        return term !== ' ';
      });

      // match all search terms in each contact
      return contactList.filter(item => {
        let isMatch = true;
        searchTerms.forEach(term => {
          isMatch =
            isMatch &&
            (item.name.toLowerCase().includes(term.toLowerCase()) ||
              item.title.toLowerCase().includes(term.toLowerCase()) ||
              item.organization.toLowerCase().includes(term.toLowerCase()) ||
              item.organizationUnit.toLowerCase().includes(term.toLowerCase()) ||
              item.email.toLowerCase().includes(term.toLowerCase()) ||
              item.phone.toLowerCase().includes(term.toLowerCase()));
        });
        return isMatch;
      });
    } else {
      return contactList;
    }
  }
}
