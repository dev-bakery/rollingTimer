class CountdownTimer {
  constructor(targetDate) {
    this.countdownDate = new Date(targetDate).getTime();
    this.lastTime = "00:00:00";
  }

  start() {
    var interval = setInterval(() => {
      var now = new Date().getTime();
      var distance = this.countdownDate - now;

      var hours = this.formatTime(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      var minutes = this.formatTime(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      var seconds = this.formatTime(Math.floor((distance % (1000 * 60)) / 1000));

      var currentTime = `${hours}:${minutes}:${seconds}`;
      this.animateTime(this.lastTime, currentTime);
      this.lastTime = currentTime;

      if (distance < 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  formatTime(value) {
    return value < 10 ? "0" + value : value;
  }

  animateTime(last, now) {
    for (let i = 0; i < now.length; i++) {
      if (last[i] != now[i]) {
        this.animate(i, now[i]);
      }
    }
  }

  animate(index, number) {
    var element = document.getElementsByClassName("text")[index];
    var second = element.lastElementChild.cloneNode(true);
    second.innerHTML = number;
    element.appendChild(second);
    element.classList.add("move");
    setTimeout(() => {
      element.classList.remove("move");
    }, 500);
    setTimeout(() => {
      element.removeChild(element.firstElementChild);
    }, 500);
  }
}

var countdown = new CountdownTimer("Jan 5, 2024 15:37:25");
countdown.start();
