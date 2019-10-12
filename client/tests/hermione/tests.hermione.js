describe('На всех страницах правильно отображается их содержимое', () => {
  it('Таблица навигации по репозиторию', function() {
    return this.browser
      .url('/shri2019-hw-7')
      .assertExists('.Table', 'Таблица навигации по репозиторию не отображается')
      .assertView('plain', '.Table');
  });

  it('Блок просмотра содержимого файла', function() {
    return this.browser
      .url('/shri2019-hw-7/blob/master/README.md')
      .assertExists('.CodeViewer', 'Блок просмотра содержимого файла не отображается')
      .assertView('plain', '.CodeViewer');
  });
});

describe('Правильно работают переходы по страницам', () => {
  it('Из списка файлов во вложенную папку' , function() {
    return this.browser
      .url('/shri2019-hw-7')
      .leftClick('//span[text() = \'client\']')
      .pause(1000)
      .assertExists('//span[text() = \'.hermione.conf.js\']', 'Файл .hermione.conf.js не появился в списке')
      .assertView('plain', '.Table');
  });

  it('Переход из списка файлов на страницу отдельного файла', function() {
    return this.browser
      .url('/shri2019-hw-7')
      .leftClick('//span[text() = \'README.md\']')
      .pause(1000)
      .assertExists('.CodeViewer', 'Блок просмотра содержимого файла не отображается')
      .assertView('plain', '.CodeViewer');
  });

    it('Переход из shri2019-hw-7/tree/master/server/test в shri2019-hw-7/tree/master/server по хлебным крошкам', function() {
      return this.browser
        .url('/shri2019-hw-7/tree/master/server/test')
        .assertExists('.Breadcrumbs', 'Хлебные крошки не отображаются')
        .click('.Breadcrumbs-Item:nth-child(2) .Breadcrumbs-Link')
        .pause(1000)
        .assertExists('//span[text() = \'test\']', 'Папка test не отображается в списке')
        .assertView('plain', '.Table');
    });
});
