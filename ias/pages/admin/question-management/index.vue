<template>
    <BasePage title="Question Management">

      <div class="w-full items-center">

        <div class="ml-6 flex border-b pb-3">
          <div class="flex space-x-4 md:space-x-8">
            <router-link to="/admin/question-management/#" custom v-slot="{ navigate }">
                    
              <button @click="navigate" role="link" class="inline-block rounded-md bg-black px-6 py-2 font-semibold text-white shadow-md duration-75 hover:bg-yellow-500">
                
                Add New Questions
              
              </button>
            
            </router-link> 

            <router-link to="/admin/question-management/ai-generation" custom v-slot="{ navigate }">
                    
              <button @click="navigate" role="link" class="inline-block rounded-md bg-black px-6 py-2 font-semibold text-white shadow-md duration-75 hover:bg-yellow-500">
                
                Generate New Questions
              
              </button>
                  
            </router-link> 

          </div>

        </div>



        <!-- Questions -->
        <div class="mx-20 my-6 rounded-xl border p-5 shadow-md w-9/12 bg-white" v-for="question in questions">
          
          <!-- Question Category and Weight -->
          <div class="flex w-full items-center justify-between border-b pb-3">
            
            <div class="flex items-center space-x-3">
              
              <div class="text-xs font-bold text-black">
                Category: {{ categoryNameFromSlug(question.category)}}
              </div>
            
            </div>
            
            <div class="flex items-center space-x-8">
              
                <button class="rounded-2xl border bg-yellow-300 px-3 py-1 text-xs font-bold">
                    Weight: {{question.weight}}
                </button>

            </div>

          </div>

          <!-- Question Text -->
          <div class="mt-4 mb-6">
            
            <div class=" text-base font-semibold">
              {{ question.question }}
            </div>
          
          </div>

          <!-- Action Icons -->
          <div>
            
            <div class="flex items-center justify-between text-slate-500">
                
              <div class="flex space-x-4 md:space-x-8">
                <router-link to="/admin/question-management/edit" custom v-slot="{ navigate }">
                        
                  <button @click="navigate" role="link" class="inline-block rounded-md bg-blue-500 px-6 py-2 font-semibold text-white shadow-md duration-75 hover:bg-green-500">
                    Edit
                  
                  </button>
                
                </router-link> 
                
                <button class="inline-block rounded-md bg-black px-6 py-2 font-semibold text-white shadow-md duration-75 hover:bg-red-700">
                  Delete
                </button>
              
              </div>
            
            </div>
          
          </div>
        
        </div>
      
      </div>

      

    </BasePage>
  </template>
  
  <script>
  export default  {
    methods: {
      categoryNameFromSlug(slug) {
        let categoryName = this.$store.getters['categories/getAllCategories'].find((category) => {
          return category.slug === slug;
        })
        if (categoryName === undefined) {
          return "Unknown Category"
        }
        return categoryName.name;
      }
    },
    computed: {
      questions() {
        return this.$store.getters['questions/getAllQuestions'];
      }
    },
    beforeMount() {
      this.$store.dispatch('questions/retrieveQuestions');
      this.$store.dispatch('categories/retrieveCategories');
    }
  }
  </script>
  
  <style>
/*   .box > *{
    margin-bottom: 0.75em;
  } */
  </style>
  