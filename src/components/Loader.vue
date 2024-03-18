<template>
    <!-- <div class="loadBody"> -->
    <div class="loading">
    </div>
    <!-- </div> -->
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style scoped>
/* .loadBody {
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    top: 50%;
} */

.loading {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    border: 5px solid #003F62;
    border-top: 5px solid #E7E7E3;
    animation: round 4s linear infinite;
}

@keyframes round {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>