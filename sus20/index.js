const puppeteer = require('puppeteer');
puppeteer.defaultArgs({devtools: true});


(async () => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('https://accounts.google.com/signin/v2/identifier?hl=en&passive=true&continue=https%3A%2F%2Fwww.google.com%2F&ec=GAZAmgQ&flowName=GlifWebSignIn&flowEntry=ServiceLogin');

    
        const [respons] = await Promise.all([
      page.waitForNavigation(),
      page.mouse.click(400,155)
    ]);

    //await page.type('#id_userLoginId', 'nigamehsan07@yahoo.com');
   // await page.type('#id_password', 'Jawad40');
   /* const [response] = await Promise.all([
      page.waitForNavigation(),
      page.click("[data-uia=login-submit-button]"),
    ]); */
    /*const [respons] = await Promise.all([
      page.waitForNavigation(),
      page.mouse.click(520,275)
    ]);*/
    await page.screenshot({path: 'example.png'});
    await page.close();
  
  })();