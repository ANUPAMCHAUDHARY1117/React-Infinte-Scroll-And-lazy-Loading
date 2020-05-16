/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Suspense } from 'react';
import imageFile from './img_avatar.png';
import './list.css';
const ImageComponent = React.lazy(() => import('../image/image'));

const List = () => {
	const [listItems, setListItems] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [page, setPage] = useState(1);

	useEffect(() => {
		fetchData();
		window.addEventListener('scroll', handleScroll);
	}, []);

	const handleScroll = () => {
		if (
			Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
			isFetching
		)
			return;
		setIsFetching(true);
		console.log(isFetching);
	};

	const fetchData = async () => {
		setTimeout(async () => {
			const result = await fetch(`https://picsum.photos/v2/list?page=${page}`);
			const data = await result.json();
			setPage(page + 1);
			setListItems(() => {
				return [...listItems, ...data];
			});
		}, 1000);
	};

	useEffect(() => {
		if (!isFetching) return;
		fetchMoreListItems();
	}, [isFetching]);

	const fetchMoreListItems = () => {
		fetchData();
		setIsFetching(false);
	};

	return (
		<>
			{listItems.map((listItem) => (
				<div className='card' key={listItem.id}>
					<Suspense fallback={<img src={imageFile} alt='Avatar' style={{ width: '50%' }} />}>
						<ImageComponent src={listItem.download_url} />
					</Suspense>

					<div className='container'>
						<h4>
							<b>{listItem.author}</b>
						</h4>
						<p>Architect & Engineer</p>
					</div>
				</div>
			))}
			{isFetching && <h1>Fetching more list items...</h1>}
		</>
	);
};

export default List;
