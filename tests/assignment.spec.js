const {test} = require ('@playwright/test')

test('test first', async({page}) => {
 /************************Login to Trello***************************/
   await  page.goto('https://trello.com/')
   await page.waitForTimeout(1000);
   await page.click('a[class="Buttonsstyles__Button-sc-1jwidxo-0 kTwZBr"]');
   await page.fill('input[id="user"]', 'kiyarasharma1806@gmail.com');
   await page.waitForTimeout(1000);
   await page.click('input[id="login"]');
   await page.fill('input[id="password"]', 'Riya@2000');
   await page.click('button[id="login-submit"]')
   await page.waitForTimeout(10000);
   
   /************************Creating a new board***************************/
   await page.click('li[data-testid="create-board-tile"]');
   await page.fill('input[required]','My New WorkSpace');
   await page.click('button[data-testid="create-board-submit-button"]');

  /***********Create a list and name it as List A and create another list and name it as  List B******************/
   await page.fill('input[class="list-name-input"]', 'List A');
   await page.click('input[class="nch-button nch-button--primary mod-list-add-button js-save-edit"]');
   await page.fill('input[class="list-name-input"]', 'List B');
   await page.click('a[class="open-card-composer js-open-card-composer"]');
   await page.fill('textarea[class="list-card-composer-textarea js-card-title"]', 'My new card');
   await page.click('input[class="nch-button nch-button--primary confirm mod-compact js-add-card"]');
   await page.getByRole('button', { name: 'Add list' }).click();
   await page.getByRole('link', { name: ' Add a card' }).click();
   await page.getByPlaceholder('Enter a title for this card…').click();
   await page.getByPlaceholder('Enter a title for this card…').fill('my new 2');
   await page.getByRole('button', { name: 'Add card' }).click();
   
   /************************Add a card in list A and using drag and drop method of action class - drag and drop the created card in List B***************************/
   const card = await page.waitForSelector('div[class="list-card-details js-card-details"]');
   const listB =  await page.waitForSelector('//body[1]/div[1]/div[2]/div[1]/div[1]/main[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[3]/div[2]/div[2]/div[1]');
   const cardBoundingBox = await card.boundingBox();
   const listBBoundingBox = await listB.boundingBox();
   const dragAndDrop = { point: { x: cardBoundingBox.x + 10, y: cardBoundingBox.y + 10 } };
   await page.mouse.move(dragAndDrop.point.x, dragAndDrop.point.y);
   await page.mouse.down(dragAndDrop);
   await page.mouse.move(listBBoundingBox.x + 10, listBBoundingBox.y + 10);
   await page.mouse.up();
   
   /************************Get the x and y coordinates of the card that you moved***************************/
   await page.waitForSelector('//body[1]/div[1]/div[2]/div[1]/div[1]/main[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[3]/div[2]/div[2]/div[1]');
   const cardInListB = await page.waitForSelector('//body/div[@id="trello-root"]/div[@id="chrome-container"]/div[@class="gRz5T7UPIdkhxr"]/div[@id="surface"]/main[@id="popover-boundary"]/div/div[@id="content-wrapper"]/div[@id="content"]/div[@class="board-wrapper"]/div[@class="board-main-content"]/div[@class="board-canvas"]/div[@id="board"]/div[@class="js-list list-wrapper"]/div[@class="list js-list-content"]/div[@class="list-cards u-fancy-scrollbar u-clearfix js-list-cards js-sortable ui-sortable"]/a[2]/div[3]');
   const cardInListBBoundingBox = await cardInListB.boundingBox();
   console.log(`Card moved to position x: ${cardInListBBoundingBox.x} y: ${cardInListBBoundingBox.y}`);

    /********************Logout from Trello******************************/
    await page.click('button[data-testid="header-member-menu-button"]');
  await page.click('button[data-testid="account-menu-logout"]');
   
})