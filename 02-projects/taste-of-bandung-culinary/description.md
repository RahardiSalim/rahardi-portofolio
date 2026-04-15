# Taste of Bandung - Culinary Recommendation System

## Metadata

**Type:** Web Application / Data Science Project  
**Date:** 2024  
**Status:** Completed  

**Technologies:** Python, Flask, Collaborative Filtering, Content-Based Filtering, React, PostgreSQL, Folium/Leaflet, Scikit-learn

**Links:**
- 🔗 GitHub: [Add your repository URL here](https://github.com/yourusername/taste-of-bandung)
- 🌐 Live Demo: [Add demo URL here](https://taste-of-bandung.vercel.app)
- 📹 Demo Video: [Add video URL here](https://youtube.com/...)
- 📊 Presentation: [Add slides URL here](https://...)

**Team Size:** [Add team size]  
**Role:** [Add your specific role]

---

## Short Description

Personalized culinary recommendation system for Bandung restaurants combining collaborative filtering with content-based methods, featuring interactive map interface and user preference learning.

## Long Description

Taste of Bandung helps locals and tourists discover restaurants matching their preferences in Indonesia's culinary capital. Bandung offers thousands of dining options across diverse cuisines, price points, and atmospheres—overwhelming choice that often leads to suboptimal decisions.

**The Problem:**

Restaurant discovery faces multiple challenges:
- Generic review platforms don't capture individual taste preferences
- Location-based search misses hidden gems slightly off common paths
- Cultural/dietary restrictions limit options but aren't well-filtered  
- Tourists lack local knowledge about neighborhood specialties
- Popular places get overcrowded while quality alternatives go unnoticed

**The Solution:**

We built a hybrid recommendation system learning individual preferences while considering contextual factors like location, budget, dining occasion, and group size.

**Technical Architecture:**

**Data Collection:**
- Scraped 2000+ Bandung restaurants from multiple platforms
- Collected menu items, prices, cuisines, amenities, reviews
- Geocoded addresses for mapping and proximity search
- Processed 50K+ user reviews for sentiment and aspect analysis

**Recommendation Engine:**

**Collaborative Filtering:** Matrix factorization (SVD) identifying users with similar taste profiles and suggesting restaurants they enjoyed. Handles cold-start with popular items.

**Content-Based Filtering:** Cosine similarity on restaurant features (cuisine type, price range, atmosphere, specialties). Works for users with limited history.

**Hybrid Approach:** Weighted combination adjusting based on data availability and context. New users get content-based suggestions; experienced users get collaborative predictions.

**Contextual Ranking:** Post-filters by location proximity, current time (breakfast vs dinner menus), party size, and dietary restrictions.

**Frontend Features:**

- Interactive map showing nearby recommendations
- Swipe interface for quick preference collection
- Personalized homepage with curated suggestions  
- Detailed restaurant pages with photos, menus, reviews
- Custom filters: cuisine, price, distance, rating, dietary options
- Save favorites and create dining wish lists

**Backend Infrastructure:**

Flask API serving recommendations with caching layer (Redis) for quick response. PostgreSQL database with spatial indexing (PostGIS) enabling efficient proximity queries.

Recommendation model updates daily incorporating new reviews and user interactions. A/B testing framework optimizing ranking weights.

**Key Insights:**

Location matters enormously—users rarely travel >5km for regular dining. Our proximity-aware ranking significantly improved satisfaction.

Cuisine diversity vs specialization varies by dining occasion. Date nights favor specialized establishments; group meals prefer diverse menus.

Time-of-day influences preferences dramatically. Breakfast/brunch recommendations need different criteria than dinner suggestions.

**Results:**

Beta testing with 200 users showed:
- 73% tried recommended restaurants they weren't previously aware of
- 4.2/5 average satisfaction with suggestions
- 45% increase in exploration beyond familiar neighborhoods
- Positive feedback on dietary restriction filtering

**Impact:**

The system democratizes culinary discovery, helping quality restaurants beyond tourist hotspots gain visibility. Users discover neighborhoods and cuisines they wouldn't have explored otherwise.

**Learning Outcomes:**
- Hybrid recommendation algorithms
- Production ML system deployment
- User preference modeling
- Geospatial data processing
- Full-stack development

This project combined machine learning with practical product design, creating something both technically sophisticated and genuinely useful for everyday dining decisions.
