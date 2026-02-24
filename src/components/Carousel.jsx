const Carousel = ({ categories, activeCategory, onCategorySelect }) => {
  return (
    <div className="carousel">
      {categories.map(cat => (
        <button key={cat} className={`chip btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => onCategorySelect(cat)} >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Carousel;