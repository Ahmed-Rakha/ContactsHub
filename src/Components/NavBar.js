function NavBar() {
  return `

  <div class="container">
   <div class="d-flex align-items-center gap-3">
    <div class="icon-container icon-container-lg bg-violet-500">
        <i class="fa-solid fa-address-book text-white fs-3"></i>
    </div>
    <div class="logo-text-container">
        <h1 class="brand-color mb-0 fs-3 fw-bold">
        <span>Contact<span class="color-violet-600">Hub</span></span> 
        </h1>
         <p class="text-muted mb-0">Smart Contact Manager</p>
    </div>
    

   </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-3">
        <li class="nav-item">
          <button class="btn btn-brand-color rounded-3 py-2"><i class="fa-solid fa-plus text-white"></i> <span class="text-capitalize">Add Contact</span></button>
        </li>
        <li class="nav-item icon-container ">
          <a class="nav-link" href="#">
          <i class="fa-solid fa-bell"></i>
          </a>
        </li>
         <li class="nav-item icon-container">
          <a class="nav-link" href="#">
          <i class="fa-solid fa-gear"></i>
          </a>
        </li>
         <li class="nav-item nav-profile-pic">
         
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="user"/>
        
        </li>
      </ul>
    </div>
  </div>

  
  `;
}

export default NavBar;
