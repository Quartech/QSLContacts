import { ContactFilterPipe } from './contact-filter.pipe';

describe('ContactFilterPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new ContactFilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
