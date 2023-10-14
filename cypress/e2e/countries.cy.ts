describe('Countries App', () => {
  
  beforeEach(() => {
    cy.intercept('https://restcountries.com/v3.1/all', { fixture: 'example.json' }).as('getCountries');
    cy.visit('https://csb-674xqm-nrclsxaaz-kamals-projects.vercel.app/');
  });
  // Use when using xpath code for 2nd last test case:
  // beforeEach(() => {
  //   // Mock your API response with a fixture
  //   cy.intercept('https://restcountries.com/v3.1/all', { fixture: 'example.json' }).as('getCountries');
    
  //   // Navigate to your page
  //   cy.visit('https://csb-674xqm-nrclsxaaz-kamals-projects.vercel.app/');

  //   // Wait for the API response to be intercepted
  //   cy.wait('@getCountries');
  // });

  it('initially displays a container with no country cards', () => {
    cy.get('div').should('exist'); // Assuming there's only one main container
    cy.get('img').should('not.exist'); // Assuming the flags are the only images
  });

  it('renders country cards upon successful API call', () => {
    cy.wait('@getCountries');
    cy.get('img').should('have.length', 3); // Assuming countries.json has 3 countries
  });

  it('correctly displays country flag and accompanying text for each card', () => {
    cy.wait(3000);
    cy.get('img').each(($img) => {
      // cy.wait(5000);
      cy.wrap($img).should('be.visible')
                   .next().should('be.visible')  // Checks that the element after the image is visible
                   .invoke('text').should('not.be.empty');  // Verifies it has some text
    });
  });
  
  // it('handles errors gracefully', () => {
  //   cy.window().then((win) => {
  //     cy.spy(win.console, 'error').as('consoleError');
  //   });
  //   cy.intercept('https://restcountries.com/v3.1/all', { statusCode: 500 }).as('getErrorCountries');
  //   cy.visit('http://localhost:3000/');
  //   cy.wait('@getErrorCountries');
  //   cy.get('@consoleError').should('have.been.calledWith', 'Error fetching data: ');
  // });
  it('handles errors gracefully', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError');
    });
    cy.intercept('https://restcountries.com/v3.1/all', { statusCode: 500 }).as('getErrorCountries');
    cy.visit('https://csb-674xqm-nrclsxaaz-kamals-projects.vercel.app/');
    cy.wait('@getErrorCountries');
    cy.get('@consoleError').should('be.calledOnce');
  });
  // Not working:
  // it('correctly displays country flag and accompanying text for each card', () => {
  //   cy.wait(3000); // Waiting for 3 seconds, though it's generally better to wait for elements to appear
    
  //   cy.fixture('example.json').then((countries) => {
  //     countries.forEach((country) => {
  //       // Find the image using XPath and make sure it's visible
  //       cy.xpath(`//img[@src="${country.flags.png}"]`).should('be.visible');
        
  //       // Navigate to the closest container (replace 'container' with the actual HTML element) and check for text
  //       cy.xpath(`//img[@src="${country.flags.png}"]/following::text()[contains(., "${country.name.common}")]`)
  //         .should('exist');
  //     });
  //   });
  // });
});


/*
describe('Countries App', () => {

  beforeEach(() => {
    // You can set up a default mock here if needed
    cy.intercept('https://restcountries.com/v3.1/all', { fixture: 'example.json' }).as('getCountries');
    cy.visit('http://localhost:3000/');
  });

  it('initially displays a container with no country cards', () => {
    cy.get('[style*="display: flex;"]').should('exist');
    cy.get('[style*="width: 200px;"]').should('not.exist');
  });

  it('renders country cards upon successful API call', () => {
    cy.wait('@getCountries');
    cy.get('[style*="width: 200px;"]').its('length').should('eq', 3); // Assuming countries.json has 250 countries
  });

  it('correctly displays country flag and name for each card', () => {
    cy.get('[style*="width: 200px;"]').each(($card) => {
      cy.wrap($card).find('img').should('be.visible');
      cy.wrap($card).find('h2').should('be.visible');
    });
  });

  // it('handles errors gracefully', () => {
  //   cy.intercept('https://restcountries.com/v3.1/all', { statusCode: 500 }).as('getErrorCountries');
  //   cy.visit('http://localhost:3000/');
  //   cy.wait('@getErrorCountries');
  //   cy.get('[style*="width: 200px;"]').should('not.exist');
  //   // This isn't the best way to test for console logs, but it's a simple approach. A more sophisticated error handling and display mechanism would be better.
  //   cy.window().its('console.error').should('be.calledWith', 'Error fetching data: ');
  // });

  it('handles errors gracefully', () => {
    // Step 1: Set up a spy
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError');
    });
    // Step 2: Intercept the API call
    cy.intercept('https://restcountries.com/v3.1/all', { statusCode: 500 }).as('getErrorCountries');
    // Step 3: Visit the site
    cy.visit('http://localhost:3000/');
    cy.wait('@getErrorCountries');
    // Step 4: Assert console.error was called
    cy.get('@consoleError').should('have.been.calledWith', 'Error fetching data: ');
  });


});
*/