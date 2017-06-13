<template>
    <transition name="newPosts">
        <div class="snackbar" v-if="visible">
            <span>{{ message }}</span>
        </div>
    </transition>
    
</template>
<script>
export default {
    props: {
        delay: {
            type: Number,
            default: 2000
        }
    },
    data () {
        return {
            visible: false,
            task: null,
            message: ''
        }
    },
    computed: {
        snackbar () {
            return this.$store.state.snackbar
        }
    },
    watch: {
        snackbar () {
            if (this.task === null) {
                this.showMessage()
            }
        }
    },
    mounted () {
        if (this.snackbar.length !== 0) {
            this.showMessage()
        }
    },
    methods: {
        showMessage () {
            if (this.snackbar.length) {
                this.message = this.snackbar[0]
                this.$store.dispatch('SNACKBAR_POP')
                this.visible = true
                this.task = setTimeout(() => {
                    this.visible = false
                    setTimeout(() => this.showMessage(), 1000)
                }, this.delay)
            } else {
                this.task = null
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    $theme-color: #E74C3C;
    .snackbar {
        background-color: $theme-color;
        position: absolute;
        top: 70px;
        left: 50%;
        border-radius: 16px;
        padding: 0 12px;
        line-height: 32px;
        color: #FFF;
        font-size: 14px;
        font-weight: 500;
        transform: translateX(-50%);
        height: 32px;
        box-shadow: 0 6px 10px 0 rgba(0,0,0,0.3);
        animation: newPosts .5s;
        display: flex;
        align-items: center;
        z-index: 999;
    }
    .material-icons {
        font-size: 18px;
        margin-right: 4px;
    }
    .newPosts-enter-active {
        animation: newPosts-in .5s;
    }
    .newPosts-leave-active {
        animation: newPosts-out .5s;
    }
    @keyframes newPosts-in {
        0% {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
    @keyframes newPosts-out {
        0% {
            transform: translate(-50%, 0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
    }
</style>