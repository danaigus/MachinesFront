<template>
  <div>
    <div class="my-3 d-flex flex-column flex-sm-row justify-content-around">
      <h1 class="text-center">Machines</h1>
      <button
        class="btn btn-primary"
        @click="addMethod()"
        data-bs-toggle="modal"
        data-bs-target="#machineModal">
        Add new machine
      </button>
    </div>
    <table class="table table-hover table-sm text-center">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status code</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        <MachineTableEntry
          v-for="machine in machinesList"
          :key="machine.id"
          :id="machine.id"
          :name="machine.name"
          :statusCode="machine.statusCode"
          @edit="editMethod(machine)"
          @delete="deleteMethod(machine)"
        />
      </tbody>
    </table>
    <MachineForm
      :propMachine="singleMachine"
      :method="method"
      @refresh="refreshData"
    />
  </div>
</template>

<script>
import axios from 'axios'
import MachineTableEntry from '../components/MachineTableEntry.vue'
import MachineForm from '../components/MachineForm.vue'

export default {
  name: 'Machines',
  components: { MachineTableEntry, MachineForm },
  data () {
    return {
      machinesList: [],
      eventList: [],
      method: 'add',
      singleMachine: {},
      showModal: false
    }
  },
  mounted () {
    this.refreshData()
  },
  methods: {
    addMethod () {
      // this.showModal = true
      this.method = 'Add'
      this.singleMachine = { name: '' }
    },
    editMethod (machine) {
      this.method = 'Edit'
      this.singleMachine = Object.assign({}, machine)
    },
    deleteMethod (machine) {
      this.method = 'Delete'
      this.singleMachine = Object.assign({}, machine)
    },
    refreshData () {
      axios.get('/api/machines')
        .then(res => { this.machinesList = res.data })
        .catch(err => console.log(err))
      axios.get('/api/events')
        .then(res => {
          for (let indexMachine = 0; indexMachine < this.machinesList.length; indexMachine++) {
            const machine = this.machinesList[indexMachine]
            for (let index = res.data.length - 1; index >= 0; index--) {
              const event = res.data[index]
              if (machine.id === event.machineId) {
                machine.statusCode = event.statusCode
                break
              }
              if (index === 0) {
                machine.statusCode = 0
              }
            }
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>
