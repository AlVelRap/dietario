import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMessageStore = defineStore("messages", {
  state: () => ({ message: "prueba" }),
  actions: {
    setMessage(newMessage: string) {
      this.message = newMessage;
    },
  },
});
