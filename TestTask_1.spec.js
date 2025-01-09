describe('Check status codes for pages list', () => {
    const urls = [
      'http://github.com/',
      'https://github.com/',
      'https://www.github.com/',
      'https://www.github.com/test/',
      'https://github.com/testlololo',
      'https://github.com/test?lol',
    ];
  
    const expectedStatusCodes = {
      'http://github.com/': 307,
      'https://github.com/': 200,
      'https://www.github.com/': 301,
      'https://www.github.com/test/': 301,
      'https://github.com/testlololo': 404,
      'https://github.com/test?lol': 200,
    };
  
    urls.forEach((url) => {
      it(`checks status code and content for ${url}`, () => {
        const expectedStatusCode = expectedStatusCodes[url];
  
        cy.request({ url, followRedirect: false }).then((response) => {
          expect(response.status).to.equal(expectedStatusCode);
  
          if (expectedStatusCode === 200) {
            cy.visit(url);
  
            cy.title().should('contain', 'GitHub'); 
            cy.get('meta[name="description"]').should('exist'); 
            cy.get('h1').should('exist'); 
          }
        });
      });
    });
  });