<template>
  <div class="modal fade" id="machineModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ method }} machine</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="formSwitch">
            <div v-if="method !== 'Add'" class="mb-2">
              <label class="form-label">Machine ID</label>
              <input
                type="text"
                class="form-control"
                required
                v-model="machine.id"
                disabled>
            </div>
            <div class="mb-2">
              <label class="form-label">Machine name</label>
              <input
                type="text"
                class="form-control"
                required
                v-model="machine.name"
                :disabled="method === 'Delete'">
            </div>
            <button
              type="button"
              class="btn btn-secondary me-2"
              data-bs-dismiss="modal">
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-target="#resultModal"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              :disabled="machine.name.length < 1">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="resultModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ method }} machine</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <div v-if="!done">
            <span>Waiting response</span>
          </div>
          <div v-else>
            <span v-if="success">Success</span>
            <span v-else>Failure</span>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary"
            data-bs-target="#resultModal"
            data-bs-toggle="modal"
            data-bs-dismiss="modal"
            :disabled="!done">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MachineForm',
  props: {
    propMachine: Object,
    method: String
  },
  emits: ['refresh'],
  data () {
    return {
      machine: { name: '' },
      done: false,
      success: false
    }
  },
  beforeUpdate () {
    this.machine = this.propMachine
  },
  methods: {
    formSwitch () {
      this.done = false
      this.success = false
      switch (this.method) {
        case 'Add':
          axios.post('/api/machines', this.machine)
            .then(res => {
              this.success = true
              this.$emit('refresh')
            })
            .catch(err => console.log(err))
            .finally(() => { this.done = true })
          break
        case 'Edit':
          axios.put('/api/machines/' + this.machine.id, this.machine)
            .then(res => {
              this.success = true
              this.$emit('refresh')
            })
            .catch(err => console.log(err))
            .finally(() => { this.done = true })
          break
        case 'Delete':
          axios.delete('/api/machines/' + this.machine.id)
            .then(res => {
              this.success = true
              this.$emit('refresh')
            })
            .catch(err => console.log(err))
            .finally(() => { this.done = true })
          break
        default:
          break
      }
    }
  }
}
</script>

<style>

</style>
