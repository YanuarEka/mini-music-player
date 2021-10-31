new Vue({
  el: '#app',
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: '12 Murid Yesus',
          artist: 'Tidak Dikenal',
          cover: 'img/1.jpg',
          source: 'mp3/6.mp3',
          url: 'https://www.youtube.com/watch?v=R35pzioMLJU',
          favorited: false,
        },
        {
          name: 'Black Cather',
          artist: 'Vickyblanka',
          cover: 'img/2.jpg',
          source: 'mp3/2.mp3',
          url: 'https://www.youtube.com/watch?v=5C8yvJUVB-0',
          favorited: true,
        },
        {
          name: 'Cash Cash - Hero',
          artist: 'Christina Perri',
          cover: 'img/3.jpg',
          source: 'mp3/3.mp3',
          url: 'https://www.youtube.com/watch?v=iafxqkKZacA',
          favorited: false,
        },
        {
          name: 'Heres Your Perfect',
          artist: 'Jamie Miller',
          cover: 'img/4.jpg',
          source: 'mp3/4.mp3',
          url: 'https://www.youtube.com/watch?v=cRi-x2r88no',
          favorited: false,
        },
        {
          name: 'Tuhan Yang Aneh',
          artist: 'Tidak Dikenal',
          cover: 'img/5.jpg',
          source: 'mp3/8.mp3',
          url: 'https://www.youtube.com/watch?v=IJRz8htcUbA',
          favorited: true,
        },
        {
          name: 'Orange',
          artist: '7!!',
          cover: 'img/6.jpg',
          source: 'mp3/5.mp3',
          url: 'https://www.youtube.com/watch?v=TA9raOpgtTE',
          favorited: false,
        },
        {
          name: 'Happier',
          artist: 'Olivia Rodrigo',
          cover: 'img/7.jpg',
          source: 'mp3/7.mp3',
          url: 'https://www.youtube.com/watch?v=ZY40HscUDZk',
          favorited: true,
        },
        {
          name: 'XMV 01 LOSARANG',
          artist: 'Artis Tidak Dikenal',
          cover: 'img/8.jpg',
          source: 'mp3/10.mp3',
          url: 'https://www.youtube.com/watch?v=VuUjgz9oxx8',
          favorited: false,
        },
        {
          name: 'LINGSIR WENGI',
          artist: 'Artis Tidak Dikenal',
          cover: 'img/9.jpg',
          source: 'mp3/12.mp3',
          url: 'https://www.youtube.com/watch?v=KElWWGjDqg0',
          favorited: false,
        },
        {
          name: 'Shigatsu wa Kimi no Uso',
          artist: 'Raon Lee',
          cover: 'img/10.jpg',
          source: 'mp3/11.mp3',
          url: 'https://www.youtube.com/watch?v=dCGWi2yFjgQ',
          favorited: true,
        },
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null,
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + '%';
      this.circleLeft = width + '%';
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = '0' + durmin;
      }
      if (dursec < 10) {
        dursec = '0' + dursec;
      }
      if (curmin < 10) {
        curmin = '0' + curmin;
      }
      if (cursec < 10) {
        cursec = '0' + cursec;
      }
      this.duration = durmin + ':' + dursec;
      this.currentTime = curmin + ':' + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + '%';
      this.circleLeft = percentage + '%';
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = 'scale-in';
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = 'scale-out';
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[this.currentTrackIndex].favorited;
    },
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function () {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function () {
      vm.generateTime();
    };
    this.audio.onended = function () {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = element.cover;
      link.as = 'image';
      document.head.appendChild(link);
    }
  },
});
