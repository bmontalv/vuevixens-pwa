<template>
    <div class="camera-modal">
        <video ref="video" class="camera-stream"/>
        <div class="camera-modal-container">
          <button class="button" @click="capture">
            Captura
          </button>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        mediaStream: null
      }
    },
    mounted () {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(mediaStream => {
          this.$refs.video.srcObject = mediaStream
          this.$refs.video.play()
          this.mediaStream = mediaStream
        })
        .catch(error => console.error('getUserMedia() error:', error))
    },
      destroyed () {
      const tracks = this.mediaStream.getTracks()
      tracks.map(track => track.stop())
    },
    methods: {
      blobToBase64(blob, callback) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function() {
            const base64data = reader.result;
            callback(base64data);
        };
      },
      savePhoto(photo) {
        console.log('emit:', photo)
        localStorage.setItem('currentImage', photo)

      },
      capture () {
        const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
        const imageCapture = new window.ImageCapture(mediaStreamTrack)
        return imageCapture.takePhoto().then(blob => {
          console.log(blob)
          this.blobToBase64(blob, this.savePhoto)
          this.$router.go(-1)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .camera-modal {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background-color: white;
    z-index: 10;
  }
  .camera-stream {
    width: 100%;
    max-height: 100%;
  }

  .camera-modal-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    align-items: center;
    margin-bottom: 24px;

    .button {
      background-color: #6d737a;
      font-family: "Barrio";
      color: white;
      padding: 15px;
      font-size: 16px;
      border-radius: 5px;
      font-weight: bold;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

      &:hover {
        cursor: pointer;
      }
    }
  }
  .take-picture-button {
      display: flex;
  }
</style>