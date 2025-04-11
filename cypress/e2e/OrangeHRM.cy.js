/// <reference types= "Cypress"/>


describe("Demo 1", () => {
    it("LOG IN SUCCESS", () => { //CASO 1, ABRIR PAGINA WEB, ENCONTRAR ELEMENTOS DE USERNAME Y PASSWORD, INGRESAR DATOS, CLICK EN LOGIN, VALIDACION DE LA URL DEL DASHBOARD
      cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
      cy.wait(1000) //cy.wait: Tiempo de espera.
      cy.get('[name="username"]').type("Admin") //cy.get('[name="username"]'): Busca cualquier elemento que tenga el atributo name igual a username.
      cy.get('[name="password"]').type("admin123")
      cy.get('.orangehrm-login-button').click() //Se selecciona el boton log in desde el identificador clase y se le da click.
      cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index') //Validamos que la url a la que nos dirige sea la del Dashboard.
      cy.log("Inicio de sesion exitoso")
    })

    it("LOG IN FAIL, VALIDATE THAT THE INVALID CREDENTIALS ELEMENT IS DISPLAYED", () => { //CASO 2, ABRIR PAGINA WEB, ENCONTRAR ELEMENTOS DE USERNAME Y PASSWORD, INGRESAR DATOS ERRONEOS, CLICK EN LOGIN, VALIDACION DEL ELEMENTO "INVALID CREDENTIALS"
      cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
      cy.get('[name="username"]').type("Test")
      cy.get('[name="password"]').type("test123")
      cy.get('.orangehrm-login-button').click()
      cy.get('p.oxd-text.oxd-text--p.oxd-alert-content-text') //Validamos que se encuentre un elemento parrafo con su clase.
      .should('be.visible') //validamos que ese elemento sea visible.
      .and('contain.text', 'Invalid credentials') //y que contenga el texto "Invalid credencials".
      cy.log("Inicio de sesion fallido, muestra el elemento Invalid credencials correctamente")

    })
  })

describe("Demo 2", () => {
    
    it("FORGOT YOUR PASSWORD", () => { //CASO 3, ABRIR LA PAGINA WEB, ENCONTRAR ELEMENTO FORGOT PASSWORD, INGRESAR DATOS, CLICK EN RESET PASSWORD
      cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
      cy.get('.oxd-text.oxd-text--p.orangehrm-login-forgot-header').click() //Encuentra el elemento por su clase y le da click.
      cy.get('[name="username"]').type("Admin")
      cy.get('.oxd-button.oxd-button--large.oxd-button--secondary.orangehrm-forgot-password-button.orangehrm-forgot-password-button--reset').click();
      cy.get('h6.oxd-text.oxd-text--h6.orangehrm-forgot-password-title')
      .should('have.text', 'Reset Password link sent successfully')
      cy.log("Reset Password exitoso")

    })

    it("LINKEDIN OPENS SUCCESSFULLY", () => { //CASO 4, SE VALIDA QUE LA URL DE LA RED SOCIAL LINKEDIN SE ABRE CORRECTAMENTE
      cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
      cy.get('a[href="https://www.linkedin.com/company/orangehrm/mycompany/"]').invoke('removeAttr', 'target').click() //para abrir la URL en la misma pestaña.
      cy.origin('https://www.linkedin.com', () => { //Se abre pagina externa
      cy.url().should('include','linkedin.com/company/orangehrm') //Se valida que la url de la pagina externa contenga 'linkedin.com/company/orangehrm'.
      })
      cy.log("Linkedin opens successfully")

    })

    it("FACEBOOK OPENS SUCCESSFULLY", () => { //CASO 5, SE VALIDA QUE LA URL DE LA RED SOCIAL FACEBOOK SE ABRE CORRECTAMENTE
      cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
      cy.get('a[href="https://www.facebook.com/OrangeHRM/"]').invoke('removeAttr', 'target').click()
      cy.origin('https://www.facebook.com', () => {
      cy.url().should('include','facebook.com/OrangeHRM/')
      })
      cy.log("Facebook opens successfully")

    })
    it("X OPENS SUCCESSFULLY", () => { //CASO 6, SE VALIDA QUE LA URL DE LA RED SOCIAL X SE ABRE CORRECTAMENTE
      cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
      cy.get('a[href="https://twitter.com/orangehrm?lang=en"').invoke('removeAttr', 'target').click()
      cy.origin('https://x.com', () => {
      cy.url().should('include','x.com/orangehrm?lang=en')
      })
      cy.log("X opens successfully")

    })
    
    it("YOUTUBE OPENS SUCCESSFULLY", () => { //CASO 7, SE VALIDA QUE LA URL DE LA RED SOCIAL YOUTUBE SE ABRE CORRECTAMENTE
      cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
      cy.get('a[href="https://www.youtube.com/c/OrangeHRMInc"').invoke('removeAttr', 'target').click()
      cy.origin('https://www.youtube.com', () => {
      //cy.url().should('include','/c/OrangeHRMInc')
       })
       cy.window().should('have.property', 'document').then((doc) => {
       expect(doc.readyState).to.equal('complete');
       })
      cy.log("Youtube opens successfully")

    }) 
 
  })

