import { ref } from 'vue';

export function useClickOutside () {
  const target = ref(null);

  const handleClickOutside = (event, cb) => {
    if (target.value && !target.value.contains(event.target)) {
      cb();
    }
  };

  return {
    target,
    handleClickOutside,
  };
}