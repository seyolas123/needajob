<template>
<PageComponent>
 <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        
      </div>
</template>
 <div class="bg-gray-500">
     <div class="antialiased bg-gray-200 text-gray-900 font-sans p-6">

<div class="">
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
      
     </div>
     </div>
  </div>
</div>
</PageComponent>

</template>

<script setup>


import store from "../../store";
 import { computed } from "vue";
import PageComponent from "../../components/PageComponent.vue";


</script>