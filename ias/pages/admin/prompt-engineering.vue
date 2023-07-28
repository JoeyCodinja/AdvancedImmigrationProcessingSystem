<template>
  <BasePage title="Prompt Engineering">
    <div class="flex flex-col">
      <p class="italic text-2xl">Prompts in use</p>
      <div class="prompt-box flex flex-col">
        <p class="flex-2">Generate questions which use the Aliens Act (1946) which would restrict entry to the port of Jamaica ?</p>
        <div class="flex flex-row w-full flex-1 gap-8">
          <div class="flex-1 blue-btn">Edit</div>
          <div class="flex-1 red-btn">Delete</div>
          <div class="flex-1 green-btn">
            <label for="prompt-enabled">Enabled?</label>
            <input name="prompt-enabled" type="checkbox" checked="checked"/>
          </div>
        </div>
      </div>
      <div class="prompt-box flex flex-col">
        <p class="flex-2">Generate questions which use the Immigration Restriction (Commonwealth Citizens Act (1945)) which would restrict entry to the port of Jamaica ?</p>
        <div class="flex flex-row w-full flex-1 gap-8">
          <div class="flex-1 blue-btn">Edit</div>
          <div class="flex-1 red-btn">Delete</div>
          <div class="flex-1 green-btn">
            <label for="prompt-enabled">Enabled?</label>
            <input name="prompt-enabled" type="checkbox" checked="checked"/>
          </div>
        </div>

      </div>
      <div class="prompt-box flex flex-col">
        <p class="flex-2">Generate questions which use the Passport Act of Jamaica which would restrict entry to the port of Jamaica ?</p>
        <div class="flex flex-row w-full flex-1 gap-8">
          <div class="flex-1 blue-btn">Edit</div>
          <div class="flex-1 red-btn">Delete</div>
          <div class="flex-1 green-btn">
            <label for="prompt-enabled">Enabled?</label>
            <input name="prompt-enabled" type="checkbox" checked="checked"/>
          </div>
        </div>
      </div>
      <div class="prompt-box flex flex-col">
        <p class="flex-2">Generate questions which use the Foreign Nationals and Commonwealth Citizens (Employment Act) which would restrict entry to the port of Jamaica ?</p>
        <div class="flex flex-row w-full flex-1 gap-8">
          <div class="flex-1 blue-btn">Edit</div>
          <div class="flex-1 red-btn">Delete</div>
          <div class="flex-1 green-btn">
            <label for="prompt-enabled">Enabled?</label>
            <input name="prompt-enabled" type="checkbox" checked="checked"/>
          </div>
        </div>
      </div>
      <div class="prompt-box flex flex-col">
        <p class="flex-2"> Generate questions which use the Nationality Act which would restrict entry to the port of Jamaica ?</p>
        <div class="flex flex-row w-full flex-1 gap-8">
          <div class="flex-1 blue-btn">Edit</div>
          <div class="flex-1 red-btn">Delete</div>
          <div class="flex-1 green-btn">
            <label for="prompt-enabled">Enabled?</label>
            <input name="prompt-enabled" type="checkbox" checked="checked"/>
          </div>
        </div>
      </div>

    </div>
  </BasePage>
</template>

<style>
.prompt-box{
  height:8rem;
  width: 50vw;
  padding: 1rem;
  margin: 2rem;
  border-radius: 15px;
  box-shadow: 5px 8px 10px grey;
  border-top: black 8px solid;
}

.blue-btn, .red-btn, .green-btn {
  text-align: center;
  color: white;
  border-radius: 1rem;
  font-weight:800;
}

.blue-btn {
  background-color: blue;
  box-shadow: -5px -5px 10px darkblue;
}

.red-btn {
  background-color: red;
  box-shadow: -5px -5px 10px darkred;
}

.green-btn {
  background-color: green;
  box-shadow: -5px -5px 10px darkgreen;
}
</style>
