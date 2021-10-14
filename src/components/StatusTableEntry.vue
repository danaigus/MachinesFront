<template>
  <tr class="align-middle">
    <th>{{ code }}</th>
    <th>{{ name }}</th>
    <th>
      <button class="btn btn-warning me-2" @click="$emit('edit')" data-bs-toggle="modal" data-bs-target="#statusModal">Edit</button>
      <button class="btn btn-danger" @click="$emit('delete')" data-bs-toggle="modal" data-bs-target="#statusModal">Delete</button>
    </th>
  </tr>
</template>

<script>
export default {
  name: 'StatusTableEntry',
  props: {
    code: Number,
    name: String
  }
}
</script>

<style>

</style>
