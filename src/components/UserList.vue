<template>
<div class="container mx-auto">

  <div>
      
        <div class="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
        
        <div class="p-4 border-t border-b text-xs ">
          
          <span class="flex items-center">
            <i class="far fa-address-card fa-fw text-black mr-2"></i>
            <p class="strong text-xl">{{ user.name }}</p>
          </span>        
        </div>
        
        <div class="p-4 border-t border-b text-xs text-gray-700">
          <span class="flex items-center mb-1">
           Useremail
          </span>
          <span class="flex items-center">
            <i class="far fa-address-card fa-fw text-gray-900 mr-2"></i>
            <p class="strong text-xl">{{ user.email }}</p>
          </span>        
        </div>
        <div class="p-4 border-t border-b text-xs text-gray-700">
          <span class="flex items-center mb-1">
           UserType
          </span>
          <span class="flex items-center">
            <i class="far fa-address-card fa-fw text-gray-900 mr-2"></i>
            <div v-if="user.is_admin">
            <p class="strong text-2xl">Administrator</p>
            </div>
            <div v-else>
              <p class="strong text-2xl">Applicant</p>
            </div>
          </span>        
        </div>
        <div v-if="user.is_admin" class="p-4 border-t border-b text-xs text-gray-700">
          <span class="flex items-center mb-1">
           Job Posted
          </span>
          <span class="flex items-center">
            <i class="far fa-address-card fa-fw text-gray-900 mr-2"></i>
            
            <p class="strong text-2xl">10</p>
            
          </span>        
        </div>
        <div v-else class="p-4 border-t border-b text-xs text-gray-700">
          <span class="flex items-center mb-1">
           Job Applied
          </span>
          <span class="flex items-center">
            <i class="far fa-address-card fa-fw text-gray-900 mr-2"></i>
            
            <p class="strong text-2xl">1</p>
            
          </span>        
        </div>
        <div class="bg-black p-4 flex justify-items-between items-center text-sm">

          <router-link :to="{ name: 'Home' }" class="cursor-pointer text-white hover:text-white-400">Edit |</router-link>
          <a @click="delete(job)" class="text-white hover:text-white-400 cursor-pointer"> Delete</a>

          </div>
        </div>
      </div>
</div>
   

</template>

<script setup>
 
 const { user } = defineProps({
  user: Object,
});
</script>

<style>
</style>