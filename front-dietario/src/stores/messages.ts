import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMessageStore = defineStore("messages", {
  state: () => ({ message: "" }),
  actions: {
    setMessage(newMessage: string) {
      this.message = newMessage;
    },
  },
});
