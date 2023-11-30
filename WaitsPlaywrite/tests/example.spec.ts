
test('Navigate the page' ,async ({page}) => {
  await page.goto('https://www.tase.co.il/he');
  let Locator_Data = await page.locator('');
  Locator_Data.click();
  let Locator_STATISTICA = await page.locator('')

  
})