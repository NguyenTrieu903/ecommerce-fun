import { setTitle } from '../../utils/setTitle';

describe('setTitle utility', () => {
  const originalDocumentTitle = document.title;
  
  afterEach(() => {
    // Reset the document title after each test
    document.title = originalDocumentTitle;
  });
  
  test('sets document title with MegaMart suffix', () => {
    setTitle('Home');
    expect(document.title).toBe('Home - MegaMart');
    
    setTitle('Products');
    expect(document.title).toBe('Products - MegaMart');
    
    setTitle('');
    expect(document.title).toBe('- MegaMart');
  });
});
