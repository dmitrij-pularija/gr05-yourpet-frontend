import { useNavigate, useParams } from 'react-router-dom';
import { getNoticesByCategory } from '../../../api/notices';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';
import { selectNoticesFilters } from '../../../redux/filters/noticesFilter/selectors';
import NoticesList from '../../NoticesCategoriesList/NoticesCategoriesList';
const categories = ['sell', 'lost-found', 'for-free', 'favorite', 'own'];

const NoticesCategoriesList = () => {

  const isLoggingIn = useSelector(selectIsLoggedIn);


  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(false);

  const { category } = useParams();
  const navigate = useNavigate();

  const filterValue = useSelector(selectNoticesFilters);
  // console.log(category, loading, error, message);

  useEffect(() => {
    if (!filterValue) {
      return
    }
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const data = await getNoticesByCategory({ filterValue, category });
        if (!data.length) {
          setMessage(true);
          return;
        }
        // console.log('data', data);
        setItems(data);
        setMessage(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();

    // console.log(filterValue);
  }, [filterValue])

  useEffect(() => {
    if ((category === 'favorite' || category === 'own') && !isLoggingIn) {
      navigate('/');
    }

  }, [category]);

  useEffect(() => {
    if (!category) {
      return;
    }

    if (!categories.includes(category)) {
      navigate('/not-found');
      return;
    }

    const fetchNotices = async () => {
      try {
        setLoading(true);
        const data = await getNoticesByCategory(category);
        if (!data.length) {
          setMessage(true);
          return;
        }
        // console.log('data', data);
        setItems(data);
        setMessage(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, [category]);


  return (

    <NoticesList />);
};

export default NoticesCategoriesList;
