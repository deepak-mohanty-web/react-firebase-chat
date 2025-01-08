import { create } from 'zustand'
import useUserStore from './userStore'

const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isRecevierBlocked: false,
  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;


    // check if current user is blocked

    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isRecevierBlocked: false,
      })
    }

    //check if recevier is blockeed

    else if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user: user,
        isCurrentUserBlocked: false,
        isRecevierBlocked: true,
      })
    }

    else {
      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isRecevierBlocked: false,
      })
    }


  },  // <-- Comma added here

  changeBlock: () => {
    set(state => ({ ...state, isRecevierBlocked: !state.isRecevierBlocked }))
  }
}))

export default useChatStore;