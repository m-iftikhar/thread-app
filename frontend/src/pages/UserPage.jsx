import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = () => {
  return (
    <div>
      <UserHeader/>
      <UserPost likes={23} replies={24} postImg="/pic1.jpg" postTitle="here is my 1st post"/>
      <UserPost likes={34} replies={54} postImg="/pic2.jpg" postTitle="here is my 2nd post"/>
      <UserPost likes={214} replies={4} postImg="/post1.png" postTitle="here is my 3rd post"/>
      <UserPost likes={4} replies={7} postImg="/post3.png" postTitle="here is my 4th post"/>
      
      
    </div>
  )
}

export default UserPage
