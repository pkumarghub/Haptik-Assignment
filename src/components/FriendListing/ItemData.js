import React from 'react';
import "./ItemData.css";
import img from './img/trash-alt-regular.svg';
import starSolid from './img/star-solid.svg';
import starRegular from './img/star-regular.svg';


function ItemData({ name, id, isFavourite, toggleFavourite, deleteData }) {
    return (
        <div className='itemDataRow'>
            <div className="itemDataRow-name">
                {name}
            </div>
            <div
                className="itemDataRow-fav"
                onClick={() => toggleFavourite(id, isFavourite)}
            >
                {
                    isFavourite ?
                        <img
                            src={starSolid}
                            width="20px"
                            height="20px"
                            alt="Favourite Icon"
                        /> :
                        <img
                            src={starRegular}
                            width="20px"
                            height="20px"
                            alt="Favourite Icon"
                        />
                }
            </div>
            <div
                className="itemDataRow-del"
                onClick={() => deleteData(id)}
            >
                <img
                    src={img}
                    width="20px"
                    height="20px"
                    alt="delete icon"
                />
            </div>
        </div>
    )
}

export default ItemData;