import { useState } from "react";
import "./AddFriend.css";

function AddFriend({ saveFriendName }) {
    const [friend, setFriend] = useState('');

    function onclick() {
        saveFriendName(friend);
        setFriend('');
    }

    return (
        <div className="add-friend-main-div">
            <h4>Add New Friend</h4>
            <div className="add-friend">
                <input type="text"
                    className="add-friend-inpt"
                    value={friend}
                    placeholder="Add New Friend"
                    onChange={(e) => setFriend(e.target.value)} />
                <button
                    className="add-friend-btn"
                    type="button"
                    name="Add Friend"
                    onClick={() => onclick(friend)}>
                    Add Friend
                </button>
            </div>
        </div>
    )
}

export default AddFriend;