/// <reference types="cypress" />

describe('Suite de teste Your Plan', () => {

    const email = Cypress._.repeat('a@a.com')
    before(() => {
        cy.visit("/")
        cy.viewport('samsung-note9')
    })

    after(() => {
        cy.viewport('samsung-note9')
    })

    describe('Testes de janela', () => {

        it('Deve verificar se existe a propriedae Top na janela', () => {
            cy.window().should('have.property', 'top')
        })

        it('Deve verificar se existe a propriedae o charset e se o seu valor é UTF-8', () => {
            cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
        })

        it('Deve verificar o título da página', () => {
            cy.title().should('include', 'teste2e')
        })
    })
    
    describe('Deve verificar os elementos da pagina', () => {

        it('Titulo da pagina', () => {
            cy.get('.r-marginTop-d0c3f3 > .r-color-kgv7a8')
            .should('contain', 'Your Plan')
        })

        it('Change', () => {
            cy.get('.r-fontSize-1inkyih').should('contain', 'Change')
        })

        it('Seta ->', () => {
            cy.get('.r-marginTop-d0c3f3 > .css-view-1dbjc4n > .r-fontSize-1x35g6').should('exist')
        })

        it('Month', () => {
            cy.get('.r-color-7mbiho').should('contain', '/month')
        })

        it('Cancel anytime. Ofter terms apply.', () => {
            cy.get(':nth-child(2) > .r-color-1opr8b6').should('contain', 'Cancel anytime. Ofter terms apply.')
        })

        

        it('input email', () => {
            cy.get('[data-testid="input-email"]').should('attr', 'placeholder', 'your email')
            cy.get('[data-testid="input-email"]').invoke('val', email)
            cy.reload()
        })

        it("Botão 'Subscribe'", () => {
            cy.get('[data-testid="button-subscribe"]').should('contain', 'Subscribe')
        })

        it("If the price changes, we'll notify {...}", () => {
            cy.get('[data-testid="plan-note"]')
            .should('contain', "If the price changes, we'll notify you beforehand. You cam check your renewal date or cancel anytime via your Account page.")
        })

        describe('Basic Plan', () => {
            
            it('Basic', () => {
                cy.get('.r-fontSize-1i10wst').should('contain', 'Basic')
            })

            it("Botão 'Basic '", () => {
                cy.get('.r-alignSelf-173mn98 > .r-backgroundColor-14lw9ot').should('contain', 'Basic')
            })
        })

        describe('Premium', () => {

            it("Botão 'Premium '", () => {
                cy.get('[data-testid="option-premium"]').should('contain', 'Premium').click()
                cy.get('.r-fontSize-1i10wst').should('contain', 'Premium')
                cy.get('.r-alignSelf-173mn98 > [style="transition-duration: 0s;"]').click()
            })
        })

        describe('Validação', () => {
            
            it('Deve responder "We send you a confirmation email." quando enviar um email', () => {
                cy.get('[data-testid="input-email"]').should('attr', 'placeholder', 'your email')
                cy.get('[data-testid="input-email"]').invoke('val', email)
                cy.get('[data-testid="button-subscribe"]').click()
                cy.get('[data-testid="confirmation-message"]').should('contain', 'We send you a ')
                cy.get('[data-testid="confirmation-message"]').should('contain', 'confirmation email')
            })

            it('deve trocar o valor ao clicar no botão premium e o botão basic', () => {
                cy.get('[data-testid="option-premium"]').click()
                cy.get(':nth-child(2) > .css-view-1dbjc4n > .r-color-kgv7a8').should('contain', '6.00')
            })
        })
    })
})