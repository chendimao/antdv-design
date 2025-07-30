<template>
  <div>
  
    <aFormDesign :config="formConfig" />
  </div>
</template>

<script setup> 
import {ref} from 'vue';
const formConfig = ref( {
  "formData": [],
  "layout": "horizontal",
  "labelWidth": 100,
  "labelCol": {
    "style": {
      "width": "150px"
    }
  },
  "wrapperCol": {},
  "size": "small",  
  "attribute": [], 
  "$attrs": {},
  "css": "",
  "name": "formconfig"
}
   );
</script>


