import UserProfile from './components/Profiles/UserProfile'
import Home from './components/HomePage/Home'


var routes = [
  {
    path: "/profile",
    name: "User Profile",
    icon: "ni ni-tv-2 text-primary",
    component: UserProfile,
    layout: ""
  },
  {
    path: "/home",
    name: "Home",
    icon: "ni ni-tv-2 text-primary",
    component: Home,
    layout: ""
  }
];

export default routes;
