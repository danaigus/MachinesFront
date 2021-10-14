<template>
  <tr class="align-middle">
    <th>{{ id }}</th>
    <th>{{ date }}</th>
    <th>{{ machineId }}</th>
    <th>{{ statusCode }}</th>
  </tr>
</template>

<script>
export default {
  name: 'MachineTableEntry',
  props: {
    id: Number,
    date: String,
    machineId: Number,
    statusCode: Number
  }
}
</script>

<style>

</style>
