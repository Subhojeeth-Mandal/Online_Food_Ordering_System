import { useState, useMemo } from 'react';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';
import RestaurantCard from '../components/RestaurantCard';
import data from '../../data.json';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = useMemo(() => {
    const cuisineSet = data.reduce((set, restaurant) => {
      restaurant.cuisine.forEach(c => set.add(c));
      return set;
    }, new Set());
    return ['All', ...Array.from(cuisineSet)];
  }, []);

  const filteredRestaurants = useMemo(() => {
    if (selectedCategory === 'All') return data;
    return data.filter(r => r.cuisine.includes(selectedCategory));
  }, [selectedCategory]);

  return (
    <div className="container">
      <Banner />
      <Carousel categories={categories} activeCategory={selectedCategory}
        onCategorySelect={(cat) =>setSelectedCategory(prev => (prev === cat ? 'All' : cat))}/>

      <section style={{ padding: '40px 0' }}>
        <h2 className="section-title">
          {selectedCategory === 'All' ? 'Popular Restaurants' : `${selectedCategory} near you`}
        </h2>

        <div className="restaurant-grid fade-in">
            {filteredRestaurants.length === 0 ? ( <p className="empty">No restaurants found</p> ) : (
              filteredRestaurants.map(res => (
                <RestaurantCard key={res.id} restaurant={res} />))
            )}
        </div>
      </section>
    </div>
  );
};

export default Home;