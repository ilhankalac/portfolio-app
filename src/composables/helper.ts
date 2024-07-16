// src/composables/helper.ts
import { ref, Ref } from 'vue';

export function useHelpers() {
  const errorMessage: Ref<string> = ref('');

  const validateEmail = (email: Ref<string>): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    errorMessage.value = !emailRegex.test(email.value) ? 'Please enter a valid email' : '';
    return errorMessage.value;
  };

  const timeStamp = (): string => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const timestamp = `${day}.${month}.${year}. ${hours}:${minutes}`;
    return timestamp;
  };

  return {
    errorMessage,
    validateEmail,
    timeStamp,
  };
}
