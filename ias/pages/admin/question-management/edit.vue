<template>
  <BasePage>
    <div>
      <form>
        <label for="question">Question</label>
        <input name="question" type="text"/>
        <label for="weight">Weight</label>
        <input name="weight" type="number"/>
        <label for="category">Category</label>
        <select name="category">
          <option>Declared Items</option>
          <option>Declared Items</option>
          <option>Declared Items</option>
          <option>Declared Items</option>
        </select>
        <!-- Space for a plus icon for adding categories -->
        <input name="new-category" type="text" hidden="true">
        <input name="new-category-slug" type="text" hidden="true">
        <input type="submit">
      </form>
    </div>
  </BasePage>
</template>

