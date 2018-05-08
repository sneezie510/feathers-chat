<template>
  <div>
    <input type="text" ref="new_message" :value="newMessage" placeholder="Enter message" v-model="newMessage" :disabled="!isEditing" :class="{view: !isEditing}" @keyup.enter="tryAddMessage">
    <button type="submit" @click="tryAddMessage">Add message</button>
    <ul>
      <li v-for="message in messages" v-bind:key="message">
        <span>{{ message.text }}</span>
        <button @click="tryRemoveMessage(message._id)">x</button>
        <button @click="isEditing = !isEditing" v-if="!isEditing">Edit</button>
        <button @click="save" v-else-if="isEditing">Save</button>
        <button v-if="isEditing" @click="isEditing = false">Cancel</button>
        <!-- <v-if="tryEditMessage"> type="text" placeholder="Enter message" v-model="newMessage" @keyup.enter="tryAddMessage"> -->
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
      }
    },
    data () {
      return {
        newMessage: '',
        isEditing: false
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
        // Update message to db
        this.newMessage = ''
      },
      openEditForm (message) {
        this.$store.dispatch('')
      },
      save () {
        this.newMessage = this.$refs['new_message'].value
        this.isEditing = !this.isEditing
        // services.messageService.patch(message)
      }
    }
  }
</script>
