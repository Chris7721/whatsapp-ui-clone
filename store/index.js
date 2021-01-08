import Vue from "vue";
import Vuex from "vuex";
import faker from 'faker'

Vue.use(Vuex);

const contacts = []
const messages = []
for(let i = 0; i<=10; i++){
  contacts.push({
    _id: faker.random.uuid(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`, 
    phoneNumber: faker.phone.phoneNumber('+234 80# ### ####'),
    status: faker.company.catchPhrase(),
    image: `${faker.image.imageUrl()}?random=${Date.now()}`,
    isTyping: false
  })
}

for(let i = 0; i < contacts.length; i++){
  messages.push({
    _id: contacts[i]._id,
    messages: [
      {
        sender: 'faker',
        text: i % 2 === 0 ? faker.lorem.sentence() : faker.lorem.sentences(),
        timeStamp: faker.time.recent()
      }
    ]
  })
}
console.log(contacts, "The contacts!!!!!!!!!!!!")
console.log(messages, 'The messages!!!!!!!!!!!!!!!')

export const state = () => ({
  contacts,
  messages,
  contactOpened: false,
  currentView: '',
  currentContact: null,
  modalOpened: false,
  showNewChat: false,
  authUser: {
    _id: faker.random.uuid(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    image: `${faker.image.imageUrl()}?random=${Date.now()}`,
    status: faker.company.catchPhrase(),
    phoneNumber: faker.phone.phoneNumber('+234 90# ### ####'),
  }
});

// console.log(messages.find(el => el._id === 2).messages[messages.find(el => el._id === 2).messages.length -1], "Lastino!!!!!!!!")

export const getters = {
  lastMessage(state) { 
    return (_id) => {
      const messages = state.messages.find(el => el._id === _id).messages
      return messages[messages.length - 1]
    }
  },
  currentMessages: state => state.messages.find(el => el._id === state.currentContact._id)
}

export const mutations = {
  set_contactOpened: (state, {isOpened, currentView}) => {
    state.contactOpened = isOpened
    state.currentView = currentView
  },
  set_currentContact: (state, payload) => {
    state.currentContact = payload
    if(state.showNewChat) {
      state.showNewChat = false 
    }
    if(state.contactOpened) {
      state.contactOpened = false 
    }
  },
  set_modalOpen: (state, payload) => {
    state.modalOpened = payload
  },
  set_showNewChat: (state, payload) => {
    state.showNewChat = payload
  },
  sendMessage: (state, {_id, text = faker.lorem.sentences(), sender}) => {
    const messages = state.messages.find(el => el._id === _id).messages
    
    messages.push({sender, text})
  },
  set_typingStatus: (state, {_id, status}) =>{
    const contact = state.contacts.find(el => el._id === _id)
    contact.isTyping=status
  }
}

