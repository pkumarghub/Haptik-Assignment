import React, { useState } from 'react';
import './FriendListing.css';
import ItemData from './ItemData';
import { FRIEND_LIST, USER_PER_PAGE } from "../../App";
import Pagination from './Pagination';

function FriendListing({ friendName, setTotalPages, setFriendName, toggleFavourite, deleteData, totalPages, page, handleClick }) {
    const [name, setName] = useState('');

    function nameSearch(val) {
        let friendList = localStorage.getItem(FRIEND_LIST) ? JSON.parse(localStorage.getItem(FRIEND_LIST)) : [];
        setName(val);
        if (val) {
            let filtered = friendList.filter(ele => {
                if (ele.name.toLowerCase().includes(val.toLowerCase())) {
                    return ele;
                }
                return false;
            });

            let trueArr = [];
            let falseArr = [];
            filtered.forEach(element => {
                if (element.isFavourite) {
                    trueArr.push(element);
                } else {
                    falseArr.push(element);
                }
            });
            let newArr = trueArr.concat(falseArr);
            setFriendName(newArr);
            setTotalPages(Math.ceil(newArr.length / USER_PER_PAGE));
        } else {
            setFriendName(friendList);
        }

    }

    const startIndex = (page - 1) * USER_PER_PAGE;
    const selectedUsers = friendName.slice(startIndex, startIndex + USER_PER_PAGE);

    return (
        <div className="friend-list">
            <h4>Friend listing</h4>
            <div className="list-div">
                <div className="list-div-heading">Friends List</div>
                <input
                    className="friend-search-inpt"
                    type="text"
                    placeholder="Enter your friend's name"
                    onChange={(e) => nameSearch(e.target.value)}
                    value={name}
                />
                {
                    selectedUsers ? selectedUsers.map(element =>
                        <React.Fragment key={element.id}>
                            <ItemData
                                name={element.name}
                                id={element.id}
                                isFavourite={element.isFavourite}
                                toggleFavourite={(id, isFavourite) => toggleFavourite(id, isFavourite)}
                                deleteData={(id) => deleteData(id)}
                            />
                        </React.Fragment>
                    ) : null
                }
            </div>
            <Pagination
                totalPages={totalPages}
                handleClick={handleClick}
            />
        </div>
    )
}

export default FriendListing;