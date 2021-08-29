// Script for grabbing code blocks
// http://unicode.org/charts/index.html#scripts

const texts = document.querySelectorAll('td p');
const options = [];
let isStarted = false;

texts.forEach(item => {
    const links = item.querySelectorAll('a');
    const space = item.classList.contains('sb') || item.classList.contains('pb')
      ? '&bullet; '
      : '';
    const groupPrefix = isStarted
      ? `</optgroup>`
      : '';

    if (item.classList.contains('sg')
      || (item.classList.contains('mb') && links.length === 0)) {
      options.push(`${groupPrefix}<optgroup label="${item.innerText}">`)
      isStarted = true;
    }

    if (links.length > 0)
      links.forEach(link => {
        if(link.title)
          options.push(`<option value="${link.title.replace('-', '..')}">${space}${link.innerText}</option>`)
      })
})

options.push('</optgroup>');

console.log(options.join('\n'))
