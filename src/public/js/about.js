const { remote, shell } = require('electron');
const path = require('path');

const { competitions, packageData } = remote.getCurrentWindow();

const getVersion = (filePath) => {
  const fileName = path.basename(filePath);
  const versionWithDot = /((\d+)\.)+/.exec(fileName)[0];

  return versionWithDot.substr(0, versionWithDot.length - 1);
};

$('#name').text(packageData.productName);
$('#app-version').text(packageData.version);
$('#match-wrapper-version').text(getVersion(competitions[0].paths.matchWrapper));

competitions.forEach((competition) => {
  $('#versions').append(`
    <div class="item">
      <div class="header">${competition.name} engine version</div>
      ${getVersion(competition.paths.engine)}
    </div>
  `);
});

$('[data-link]').on('click', e => shell.openExternal($(e.target).attr('data-link')));
