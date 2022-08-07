<template>
<div class="container mx-auto">

  <div>
     
        <router-link :to="{ name: 'JobView', params: { id: job.job_unique_id }}" class="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
        
        <div class="p-4">
          <span class="inline-block px-2 py-1 leading-none bg-green-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
           {{ job.type }}</span>
          <h2 class="mt-2 mb-2  font-bold">
            {{ job.title }}
          </h2>
          <p class="text-sm">
           {{ job.description }}
           </p>
          <div class="mt-3 flex items-center">
            <span class="text-xs font-semibold">
 Salary Range:
            </span>&nbsp;<span class="font-bold text-sm">
             
{{ job.salary }} JPY per year

          </span>
          </div>
        </div>
        <div class="p-4 border-t border-b text-xs text-gray-700">
          <span class="flex items-center mb-1">
           
          </span>
          <span class="flex items-center">
            <i class="far fa-address-card fa-fw text-gray-900 mr-2"></i>
            <p class="strong text-2xl">{{ job.location }}</p>
          </span>        
        </div>
        <div class="bg-black p-4 flex items-center text-sm">

          <router-link :to="{ name: 'JobView', params: { id: job.job_unique_id }}" class="text-white hover:text-white-400">Apply Now</router-link>

          </div>
        </router-link>
      </div>
</div>
   

</template>

<script setup>
 
 const { job } = defineProps({
  job: Object,
});
</script>

<style>
</style>