describe('empty spec', () => {
  beforeEach(()=>{
  cy.intercept('GET', 'http://localhost:3001/api/v1/urls',{
    statusCode: 201,
    fixture: 'urlsGet'
  }).as('get')
  cy.intercept('POST', 'http://localhost:3001/api/v1/urls',{
    statusCode: 201,
    fixture: 'urlsPost'
  }).as('post')
  cy.visit('http://localhost:3000/').wait('@get')
  })
  it('When a user visits the page, they can view the page title, form and the existing shortened URLs', () => {
    cy.get('header').contains('h1','URL Shortener').should('be.visible')
    .get('input[name="title"]').should('be.visible')
    .get('input[name="urlToShorten"]').should('be.visible')
    .get('form').contains('button','Shorten Please!').should('be.visible')
    .get('section').children().should('have.length',3)
    .get('section').children().first().contains('h3', 'Awesome photo')
    .get('section').children().first().contains('a', 'http://localhost:3001/useshorturl/1')
    .get('section').children().first().contains('p', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
    .get('section').children().last().contains('h3', "ben's url shortener api")
    .get('section').children().last().contains('a', 'http://localhost:3001/useshorturl/3')
    .get('section').children().last().contains('p', 'https://github.com/turingschool-examples/url-shortener-api')
  })
  it('When a user fills out the form, the information is reflected in the input field values', () => {
    cy.get('input[name="title"]').type('LadyBug').should('have.value','LadyBug')
    .get('input[name="urlToShorten"]').type('https://cdn.branchcms.com/w7EpyeBpNP-1159/images/lady-bug-on-stem-in-ny.jpg').should('have.value','https://cdn.branchcms.com/w7EpyeBpNP-1159/images/lady-bug-on-stem-in-ny.jpg')
  })
  it('When a user fills out and submits the form, the new shortened URL is rendered', () => {
    cy.get('input[name="title"]').type('LadyBug')
    .get('input[name="urlToShorten"]').type('https://cdn.branchcms.com/w7EpyeBpNP-1159/images/lady-bug-on-stem-in-ny.jpg')
    .get('section').children().should('have.length',3)
    .get('form').contains('button','Shorten Please!').click().wait('@post')
    .get('section').children().should('have.length',4)
    .get('section').children().last().contains('h3', "LadyBug").should('be.visible')
    .get('section').children().last().contains('a', 'http://localhost:3001/useshorturl/4').should('be.visible')
    .get('section').children().last().contains('p', 'https://cdn.branchcms.com/w7EpyeBpNP-1159/images/lady-bug-on-stem-in-ny.jpg').should('be.visible')
  })
  it('should should return a message if the server sends back a failed request', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls',{
      statusCode: 404,
      fixture: 'urlPostStink'
    }).as('postStink')
    cy.visit('http://localhost:3000/').wait('@get')
    cy.get('input[name="title"]').type('StinkBug').should('have.value','StinkBug')
    .get('input[name="urlToShorten"]').type('https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSyW7Lxa75wofMrmf6R2IBxAefojPO5H2EMYXdY2AsT2wRip7RrzlnrHG_kxwAVMcBHbdo3GlYssQ0Lo5k').should('have.value','https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSyW7Lxa75wofMrmf6R2IBxAefojPO5H2EMYXdY2AsT2wRip7RrzlnrHG_kxwAVMcBHbdo3GlYssQ0Lo5k')
    .get('form').contains('button','Shorten Please!').click().wait('@postStink')
    .get('.error').contains('p','Failed to fetch')
  })
  it('Should show an error message if the user tries to submit an incomplete form', () => {
    cy.get('input[name="urlToShorten"]').type('https://cdn.branchcms.com/w7EpyeBpNP-1159/images/lady-bug-on-stem-in-ny.jpg')
    .get('form').contains('button','Shorten Please!').click()
    .get('section').children().should('have.length',3)
    .get('.error').contains('p','Please fill out all applicable fields before submitting. Thanks!').should('be.visible')
  })
})