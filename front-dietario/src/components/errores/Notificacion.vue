<template>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <!-- <img src="..." class="rounded me-2" alt="..."> -->
                <strong class="me-auto">Oops!</strong>
                <!-- <small class="text-muted">11 mins ago</small> -->
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ message }}
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useMessageStore } from '@/stores/messages'

export default defineComponent({
    id: 'notification',

    setup() {
        const messageStore = useMessageStore()
        const message = computed(() => messageStore.message)

        onMounted(() => {
            const timeout = setTimeout(() => {
                console.log("entra")
                const toastLiveExample = document.getElementById('liveToast')
                if (toastLiveExample) {
                    toastLiveExample.className = "toast"
                    messageStore.setMessage('')
                }
            }, 5000)

            // Clear the timeout if the notification changes or component unmounts
            watch(messageStore, () => {
                const toastLiveExample = document.getElementById('liveToast')
                if (toastLiveExample)
                    toastLiveExample.className += " show"
                timeout
                clearTimeout(timeout)
            })

            return () => {
                clearTimeout(timeout)
            }
        })

        return { message }
    },
})
</script>