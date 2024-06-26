<script setup>
import { isEmpty, debounce } from 'lodash';
import { ref, watch, onMounted, onUnmounted, computed, useAttrs } from 'vue';
import { useClickOutside } from '../composables/use-helpers';

const emit = defineEmits(['update:modelValue', 'search']);

const attrs = useAttrs();

defineExpose({
  validate,
});

const props = defineProps({
  modelValue: {
    type: [Array],
    default: () => ([]),
  },
  options: {
    type: Array,
    default: () => ([]),
  },
  placeholder: {
    type: String,
    default: 'Select options',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  searchable: {
    type: Boolean,
    default: true,
  },
  asyncSearch: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: Array,
    default: () => ([]),
  },
  label: {
    type: String,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  returnObject: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  requiredErrorMessage: {
    type: String,
    default: 'This field is required',
  },
  unique: {
    type: Boolean,
    default: true,
  },
  searchPlaceholder: {
    type: String,
    default: 'Type to search',
  },
});

const selectedOptions = ref(props.modelValue);
const filteredOptions = ref(props.options);

const inputRef = ref(null);
const showOptions = ref(false);

const selectionHasValue = computed(() => !isEmpty(selectedOptions.value));

watch(() => props.modelValue, (newValue) => {
  selectedOptions.value = newValue;
});

const selectedOptionsDisplay = computed(() => {
  if (props.returnObject) {
    return selectedOptions.value.map(opt => opt.label).join(', ');
  }
  const selected = props.options.filter(option => selectedOptions.value.includes(option.value));
  return selected.map(opt => opt.label).join(', ');
});

const selectedOptionsSlotValue = computed(() => {
  if (props.returnObject) {
    return selectedOptions.value;
  }
  const selected = props.options.filter(option => selectedOptions.value.includes(option.value));
  return selected;
});

watch(selectedOptions, (newValue) => {
  const isValid = validate();
  isValid && emit('update:modelValue', newValue);
});

function itemIsSelected (option) {
  if (props.returnObject) {
    return selectedOptions.value.some(item => item.value === option.value);
  }
  return selectedOptions.value.includes(option.value);
}

function onOptionClick (option) {
  const valueToAdd = props.returnObject ? option : option.value;

  if (props.unique) {
    const index = selectedOptions.value.findIndex(item => {
      return props.returnObject ? item === option : item === option.value;
    });

    if (index !== -1) {
      selectedOptions.value.splice(index, 1);
      // showOptions.value = false;
      searchNeedle.value = '';
      return;
    }
  }

  selectedOptions.value.push(valueToAdd);
  // showOptions.value = false;
  searchNeedle.value = '';

  validate();
}

function clearSelection () {
  if (props.disabled) return;
  selectedOptions.value = [];
  showOptions.value = false;
}

// Validate
const fieldValid = ref(true);

function validate () {
  if (!props.required) {
    return fieldValid.value = true;
  }
  return fieldValid.value = !isEmpty(selectedOptions.value);
}

// Search
const searchNeedle = ref('');
const debounceTime = props.asyncSearch ? 500 : 100;

watch(searchNeedle, debounce((newValue) => {
  if (props.asyncSearch) {
    emit('search', newValue);
    return;
  }
  if (newValue) {
    filteredOptions.value = props.options.filter(option => option.label.toLowerCase().includes(newValue.toLowerCase()));
  } else {
    filteredOptions.value = props.options;
  }
}, debounceTime));

watch(() => props.options, (newValue) => {
  filteredOptions.value = newValue;
});

// Toggle options
function toggleOptions () {
  if (props.disabled || props.loading) return;
  
  showOptions.value = !showOptions.value;
  
  if (!props.searchable) return;
  
  if (showOptions.value) {
    setTimeout(() => {
      inputRef.value.focus();
    }, 0);
  }
}

// Handle click outside
const { target, handleClickOutside } = useClickOutside();

onMounted(() => {
  document.addEventListener('click', (e) => {
    handleClickOutside(e, () => {
      showOptions.value = false;
    });
  });
});

onUnmounted(() => {
  document.addEventListener('click', (e) => {
    handleClickOutside(e, () => {
      showOptions.value = false;
    });
  });
});
</script>


<template>
  <div ref="target" class="relative target">
    <div class="w-full">
      <div v-if="label" class="flex mb-2">
        <span class="label-text font-medium">{{ label }}</span>
      </div>
      <div 
        v-bind="attrs"
        class="flex items-center justify-between input input-bordered" 
        :class="{ 
          'input-disabled': disabled || loading,
          'cursor-not-allowed': disabled, 
          'cursor-pointer': !disabled || !loading,
          'cursor-wait': loading,
          'input-error': !fieldValid,
        }"
        @click="toggleOptions"
      >
        <div class="w-full pr-2"> 
          <div v-if="selectionHasValue">
            <slot name="selection" :selection="selectedOptionsSlotValue">
              <span>{{ selectedOptionsDisplay }}</span>
            </slot>
          </div>
          <span v-else class="text-neutral-400">{{ placeholder }}</span>
        </div>

        <div class="flex gap-2">
          <button v-if="clearable" @click.stop="clearSelection">
            <i class="las la-times text-black"></i>
          </button>
          <template v-if="loading">
            <button type="button" @click.stop="">
              <span class="loading loading-spinner loading-xs"></span>
            </button>
          </template>
          <template v-else>
            <button type="button" @click.stop="">
              <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 14.586L4.707 9.293a1 1 0 011.414-1.414L10 11.586l3.879-3.879a1 1 0 111.414 1.414L10 14.586z" clip-rule="evenodd" />
              </svg>
            </button>
          </template>
        </div>
      </div>
      <div v-if="!fieldValid" class="flex mt-2">
        <slot name="errors">
          <span class="label-text-alt text-error">{{ requiredErrorMessage }}</span>
        </slot>
      </div>
    </div>

    <div 
      v-show="showOptions"
      class="absolute left-0 right-0 border-[1px] border-gray-300 rounded-lg mt-1 shadow-md p-2 bg-white z-10 w-full"
    >
      <label v-if="searchable" v-bind="attrs" class="input input-bordered flex items-center gap-2 mb-2">
        <input 
          v-model="searchNeedle"
          ref="inputRef" 
          type="text"
          class="grow"
          :placeholder="searchPlaceholder"
        >
        <button v-if="searchNeedle" type="button" @click.stop="searchNeedle = ''">
          <i class="las la-times text-black"></i>
        </button>
      </label>
      <div class="max-h-[300px] overflow-y-auto">
        <template v-if="filteredOptions?.length">
          <template v-for="(option, index) in filteredOptions">
            <div 
              @click="onOptionClick(option)"
            >
              <div 
                class="flex justify-between items-center cursor-pointer bg-gray-100 hover:bg-gray-300 p-2 mb-1 rounded-md"
                :class="{ 'bg-gray-200': itemIsSelected(option) }"
              >
                <slot name="option" :option="option" :selected="itemIsSelected(option)">
                  <span>{{ option.label }}</span>
                  <i v-if="itemIsSelected(option)" class="las la-check text-green-700 text-base"></i>
                </slot>
              </div>
            </div>
          </template>
        </template>
        <template v-else>
          <slot name="no-data">
            <div class="flex justify-center items-center">
              <div class="text-neutral-400 p-2">No data available</div>
            </div>
          </slot>
        </template>
      </div>
    </div>
  </div>
</template>
