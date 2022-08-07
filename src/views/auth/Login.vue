<template>
<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
   <div>
    <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          <router-link :to="{ name: 'Register' }" class="font-medium text-pink-600 hover:text-pink-500"> Create an Account |</router-link>
        <router-link :to="{ name: 'Guest' }" class="font-medium text-gray-600 hover:text-gray-500"> Continue as Guest </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit="login">
        <div class="shadow-sm flex justify-items-between justify-center py-3 bg-red-500 text-white" v-if="errorMsg">
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
            <label for="email-address" class="sr-only">Email address</label>
            <input 
            id="email-address" v-model="user.email" name="email" type="email" autocomplete="email" 
            required="" 
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
            placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" v-model="user.password" name="password" type="password" autocomplete="current-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" v-model="user.remember" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
          </div>

         
        </div>

        <div>
          
           <div v-if="loading">
             <button type="submit" 
             class="group relative w-full flex justify-center py-2 px-4 border  font-medium text-white bg-gray-500  focus:outline-none">
            
           Loading...
          </button>
            </div>
            <div v-else>
              <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-white-500 group-hover:text-white-400" aria-hidden="true" />
            </span>
            Sign In
          </button>
               </div>
        </div>
      </form>
    </div>
    </div>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/solid";

import store from "../../store";
import { useRouter } from "vue-router";
import { ref } from "vue";

let loading = ref(false);

const router = useRouter();

const user = {
  email: "",
  password: "",
  remember: false
};

let errorMsg = ref("");


function login(ev) {
  ev.preventDefault();

  loading.value = true;
  
  store
    .dispatch("login", user)
    .then((res) => {
      loading.value = false;
      //console.log(res.user.is_admin);
      if(res.user.is_admin) {
        router.push({
        name: "Dashboard",
      });
      } else {
      router.push({
        name: "Home",
      }); }
     })
    .catch((err) => {
      loading.value = false;
      errorMsg.value = err.response.data.error;
     
    });
}
</script>