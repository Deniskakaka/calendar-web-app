function addContentSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const arrHoursElems = [];

  for (let i = 0; i < 24; i++) {
    const blockHuor = document.createElement('div');
    blockHuor.classList.add('hour');
    const huorText = document.createElement('span');
    huorText.classList.add('hour__text');
    huorText.textContent = `${(i < 10) ? `0${i}` : i}:00`;
    blockHuor.append(huorText);
    arrHoursElems.push(blockHuor);
  }

  sidebar.append(...arrHoursElems);
}

export { addContentSidebar };
