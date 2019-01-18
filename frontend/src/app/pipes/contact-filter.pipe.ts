import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '@app/models/contact';

@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {
  transform(contactList: Array<Contact>, searchString: String): Array<Contact> {
    if (searchString) {
      // normalize search terms

      //remove any exact matches
      const exactRegex = /(\".*?\")/
      const exactSearchMatches = exactRegex.exec(searchString.toString());
      let exactSearchTerms = [];
      if(exactSearchMatches && exactSearchMatches.length > 1) {
        //ignore the text match, only want the groups.
        exactSearchMatches.splice(0, 1);
        exactSearchTerms = exactSearchMatches.map((term, index) => {
            //get rid of the exact matches from the original search string so that the terms are only processed once.
            searchString = searchString.replace(term, '');
            //remove the " characters from the exact search term
            return term.replace(new RegExp('"', 'g'), '');
        });
      }
      
      const searchTerms = searchString.split(' ').filter(term => {
        return term !== ' ' && term !== '';
      });
      const allSearchTerms = searchTerms.concat(exactSearchTerms);

      // match all search terms in each contact
      return contactList.filter(item => {
        let isMatch = true;
        allSearchTerms.forEach(term => {
          //remove any " characters from the search term (the user probably has started typing an exact match, so ignore the ").
          term = term.replace(new RegExp('"', 'g'), '');
          isMatch =
            isMatch &&
            (item.name.toLowerCase().includes(term.toLowerCase()) ||
              item.title.toLowerCase().includes(term.toLowerCase()) ||
              item.organization.toLowerCase().includes(term.toLowerCase()) ||
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
