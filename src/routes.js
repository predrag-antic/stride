import UserProfile from './components/Profiles/UserProfile'
import Home from './components/HomePage/Home'
import CreateJob from './components/Publications/Job/CreateJob'
import CreateInternship from './components/Publications/Internship/CreateInternship'
import Company from './components/Profiles/Company';
import JobPage from './components/Publications/Job/JobPage'
import JobDetails from './components/Publications/Job/JobDetails'
import InternshipPage from './components/Publications/Internship/InternshipPage'
import InternshipDetails from './components/Publications/Internship/InternshipDetails'
import CompanyJobs from './components/Publications/Job/CompanyJobs'
import CompanyDetails from './components/Profiles/CompanyDetails'
import CompanyInternships from './components/Publications/Internship/CompanyInternships';
import AppWelcome from './components/AppWelcome';
import MyApplicationsPage from './components/Applications/MyApplicationsPage';

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
  },
  {
    path: "/company",
    name: "Company",
    icon: "ni ni-tv-2 text-primary",
    component: Company,
    layout: ""
  },
  {
    path: "/jobs",
    name: "Job Page",
    icon: "ni ni-tv-2 text-primary",
    component: JobPage,
    layout: ""
  },
  {
    path: "/job-detail/:id",
    name: "Job Details",
    icon: "ni ni-tv-2 text-primary",
    component: JobDetails,
    layout: ""
  },
  {
    path: "/internships",
    name: "Internship Page",
    icon: "ni ni-tv-2 text-primary",
    component: InternshipPage,
    layout: ""
  },
  {
    path: "/internship-detail/:id",
    name: "Internship Details",
    icon: "ni ni-tv-2 text-primary",
    component: InternshipDetails,
    layout: ""
  },
  {
    path: "/company-jobs",
    name: "Company Jobs",
    icon: "ni ni-tv-2 text-primary",
    component: CompanyJobs,
    layout: ""
  },
  {
    path: "/company-detail/:id",
    name: "Company Details",
    icon: "ni ni-tv-2 text-primary",
    component: CompanyDetails,
    layout: ""
  },
  {
    path: "/company-internships",
    name: "Company Internships",
    icon: "ni ni-tv-2 text-primary",
    component: CompanyInternships,
    layout: ""
  },
  {
    path: "/app-welcome",
    name: "App Welcome",
    icon: "ni ni-tv-2 text-primary",
    component: AppWelcome,
    layout: ""
  },
  {
    path: "/my-applications",
    name: "My Applications Page",
    icon: "ni ni-tv-2 text-primary",
    component: MyApplicationsPage,
    layout: ""
  }
];

export default routes;
