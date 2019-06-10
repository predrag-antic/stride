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
import MyJobApplicationsPage from './components/Applications/MyJobApplicationsPage';
import MyProjectApplicationsPage from './components/Applications/MyProjectApplicationsPage';
import UpdateInternship from './components/Publications/Internship/UpdateInternship';
import CreateProject from './components/Publications/Project/CreateProject';
import UpdateJob from './components/Publications/Job/UpdateJob';
import ProjectPage from './components/Publications/Project/ProjectPage';
import ProjectDetails from './components/Publications/Project/ProjectDetails'
import UserDetails from './components/Profiles/UserDetails'
import UserProjects from './components/Publications/Project/UserProjects'
import UpdateProject from './components/Publications/Project/UpdateProject'
import UsersJobApplication from './components/Applications/UsersApplications/UsersJobApplication'
import UsersInternshipApplication from './components/Applications/UsersApplications/UsersInternshipApplication'
import UsersProjectApplication from './components/Applications/UsersApplications/UsersProjectApplication'
import About from './components/HomePage/About'
import AboutUsWelcome from './components/HomePage/AboutUsWelcome'



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
    path: "/update-internship/:id",
    name: "Update Internship",
    icon: "ni ni-tv-2 text-primary",
    component: UpdateInternship,
    layout: ""
  },
  {
    path: "/update-job/:id",
    name: "Update Job",
    icon: "ni ni-tv-2 text-primary",
    component: UpdateJob,
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
    path: "/post-project",
    name: "Create Project",
    icon: "ni ni-tv-2 text-primary",
    component: CreateProject,
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
  },
  {
    path: "/my-job-applications",
    name: "My Job Applications Page",
    icon: "ni ni-tv-2 text-primary",
    component: MyJobApplicationsPage,
    layout: ""
  },
  {
    path: "/projects",
    name: "Project Page",
    icon: "ni ni-tv-2 text-primary",
    component: ProjectPage,
    layout: ""
  },
  {
    path: "/project-detail/:id",
    name: "Project Details",
    icon: "ni ni-tv-2 text-primary",
    component: ProjectDetails,
    layout: ""
  },
  {
    path: "/user-detail/:id",
    name: "User Details",
    icon: "ni ni-tv-2 text-primary",
    component: UserDetails,
    layout: ""
  }	,
  {
    path: "/user-projects",
    name: "User Projects",
    icon: "ni ni-tv-2 text-primary",
    component: UserProjects,
    layout: ""  
  },
  {
    path: "/update-project/:id",
    name: "Update Project",
    icon: "ni ni-tv-2 text-primary",
    component: UpdateProject,
    layout: ""
  },
  {
    path: "/my-project-applications",
    name: "My Project Applications Page",
    icon: "ni ni-tv-2 text-primary",
    component: MyProjectApplicationsPage,
    layout: ""
  },
  {
    path: "/users-job-applications/:id",
    name: "Users Job Application",
    icon: "ni ni-tv-2 text-primary",
    component: UsersJobApplication,
    layout: ""
  },
  {
    path: "/users-internship-applications/:id",
    name: "Users Internship Application",
    icon: "ni ni-tv-2 text-primary",
    component: UsersInternshipApplication,
    layout: ""
  },
  {
    path: "/users-project-applications/:id",
    name: "Users Project Application",
    icon: "ni ni-tv-2 text-primary",
    component: UsersProjectApplication,
    layout: ""
  },
  {
    path: "/about-us",
    name: "About",
    icon: "ni ni-tv-2 text-primary",
    component: About,
    layout: ""
  },
  {
    path: "/about-us-welcome",
    name: "About Us Welcome",
    icon: "ni ni-tv-2 text-primary",
    component: AboutUsWelcome,
    layout: ""
  },
  {
    path: "/",
    name: "Home",
    icon: "ni ni-tv-2 text-primary",
    component: Home,
    layout: ""
  }
];

export default routes;
