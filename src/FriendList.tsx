/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { FormEvent, ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import NodataFound from './NodataFound';
import DeleteIcon from './delete.png';
import Pagination from './Pagination';

interface Friend {
    name: string;
    isFav: boolean;
    id: number;
}
const FriendList = (): ReactElement => {
    let timer: any;
    const flRef: any = useRef();
    const sortRef = useRef({ isSorted: false })
    const [inputValue, setInputValue] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [friendList, setFriendList] = useState([] as Friend[]);
    const [friendsList, setFriendsLists] = useState([] as Friend[]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);


    useEffect(() => {
        setInputValue('');
        setFriendList([])
    }, [])

    useEffect(() => {
        if (friendList && friendList.length && !sortRef.current.isSorted) {
            sortFriends()
        }
    }, [friendList])

    const handlePrevPage = (prevPage: number) => {
        setPage((prevPage) => prevPage - 1);
        setCount((prevPage) => prevPage - 1);
    };

    const handleNextPage = (nextPage: number) => {
        setPage((nextPage) => nextPage + 1);
        setCount((nextPage) => nextPage + 1);
    };

    const onAdd = (e: FormEvent) => {
        e.preventDefault();
        if (inputValue && friendList.findIndex((x: Friend) => x.name.toLowerCase() === inputValue.toLowerCase()) === -1) {
            sortRef.current.isSorted = false;
            setFriendList([...friendList, { id: friendList.length + 1, name: inputValue, isFav: false }])
            setFriendsLists([...friendList, { id: friendList.length + 1, name: inputValue, isFav: false }]);
            flRef.current.value = '';
            setInputValue('')
        } else {
            alert('Duplicate friend.!, same friend already exists')
        }
    }

    const sortFriends = () => {
        const myFriends = [...friendList];
        sortRef.current.isSorted = true;

        setFriendList([...myFriends.sort((a, b) => {
            if (a.isFav < b.isFav) {
                return 1;
            }
            if (a.isFav > b.isFav) {
                return -1;
            }
            return 0;
        }
        )])
    }

    const handleInput = (e: any) => {
        setInputValue(e.target.value);
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (isSearch) {
                sortRef.current.isSorted = false;
                if (e.target.value) {
                    const tempFriends = [...friendsList];
                    setFriendList([...tempFriends.filter((x: Friend) => x.name.toLowerCase().includes((e.target.value.toLowerCase())))])
                } else {
                    setFriendList([...friendsList])
                }
            }
        }, 200);
    }

    const onFavClick = (friend: Friend) => {
        const friends: Friend[] = [...friendList];
        friends.forEach((x: Friend) => {
            if (x.id === friend.id)
                x.isFav = !x.isFav
        });
        sortRef.current.isSorted = false;
        setFriendList([...friends]);
    }

    const onDelClick = (friend: Friend) => {
        const confirmation = confirm(`Are you sure to delete ${friend.name} from list ?`);
        if (confirmation) {
            const friends: Friend[] = [...friendList];
            const index = friends.findIndex((x: Friend) => x.id === friend.id);
            friends.splice(index, 1);
            sortRef.current.isSorted = false;
            setFriendList([...friends]);
        }
    }

    const onToggle = () => {
        if (isSearch) {
            sortRef.current.isSorted = false;
            setFriendList(friendsList);
        }
        setIsSearch(!isSearch);
        setInputValue('');
        flRef.current.value = '';

    }

    return (
        <div className="content">
            <div className="fl-container">
                <div className="fl-header">Friends List</div>
                <div className="fl-body" id="listingTable">
                    <form onSubmit={onAdd}>
                        {!isSearch ?
                            <input type="text" defaultValue={inputValue} ref={flRef} onKeyUp={handleInput} placeholder="Enter your friend's name" />
                            :
                            <input type="text" placeholder="Search friends" defaultValue={inputValue} ref={flRef} onKeyUp={handleInput} />
                        }
                        <a style={{
                            position: 'absolute',
                            right: '10px',
                            top: '10px',
                            color: 'blue',
                            cursor: 'pointer'
                        }} onClick={() => onToggle()}>{isSearch ? ' Toggle Add' : 'Toggle Search'}</a>
                        <button style={{ visibility: 'hidden' }} type="submit" value="" />
                    </form>
                    {(friendList && friendList.length > 0) ?
                        friendList.slice((count * 4), ((count * 4) + 4)).map((x: Friend): ReactNode => {
                            return (
                                <div key={x.id} className="fl-item">
                                    <div className="txt-elipsis">
                                        <span style={{ fontWeight: 'bold' }}>{x.name}</span>
                                        <span style={{ display: 'block', fontSize: '11px' }}>{'is your friend'}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {x.isFav ?
                                            <span className={"fl-action-items active"} onClick={() => onFavClick(x)}>&#9733;</span>
                                            :
                                            <span className={"fl-action-items"} onClick={() => onFavClick(x)}>&#9734;</span>
                                        }
                                        <img
                                            src={DeleteIcon}
                                            style={{
                                                width: '20px',
                                                height: '100%',
                                                padding: '.4rem'
                                            }} className="fl-action-items" onClick={() => onDelClick(x)} />
                                    </div>
                                </div>
                            )
                        }) : <NodataFound />
                    }
                </div>

            </div>
            {friendList && friendList.length > 4 &&
                <Pagination
                    totalPages={Math.ceil(friendList.length / 4)}
                    currentPage={page}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                />
            }
        </div>
    )
}

export default FriendList;