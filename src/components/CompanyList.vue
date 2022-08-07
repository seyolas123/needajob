<template>
<div class="container mx-auto">

  <div>
      
        <div class="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
 
        <div class="p-4">
          <router-link :to="{ name: 'CompanyCreate', params: { id: company.id } }" class="inline-block px-2 py-1 leading-none bg-green-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
           {{ company.name }}</router-link>
          <h2 class="mt-2 mb-2  font-bold">
            {{ company.title }}
          </h2>
          <p class="text-sm">
           {{ company.description }}
           </p>
          
        </div>
        <div class="p-4 border-t border-b text-xs text-gray-700">
          <span class="flex items-center mb-1">
           
          </span>
          <span class="flex items-center">
            <i class="far fa-address-card fa-fw text-gray-900 mr-2"></i>
            <p class="strong text-2xl">{{ company.location }}</p>
          </span>        
        </div>

        <div class="p-4 border-t border-b text-xs text-gray-700">
          <span class="flex items-center mb-1">
           
          </span>
          <span class="flex items-center">
           
          </span>        
        </div>

        
        
      </div>
</div>
   </div>

</template>

<script setup>
 

 const { company } = defineProps({
  company: Object,
});
</script>

<style>
</style>