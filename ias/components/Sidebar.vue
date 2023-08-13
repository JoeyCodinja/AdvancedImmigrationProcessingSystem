<template>
  <div
    id="view"
    class="h-full"
    x-data="{ sidenav: true }"
  >
    <button
      @click="sidenav = true"
      class="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
    >
      <svg
        class="w-5 h-5 fill-current"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- SVG Path -->
      </svg>
    </button>
    <div
      id="sidebar"
      class="bg-zinc-800 h-screen md:block  px-3 flex overflow-x-hidden transition-transform duration-300 ease-in-out pt-5"
      x-show="sidenav"
      @click.away="sidenav = false"
    >
      <!--<img
        src="/AIPS_Logo_no_text_white.png"
        class="w-20 mx-auto"
      /> -->
      <div class="space-y-5 md:space-y-7">
        <!--         <h1 class="font-bold text-4xl text-center md:hidden">
                  AIPS
                </h1>
                <h1 class="hidden md:block font-bold text-2xl md:text-2xl text-center text-white">
                  AIPS
                </h1>
                <h1 class="hidden md:block font-bold text-sm md:text-sm text-center text-white">
                  Building Bridges of Understanding and Unity
                </h1> -->

        <!-- Search input -->
        <div class="flex border-2 border-gray-200 bg-white rounded-md focus-within:ring-2 ring-teal-500 ">
          <input
            type="text"
            class="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
            placeholder="Search"
            v-bind:ref="'caseSearch'"
            v-bind:name="'caseSearch'"
          />
          <button class="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block" v-on:click="runFindEntrant">
            <svg
              class="w-4 h-4 fill-current"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Navigation links -->

        <!-- Dashboard -->
        <div id="menu" class="flex flex-col space-y-2">
          <router-link
            to="/"
            class="nav-link"
          >
            <svg
              class="nav-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              ></path>
            </svg>
            <span class="nav-text">Dashboard</span>
          </router-link>

          <!-- Cases -->
          <router-link
            to="/cases"
            v-if="$route.path!=='/cases'"
            class="nav-link"
          >
            <svg
              class="nav-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
              ></path>
            </svg>
            <span class="nav-text">Cases</span>
          </router-link>

          <router-link
            to="/cases"
            v-if="$route.path==='/cases'"
            class="nav-link active"
          >
            <svg
              class="nav-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
              ></path>
            </svg>
            <span class="nav-text">Cases</span>
          </router-link>

          <!-- Review -->
          <router-link
            to="/cases/review"
            v-if="$route.path!=='/cases/review'"
            class="nav-link"
          >
            <svg
              class="nav-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
              ></path>
              <path
                d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
              ></path>
            </svg>
            <span class="nav-text">Review</span>
          </router-link>

          <router-link
            to="/cases/review"
            v-if="$route.path==='/cases/review'"
            class="nav-link active"
          >
            <svg
              class="nav-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
              ></path>
              <path
                d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
              ></path>
            </svg>
            <span class="nav-text">Review</span>
          </router-link>

          <!-- Training Data -->
          <router-link
            to="/admin/generative-resources"
            v-if="$route.path!=='/admin/generative-resources'"
            class="nav-link"
          >
            <svg
              class="nav-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="nav-text">Training Data</span>
          </router-link>

          <router-link
            to="/admin/generative-resources"
            v-if="$route.path==='/admin/generative-resources'"
            class="nav-link active"
          >
            <svg
              class="nav-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="nav-text">Training Data</span>
          </router-link>

          <!-- Question Management -->
          <router-link
            to="/admin/question-management"
            v-if="$route.path!=='/admin/question-management'"
            class="nav-link"
          >
            <svg
              class="nav-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
              ></path>
            </svg>
            <span class="nav-text">Question Management</span>
          </router-link>

          <router-link
            to="/admin/question-management"
            v-if="$route.path==='/admin/question-management'"
            class="nav-link active"
          >
            <svg
              class="nav-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
              ></path>
            </svg>
            <span class="nav-text">Question Management</span>
          </router-link>

          <!-- Business Rule -->
          <router-link
            to="/admin/business-rule"
            v-if="$route.path!=='/admin/business-rule'"
            class="nav-link"
          >
            <svg
              class="nav-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
              ></path>
            </svg>
            <span class="nav-text">Business Rule</span>
          </router-link>

          <router-link
            to="/admin/business-rule"
            v-if="$route.path==='/admin/business-rule'"
            class="nav-link active"
          >
            <svg
              class="nav-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
              ></path>
            </svg>
            <span class="nav-text">Business Rule</span>
          </router-link>

          <!-- Prompt Engineering -->
          <router-link
            to="/admin/prompt-engineering"
            v-if="$route.path!=='/admin/prompt-engineering'"
            class="nav-link"
          >
            <svg
              class="nav-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
              ></path>
            </svg>
            <span class="nav-text">Prompt Engineering</span>
          </router-link>

          <router-link
            to="/admin/prompt-engineering"
            v-if="$route.path==='/admin/prompt-engineering'"
            class="nav-link active"
          >
            <svg
              class="nav-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
              ></path>
            </svg>
            <span class="nav-text">Prompt Engineering</span>
          </router-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  methods: {
    runFindEntrant() {
      this.$store.dispatch('entrants/findEntrant', this.$refs['caseSearch'].value)
      this.$router.push({path: '/cases/review', replace: true});
    }
  }
}
</script>

<style>
/* Add rounded corners to the sidebar container */
#sidebar {
  width:250px;
  border-top-right-radius: 0rem;
  border-bottom-right-radius: 1.5rem;
  position: fixed; /* Add this line to fix the sidebar's position */


}

/* Add rounded corners to the input container */
.flex.border-2 {
  border-radius: .5rem;
}

/* Add rounded corners to the navigation links */
.nav-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

/* Style for navigation icons */
.nav-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  color: white;
}

/* Style for navigation text */
.nav-text {
  color: white;
  font-size: 0.875rem;
}

/* Hover styles for navigation links */
.nav-link.active, .nav-link:hover {
  background-color: #4FD1C5;
  color: white;
  transform: scale(1.05);
}

.min-w-fifth > a, p{
  margin-bottom: 0.75rem;
}
</style>

