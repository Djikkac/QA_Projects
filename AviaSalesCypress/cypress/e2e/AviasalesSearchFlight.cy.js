/// ＜reference types="cypress" /＞

describe('Search Flight on Aviasales.com', () => {
  it('passes', () => {
    // navigate to baseUrl: https://aviasales.com
    cy.visit('/')

    // uncheck all checkboxes
    cy.get('input[type="checkbox"]').uncheck({force:true})

    // enable Night Theme
    cy.get('.checkbox_bc31d76').click()

    // create constants for origin and destination
    const origin = '[data-test-id=origin-autocomplete-field]'
    const destination = '[data-test-id=destination-autocomplete-field]'

    // for FROM field set NEW York, Kennedy airport
    cy.get(origin).click().focused().clear().type('John F. Kennedy International Airport')
    
    // for TO field set Berlin
    cy.get(destination).click().focused().clear().type('Berlin')

    // for DATE field set August, 30
    cy.get('[aria-label="Tue Aug 30 2022"] > [data-test-id="tooltip-wrapper"] > .calendar-day > .calendar-day__date').click()

    // set no returning ticket
    cy.get('.trip-duration__field.--return > .trip-duration__input-wrapper').click()
    cy.get('.trip-duration__content-head > .button_70e8ad4').click()

    // set passengers to 2
    cy.get('.additional-fields').click()
    cy.get(':nth-child(1) > .additional-fields__passenger-control-wrap > :nth-child(3) > .additional-fields__passenger-control > svg > path').click()
    cy.get('.button_2e34a4d').click()


    // click search flights
    cy.get('.avia-form__submit > .button_70e8ad4').click()

    // assert: New search page is opened
    cy.url().should('include', '/search/')

    // assert: Night Theme is enabled
    cy.get('input[type="checkbox"]').should('be.checked')

    // assert: FROM field is set as NEW York, Kennedy airport
    cy.get(origin).should('have.value', 'New York')

    // assert: TO field is set as Berlin
    cy.get(destination).should('have.value', 'Berlin')

    // assert: DATE field is set on 'Tue, August 30'
    cy.get('input[placeholder="Depart"]').should('have.value', 'Tue, August 30')

    // assert: No returning ticket is set
    cy.get('input[placeholder="Return"]').should('have.value', '')
  })
})