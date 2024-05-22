# 🌼 Easy Daisy

Vue.js 3 Component Collection for DaisyUI

## Installation

```bash
npm install @mycure/easy-daisy
```

## Usage

```vue
<script setup>
import { EasySelect } from 'easy-daisy';

const model = ref('Option 1');
const options = [
  {
    label: 'Option 1',
    value: 'Option 1',
  },
  {
    label: 'Option 2',
    value: 'Option 2',
  },
  {
    label: 'Option 3',
    value: 'Option 3',
  },
];

</script>

<template>
  <EasySelect v-model="model" :options="options" />

  <p>Selected: {{ model }}</p>
</template>

```