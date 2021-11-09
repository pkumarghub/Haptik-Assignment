import './App.css';
import { v4 } from "uuid";
import AddFriend from './components/AddFriend/AddFriend';
import FriendListing from './components/FriendListing/FriendListing';
import { useEffect, useState } from 'react';

export const FRIEND_LIST = "friend_list";
export const USER_PER_PAGE = 4;

function App() {
  const [friendName, setFriendName] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const friendList = localStorage.getItem(FRIEND_LIST);
    const friendNameData = friendList ? JSON.parse(friendList) : [];
    setFriendName(friendNameData);

    setTotalPages(Math.ceil(friendNameData.length / USER_PER_PAGE));
  }, []);

  function saveFriendName(friend) {
    let savedFriendList = localStorage.getItem(FRIEND_LIST) ? JSON.parse(localStorage.getItem(FRIEND_LIST)) : [];
    const newFriendData = {
      id: v4(),
      name: friend,
      isFavourite: false
    }
    savedFriendList.push(newFriendData);
    setFriendName(savedFriendList);
    setTotalPages(Math.ceil(savedFriendList.length / USER_PER_PAGE));
    localStorage.setItem(FRIEND_LIST, JSON.stringify(savedFriendList));
  }

  function toggleFavourite(id, isFavourite) {
    let friendsData = friendName.map(ele => {
      if (ele.id === id) {
        return {
          id: ele.id,
          name: ele.name,
          isFavourite: !isFavourite
        }
      } else {
        return ele
      }
    })
    setFriendName(friendsData);
    localStorage.setItem(FRIEND_LIST, JSON.stringify(friendsData));
  }
  function deleteData(id) {
    let friendsData = friendName.filter(ele => ele.id !== id)
    setFriendName(friendsData);

    let friendList = localStorage.getItem(FRIEND_LIST) ? JSON.parse(localStorage.getItem(FRIEND_LIST)) : [];
    let localStorageData = friendList.filter(ele => ele.id !== id)
    setTotalPages(Math.ceil(localStorageData.length / USER_PER_PAGE));
    localStorage.setItem(FRIEND_LIST, JSON.stringify(localStorageData));
  }

  const handleClick = num => {
    setPage(num);
  }

  return (
    <>
      <h2 className="heading">Haptik Assignment</h2>
      <div className="body-div">
        <AddFriend
          saveFriendName={(friend) => saveFriendName(friend)}
          friendName={friendName}
          setFriendName={setFriendName}
        />
        <div className="vertical"></div>
        <FriendListing
          friendName={friendName}
          setFriendName={setFriendName}
          toggleFavourite={(id, isFavourite) => toggleFavourite(id, isFavourite)}
          deleteData={(id) => deleteData(id)}
          totalPages={totalPages}
          page={page}
          handleClick={num => handleClick(num)}
          setTotalPages={setTotalPages}
        />
      </div>
    </>
  );
}

export default App;
