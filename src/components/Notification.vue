<template>
    <div class="container">
        <div class="noti">
            <div class="message">
                {{ message }}
                <!-- <h2>Login Success</h2> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Notification',
    props: {
        message: String,
    }
}
</script>

<style scoped>  .container {
      background: transparent;
      /* background: #f1eded; */
      border-radius: 10px;
  }


  .noti {
      /* background: #f1eded; */
      position: fixed;
      top: 0;
      transform: translateX(-50%);
      width: 300px;
      padding: 10px;
      text-align: center;
      opacity: 0;
      border-radius: 5px;
      animation: slideInOut 0.5s ease-in-out forwards;
  }

  @keyframes slideInOut {
      0% {
          opacity: 0;
          transform: translateY(-100%);
      }

      100% {
          opacity: 1;
          transform: translateY(0);
      }
  }

  .noti.in {
      animation-name: slideInOut;
      animation-direction: normal;
      /* Slide in from top */
  }

  .noti.out {
      animation-name: slideInOut;
      animation-direction: reverse;
      /* Slide out to top */
  }

  .notification {
      background: #f1eded;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }

  .message {
      padding: 20px;
      font-family: 'Rubik';
      border: 1px solid black;
      width: 300px;
      background: #f1eded;
  }
</style>