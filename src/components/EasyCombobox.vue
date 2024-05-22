<script setup>
import { isEmpty } from 'lodash';
import { ref, watch, useAttrs } from 'vue';

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
  placeholder: {
    type: String,
    default: 'Select options',
  },
  disabled: {
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
});


const inputRef = ref(null);
const source = ref('');
const model = ref(props.modelValue);

watch(model, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });

function onAddItem (e) {
  e.preventDefault();
  
  if (!source.value) return;

  const newItem = props.returnObject ? { label: source.value, value: source.value } : source.value;

  if (props.unique && props.returnObject) {
    const exists = model.value.find((item) => item.value === newItem.value);
    if (exists) return;
  }

  if (props.unique && !props.returnObject) {
    const exists = model.value.find((item) => item === newItem);
    if (exists) return;
  }

  model.value = [...model.value, newItem];
  source.value = '';
}

function removeItem (index) {
  model.value.splice(index, 1);
}


function clearSelection () {
  if (props.disabled) return;
  model.value = [];
}

// Validate
const fieldValid = ref(true);

function validate () {
  if (!props.required) {
    return fieldValid.value = true;
  }
  return fieldValid.value = !isEmpty(selectedOptions.value);
}
</script>


<template>
  <div ref="target" class="relative target">
    <div class="w-full">
      <div v-if="label" class="flex mb-2">
        <span class="label-text font-medium">{{ label }}</span>
      </div>
      <div 
        v-bind="attrs"
        class="flex items-center input input-bordered min-h-[48px] h-auto p-2" 
        :class="{ 
          'input-disabled': disabled || loading,
          'cursor-not-allowed': disabled, 
          'cursor-pointer': !disabled || !loading,
          'cursor-wait': loading,
          'input-error': !fieldValid,
        }"
      > 
        <div class="flex flex-wrap gap-1 mr-1">
          <template v-for="(item, index) in model">
            <template v-if="returnObject">
              <div class="badge badge-primary gap-1">
                {{ item.label }}
                <button type="button" @click="removeItem(index)">
                  <i class="las la-times text-black"></i>
                </button>
              </div>
            </template>
            <template v-else>
              <div class="badge gap-1">
                {{ item }}
                <button type="button" @click="removeItem(index)">
                  <i class="las la-times text-black"></i>
                </button>
              </div>
            </template>
          </template>
        </div>
        <input 
          v-model="source" 
          type="text" 
          class="grow" 
          :placeholder="placeholder"
          @keyup.enter.prevent="onAddItem"
        >
        <!-- <div class="w-full pr-2"> 
          <div v-if="selectionHasValue">
            <slot name="selection" :selection="selectedOptionsSlotValue">
              <span>{{ selectedOptionsDisplay }}</span>
            </slot>
          </div>
          <span v-else class="text-neutral-400">{{ placeholder }}</span>
        </div> -->

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
  </div>
</template>
