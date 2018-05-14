<template>
  <div>
    <input type="text" placeholder="Enter message" v-model="newMessage" @keyup.enter="tryAddMessage">
    <button type="submit" @click="tryAddMessage">Add message</button>
    <ul>
      <li v-for="message in messages" v-bind:key="message">
        <span>{{ message.text }}</span>
        <button @click="tryRemoveMessage(message._id)">x</button>
        <input type="text" placeholder="{{ message.text }}" v-model="editedMessage" @keyup.enter="tryEditMessage">
        <button @click="tryEditMessage(message._id)" v-bind="editedMessage">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import * as services from '../services'
  import { getMessages } from '../vuex/getters'
  import { fetchMessages, addMessage, removeMessage, editMessage } from '../vuex/actions'

  export default {
    vuex: {
      getters: {
        messages: getMessages
      },
      actions: {
        fetchMessages,
        addMessage,
        removeMessage,
        editMessage
      },
      store: {
        messages: []
      }
    },
    data () {
      return {
        newMessage: '',
        editedMessage: ''
      }
    },
    ready () {
      this.fetchMessages()
      this.addMessage()
      this.removeMessage()
      this.editMessage()
    },
    methods: {
      tryAddMessage () {
        if (this.newMessage.trim()) {
          // Persist a new message to the db
          services.messageService.create({ text: this.newMessage }).then(this.newMessage = '')
        }
      },
      tryRemoveMessage (message) {
        // Remove message from the db
        services.messageService.remove(message)
      },
      tryEditMessage (message) {
        console.log('edit button clicked')
        if (this.editedMessage.trim()) {
          // Persist the edited message to the db
          services.messageService.create({ text: this.editedMessage }).then(this.editedMessage = '')
        }
      }
    }
  }
</script>
