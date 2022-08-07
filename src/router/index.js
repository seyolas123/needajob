import { createRouter, createWebHistory } from "vue-router";

import AuthLayout from "../components/layouts/AuthLayout.vue";
import HomeLayout from "../components/layouts/HomeLayout.vue";
import DashboardLayout from "../components/layouts/DashboardLayout.vue";
import GuestLayout from "../components/layouts/GuestLayout.vue";

import Register from "../views/auth/Register.vue";
import Login from "../views/auth/Login.vue";

import Home from "../views/Home.vue";
import JobView from "../views/JobView.vue";
import NotFound from "../views/NotFound.vue";
import About from "../views/About.vue";

import Guest from "../views/guest/Guest.vue";

import Dashboard from "../views/admin/Dashboard.vue";
import Jobs from "../views/admin/Jobs.vue";
import Company from "../views/admin/Company.vue";
import AddEditCompany from "../views/admin/AddEditCompany.vue";
import Employers from "../views/admin/Employers.vue";
import CVs from "../views/admin/CVs.vue";
import Users from "../views/admin/users.vue";

import store from "../store";

const routes = [
    {
        name : 'HomeLayout',
        path: '/',
        redirect: "/index",
        meta: { requiresAuth: true, isGuest: false },
        component: HomeLayout,
        children: [
            { name : 'Home', path: '/index', component: Home },
            { name : 'JobView', path: '/jobdetails/:id', component: JobView },
        ]
    },
    {
        name : 'GuestLayout',
        path: '/guest',
        redirect: "/",
        meta: { isGuest: true},
        component: GuestLayout,
        children: [
            { name : 'Guest',  path: '/', component: Guest }
        ]
    },
    {
            name : 'DashboardLayout',
            path: '/admin',
            redirect: "/home",
            meta: { requiresAuth: true, isGuest: false },
            component: DashboardLayout,
            children: [
                { name : 'Dashboard', path: '/dashboard', component: Dashboard },
                { name : 'Jobs', path: '/jobs', component: Jobs },
                { name : 'Company', path: '/company', component: Company },
                { name : 'CompanyCreate', path: '/companys', component: AddEditCompany },
                { name : 'Employers', path: '/employers', component: Employers },
                { name : 'CV', path: '/cv', component: CVs },
                { name : 'Users', path: '/users', component: Users }
            ]
        },
    
    {
        name : 'AuthLayout',
        path: '/auth',
        component: AuthLayout,
        children: [
            { name : 'Register', path: '/register', component: Register },
            { name : 'Login', path: '/login', component: Login },
            
        ]
    },

    {
        path: '/404',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/about',
        name: 'AboutUs',
        component: About
    }
   
    
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
      next({ name: "Login" });
    } else if (to.meta.requiresAuth && !store.state.user.token && to.meta.isGuest) {
        next({ name: "Home" });
      } else if (to.meta.requiresAuth && !store.state.user.data.is_admin && to.meta.isGuest) {
        next({ name: "Dashboard" });
      } 
    else {
      next();
    }
  });

export default router;