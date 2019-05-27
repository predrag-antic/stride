import UserProfile from './components/Profiles/UserProfile'
import Home from './components/HomePage/Home'
import CreateJob from './components/Publications/CreateJob'
import CreateInternship from './components/Publications/CreateInternship'


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
  },
  {
    path: "/post-job",
    name: "Job",
    icon: "ni ni-tv-2 text-primary",
    component: CreateJob,
    layout: ""
  },
  {
    path: "/post-internship",
    name: "Internship",
    icon: "ni ni-tv-2 text-primary",
    component: CreateInternship,
    layout: ""
  }
];

export default routes;
