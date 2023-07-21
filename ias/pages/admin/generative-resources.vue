<template>
  <BasePage>
    <div class="flex flex-col">
      <h2 class="text-5xl font-extrabold">Current Training Data Documents</h2>
      <p style="padding-bottom: 2rem;display:block;" class="text-2xl">
        These documents are use to form the context
        through which the questions in the system
        are generated
      </p>
      <div style="display: flex; ">
        <div style="flex: 1 1 100%; margin-right:5%;">
          <p class="documents-title text-lg font-bold">Documents in use</p>
          <ul>
            <li>Immigration Restriction (Commonwealth Citizens Act (1945))</li>
            <li>Aliens Act (1946)</li>
            <li>Passport Act</li>
            <li>Foreign Nationals and Commonwealth Citizens (Employment Act)</li>
            <li>Nationality Act</li>
          </ul>
        </div>
        <div style="flex: 1 1 100%;">
          <p class="upload-title text-lg font-bold" style="display:block;text-align:center;">Upload Documents</p>
          <img src="/document-outline/document-outline/64x64.png" style="margin-left:auto;margin-right:auto;"/>
          <button style="margin-left:auto;margin-right:auto;display:block;">Browse</button>
        </div>
      </div>
    </div>
  </BasePage>
</template>

<script>

</script>

<style>
ul > li {
  border-bottom: 1px solid black;
  padding-bottom: 10px;
}

ul > li:last-child {
  border-bottom: 0px;
  padding-bottom: 0px;
}

.documents-title, upload-title {
  display: inherit;
  text-align: center;
}
</style>