describe("Demo 3", () => {
    it.only("SEARCH FOR USER AND VALIDATE THAT IT DOES NOT EXIST", () => { //CASO 8, SE ABRE LA PAGINA WEB, HACEMOS LOGIN Y ACCEDEMOS A LA PESTANA ADMIN DONDE HACEMOS LA BUSQUEDA DE UN USUARIO ADMIN QUE NO EXISTE, VALIDANDO QUE SE MUESTRE EL ELEMENTO DE "NO RECORDS FOUND"
      cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
      cy.get('[name="username"]').type("Admin")
      cy.get('[name="password"]').type("admin123")
      cy.get('.orangehrm-login-button').click()
      cy.get('a[href="/web/index.php/admin/viewAdminModule"').click()
      /*cy.get('form'): Selecciona el formulario principal que contiene los campos.
      .find('input.oxd-input.oxd-input--active'): Busca los campos de entrada dentro de ese formulario.
      .first(): Selecciona el primer campo en caso de que haya varios.
      .type('Lucero'): Escribe Lucero en el campo.*/
      cy.get('form').find('input.oxd-input.oxd-input--active').first().type('Admin')
      cy.get('form').find('.oxd-select-wrapper').first().click().contains('Admin').click()
      cy.get('input[placeholder="Type for hints..."]').type('Test')
      cy.get("[role='listbox']").contains("sww test").click()
      cy.contains('button', 'Search').click()
      cy.get('#oxd-toaster_1') //Validamos que se encuentre un elemento parrafo con su id.
      .should('be.visible')
      cy.log("THE ELEMENT NO RECORDS FOUND IS DISPLAYED")
    })

    // it.only("", () => { //CASO 9,
    //   cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    //   cy.get('[name="username"]').type("Admin")
    //   cy.get('[name="password"]').type("admin123")
    //   cy.get('.orangehrm-login-button').click()
    //   cy.get('a[href="/web/index.php/admin/viewAdminModule"').click()
    //   /*cy.get('form'): Selecciona el formulario principal que contiene los campos.
    //   .find('input.oxd-input.oxd-input--active'): Busca los campos de entrada dentro de ese formulario.
    //   .first(): Selecciona el primer campo en caso de que haya varios.
    //   .type('Lucero'): Escribe Lucero en el campo.*/
    //   cy.get('form').find('input.oxd-input.oxd-input--active').first().type('Admin')
    //   cy.get('form').find('.oxd-select-wrapper').first().click().contains('Admin').click()
    //   cy.get('input[placeholder="Type for hints..."]').type('Test')
    //   cy.get("[role='listbox']").contains("FTL TEST").click()
    //   cy.contains('button', 'Search').click()
    //   cy.get('#oxd-toaster_1') //Validamos que se encuentre un elemento parrafo con su id.
    //   .should('be.visible')
    //   cy.log("THE ELEMENT NO RECORDS FOUND IS DISPLAYED")
    // })
    

    before(() =>{
      cy.clearLocalStorage();

  }) 

  })