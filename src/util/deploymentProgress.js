const colors = require('colors');
const cliProgress = require('cli-progress');

class Progress {
  constructor() {
    this.bar = new cliProgress.SingleBar({
      format: 'Progress |' + colors.blue('{bar}') + '| {percentage}% complete',
      forceRedraw: true,
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true
    });

    this.totalTasks = 100;
  }

  update(data) {
    let statuses = `${data}`.match(/\d+\/\d+/g);
    if (statuses) {
      let [current, total] = statuses[statuses.length - 1].split('/').map(str => Number(str));
      if (this.totalTasks !== total) {
        this.totalTasks = total;
        this.bar.start(this.totalTasks, 0);
      }
      this.bar.update(current);
    }
  }

  stop() {
    this.bar.stop();
  }
}

module.exports = Progress;