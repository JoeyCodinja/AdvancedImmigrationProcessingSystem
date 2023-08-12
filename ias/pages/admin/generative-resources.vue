<template>
  <BasePage title="Current Training Data Documents">
    <div class="apple-container">
      <p class="apple-title">
        These documents are used to form the context
        through which the questions in the system
        are generated
      </p>
      <div class="apple-documents">
        <div class="apple-documents-list">
          <p class="apple-documents-heading">Documents in use</p>
          <ul class="apple-ul">
            <li class="apple-li">
              Immigration Restriction (Commonwealth Citizens Act (1945))
              <img src="/edit-pencil.png" class="w-5 h-5" />
            </li>
            <li class="apple-li">
              Aliens Act (1946)
              <img src="/edit-pencil.png" class="w-5 h-5" />
            </li>
            <li class="apple-li">
              Passport Act
              <img src="/edit-pencil.png" class="w-5 h-5" />
            </li>
            <li class="apple-li">
              Foreign Nationals and Commonwealth Citizens (Employment Act)
              <img src="/edit-pencil.png" class="w-5 h-5" />
            </li>
            <li class="apple-li">
              Nationality Act
              <img src="/edit-pencil.png" class="w-5 h-5" />
            </li>
          </ul>
        </div>
        <div class="apple-upload">
          <p class="apple-documents-heading">Upload Documents</p>
          <img src="/document-outline/document-outline/64x64.png" class="apple-upload-icon"/>
          <button class="apple-upload-button">Browse</button>
        </div>
      </div>
    </div>
  </BasePage>
</template>

<script>

</script>

<style>
.apple-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
}

.apple-title {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
}

.apple-documents {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.apple-documents-list, .apple-upload {
  flex: 1;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 0 1rem;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.apple-documents-heading {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}

.apple-ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.apple-li {
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
  line-height: 1.4;
  border-bottom: 1px solid #ccc; /* Add border line between items */
  padding-bottom: 0.5rem; /* Add padding to separate items */
  display: flex;
  align-items: center;
}

.apple-li img {
  margin-left: auto;
}

.apple-li:last-child {
  border-bottom: none; /* Remove border line from last item */
  padding-bottom: 0; /* Remove padding from last item */
}

.apple-li::before {
  content: "•";
  position: absolute;
  left: 0;
  top: 0.2rem;
  color: #007bff;
}

.apple-upload-icon {
  display: block;
  margin: 0 auto;
}

.apple-upload-button {
  display: block;
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.apple-upload-button:hover {
  background-color: #0056b3;
}
</style>
