import './List.scss'
import ChatList from './chatlist/ChatList'
import UserInfo from './userinfo/UserInfo'

const List = () => {
  return (
    <div className='list'>
      <UserInfo />
      <ChatList /> 
    </div>
  )
}

export default List
