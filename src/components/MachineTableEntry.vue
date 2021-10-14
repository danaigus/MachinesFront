<template>
  <tr class="align-middle">
    <th>{{ id }}</th>
    <th>{{ name }}</th>
    <th>{{ statusCode }}</th>
    <th>
      <button class="btn btn-warning me-2" @click="$emit('edit')" data-bs-toggle="modal" data-bs-target="#machineModal">Edit</button>
      <button class="btn btn-danger" @click="$emit('delete')" data-bs-toggle="modal" data-bs-target="#machineModal">Delete</button>
    </th>
  </tr>
</template>

<script>
export default {
  name: 'MachineTableEntry',
  props: {
    id: Number,
    name: String,
    statusCode: Number
  }
}
</script>

<style>

</style>
