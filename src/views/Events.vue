<template>
  <div>
    <div class="my-3 d-flex flex-column flex-sm-row justify-content-around">
      <h1 class="text-center">Events</h1>
      <button
        class="btn btn-primary"
        @click="toggleIntervalInput">
        Generate random events
      </button>
      <!-- <button
        class="btn btn-primary"
        @click="deleteAllEvents">
        Delete all events
      </button> -->
    </div>
    <div v-if="showIntervalInput" @submit.prevent="startGenerateRandomEvents">
      <form class="bg-light shadow-sm p-2 mb-4 rounded">
        <label class="form-label">Set the interval to generate random events in seconds</label>
        <input
          type="number"
          class="form-control"
          required
          v-model="interval"
        >
        <div class="mt-2">
          <button
            type="button"
            class="btn btn-secondary me-2"
            @click="toggleIntervalInput"
            :disabled="generatingEvents">
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="interval < 1 || generatingEvents">
            Confirm
          </button>
          <button
            v-if="generatingEvents"
            type="button"
            class="btn btn-secondary ms-2"
            @click="stopGenerateRandomEvents">
            Stop generation
          </button>
        </div>
      </form>
    </div>
    <table class="table table-hover table-sm text-center">
      <thead>
        <tr>
          <th>Event ID</th>
          <th>Date</th>
          <th>Machine ID</th>
          <th>Status code</th>
        </tr>
      </thead>
      <tbody>
        <EventTableEntry
          v-for="event in eventsList"
          :key="event.id"
          :id="event.id"
          :date="event.date"
          :machineId="event.machineId"
          :statusCode="event.statusCode"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import EventTableEntry from '../components/EventTableEntry.vue'

export default {
  name: 'Events',
  components: { EventTableEntry },
  data () {
    return {
      eventsList: [],
      statusList: [],
      machinesList: [],
      intervalFunction: {},
      interval: 0,
      showIntervalInput: false,
      generatingEvents: false
    }
  },
  mounted () {
    axios.get('/api/events')
      .then(res => { this.eventsList = res.data })
      .catch(err => console.log(err))
    axios.get('/api/status')
      .then(res => { this.statusList = res.data })
      .catch(err => console.log(err))
    axios.get('/api/machines')
      .then(res => { this.machinesList = res.data })
      .catch(err => console.log(err))
  },
  methods: {
    startGenerateRandomEvents () {
      this.intervalFunction = setInterval(this.generateRandomEvents, this.interval * 1000)
      this.generatingEvents = true
    },
    stopGenerateRandomEvents () {
      clearInterval(this.intervalFunction)
      this.generatingEvents = false
    },
    generateRandomEvents () {
      const promises = []
      this.machinesList.forEach(machine => {
        const status = this.statusList[Math.floor(Math.random() * this.statusList.length)]
        const newEvent = {
          machineId: machine.id,
          statusCode: status.code
        }
        promises.push(axios.post('/api/events', newEvent))
      })
      Promise.all(promises)
        .catch(err => console.log(err))
        .finally(() => this.refreshData())
    },
    refreshData () {
      axios.get('/api/events')
        .then(res => { this.eventsList = res.data })
        .catch(err => console.log(err))
    },
    deleteAllEvents () {
      this.eventsList.forEach(event => {
        axios.delete('/api/events/' + event.id)
          .catch(err => console.log(err))
      })
    },
    toggleIntervalInput () {
      this.showIntervalInput = !this.showIntervalInput
    }
  }
}
</script>

<style>

</style>
