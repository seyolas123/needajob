<template>
<PageComponent>
 <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">
            {{ model.name  ? model.name : "Create a Company"}}
            </h1>
        
      </div>
</template>
 <div class="bg-gray-500">
     <div class="antialiased bg-gray-200 text-gray-900 font-sans p-6">

    <form class="mt-8 space-y-6" @submit="saveCompany">
        <div v-if="errorMsg">
      {{ errorMsg }}
      <span
        @click="errorMsg = ''"
        class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
    </div>
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Company Name</label>
            <input id="name"  v-model="model.name" name="name" type="text" autocomplete="name" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name of the Company" />
          </div>
         
          <div>
            <label for="location" class="sr-only">Company location</label>
            <input id="location"  v-model="model.location" name="location" type="text" autocomplete="location" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Location of the Company" />
          </div>

          <div>
            <label for="name" class="sr-only">Company Description</label>
           <textarea v-model="model.description" rows="10" 
           class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Write a Description about your company">
            
           </textarea>
          </div>

         
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-white-500 group-hover:text-white-400" aria-hidden="true" />
            </span>
            Save
          </button>
        </div>
      </form>
  </div>
</div>
</PageComponent>
</template>

<script setup>

import PageComponent from "../../components/PageComponent.vue";
import { ref } from "vue";
import store from "../../store";
import { useRoute } from "vue-router";

const route = useRoute();

let model = ref({
    name: '',
    description: '',
    location: '',
});

if(route.params.id){
    model.value = store.state.company.find(
       (c) => c.id === parseInt(route.params.id)
    );
}

function saveCompany(){
  store.dispatch('savesurvey', model.value)
       .then(() => {

       })
       .catch((err) => {

       });
}
 

</script>